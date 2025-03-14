import { defineStore } from 'pinia';

const APIBase = import.meta.env.VITE_API_BASE; // Proxy URL

export const useExpenseStore = defineStore('expenseStore', {

  state: () => ({
    expenses: [],
    errorMessage: "",
    loading: false, // Loading state for user experience
    isAdmin: localStorage.getItem("isAdmin") === "true" // Retrieve admin status
  }),

  getters: {
    adminHeaders(state) {
      return state.isAdmin ? { "x-admin-password": import.meta.env.VITE_ADMIN_PASSWORD } : {};
    }
  },

  actions: {

    // Edit admin status
    setAdminStatus(status) {
      this.isAdmin = status;
      localStorage.setItem("isAdmin", status ? "true" : "false");
    },

    // Fetches the expenses from the API and loads them to local state
    async fetchExpenses() {

      this.loading = true; // Start loading

      try {

        const response = await fetch(`${APIBase}/expenses`);
        if (!response.ok) throw new Error("Failed to fetch expenses");
        this.expenses = await response.json();
        this.errorMessage = ""; // Clear error on success

      } catch (error) {

        this.errorMessage = "Could not fetch expenses. Please try again.";
        console.error(error);

      } finally {
        this.loading = false; // Stop loading when done
      }

    },

    // Adds an expense to the API array (+ Optimistic UI)
    async addExpense(item) {
      const originalExpenses = [...this.expenses]; // Backup for rollback
      
      // Optimistically add expense with a temporary ID
      const tempExpense = { ...item, id: Date.now() };
      this.expenses.push(tempExpense);

      try {

        const response = await fetch(`${APIBase}/expenses`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...this.adminHeaders },
          body: JSON.stringify({ name: item.name, amount: item.amount }), // Send only required fields
        });

        if (!response.ok) throw new Error("Failed to add expense");

        const newExpense = await response.json();

        // Replace temporary expense with API response
        const index = this.expenses.findIndex(exp => exp.id === tempExpense.id);
        if (index !== -1) {
          this.expenses[index] = newExpense;
        }

        this.errorMessage = ""; // Clear error on success

      } catch (error) {
        this.expenses = originalExpenses; // Rollback state if API fails
        this.errorMessage = "Failed to add expense. Please try again.";
        console.error(error);
      }
    },

    // Deletes an expense from the API array (+ Optimistic UI)
    async deleteExpense(id) {

      const originalExpenses = [...this.expenses]; // Backup for rollback
      this.expenses = this.expenses.filter(expense => expense.id !== id); // Optimistic UI

      try {

        const response = await fetch(`${APIBase}/expenses/${id}`, {
          method: "DELETE",
          headers: { ...this.adminHeaders },
        });

        if (!response.ok) throw new Error("Failed to delete expense");

        this.errorMessage = ""; // Clear error on success

      } catch (error) {
        this.expenses = originalExpenses; // Rollback state if API fails
        this.errorMessage = "Failed to delete expense. Please try again.";
        console.error(error);
      }

    },

    // Updates an expense in the API array (+ Optimistic UI)
    async updateExpense(id, updatedFields) {

      const originalExpense = this.expenses.find(expense => expense.id === id); // Backup for rollback

      // Optimistic UI
      const index = this.expenses.findIndex(expense => expense.id === id);
      if (index !== -1) {
        this.expenses[index] = { ...this.expenses[index], ...updatedFields };
      }

      // Sending PUT for API change
      try {

        const response = await fetch(`${APIBase}/expenses/${id}`, {
          method: "PUT", // Changed from PATCH to PUT
          headers: { "Content-Type": "application/json", ...this.adminHeaders },
          body: JSON.stringify(this.expenses[index]), // Send full object (as it's PUT)
        });

        if (!response.ok) throw new Error("Failed to update expense");

        const updatedExpense = await response.json();
        this.expenses[index] = updatedExpense; // Ensure the UI reflects the latest API response

        this.errorMessage = ""; // Clear error on success

      } catch (error) {

        if (originalExpense && index !== -1) {
          this.expenses[index] = originalExpense; // Rollback only the failed expense edit
        }

        this.errorMessage = "Failed to update expense. Please try again.";
        console.error("Error updating expense:", error);

      }

    }

  }
});
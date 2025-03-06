import { defineStore } from 'pinia';

const APIBase = "http://localhost:3001/api"; // Proxy URL

export const useExpenseStore = defineStore('expenseStore', {
  state: () => ({
    expenses: [],
    errorMessage: ""
  }),

  actions: {

    // Fetches the expenses from the API and loads them to local state
    async fetchExpenses() {
      try {
        const response = await fetch(`${APIBase}/expenses`);
        if (!response.ok) throw new Error("Failed to fetch expenses");
        this.expenses = await response.json();
        this.errorMessage = ""; // Clear error on success
      } catch (error) {
        this.errorMessage = "Could not fetch expenses. Please try again.";
        console.error(error);
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
          headers: { "Content-Type": "application/json" },
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
          headers: { "Content-Type": "application/json" },
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
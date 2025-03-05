<template>

  <div class="h-screen flex flex-col items-center justify-start p-3 bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Expense Tracker</h1>

    <ExpenseInput class="flex justify-center bg-gray-200 p-3 space-x-4 max-w-lg w-full rounded-lg" @add-expense="addExpense" @input-error="inputError" />

    <!-- Error message -->
    <div
      v-if="errorMessage !== ``"
      class="bg-red-500 text-white rounded-lg p-3 mt-3"
    >
      Error: {{ errorMessage }}
    </div>

    <ExpenseList
      v-if="expenses.length > 0"
      :expenses="derivedExpenses"
      :selectedFilter="selectedFilter"
      @delete-expense="deleteExpense"
      @update:selectedFilter="selectedFilter = $event"
    />

    <!-- Total expenses -->
    <div
      v-if="totalExpensesAmount > 0"
      class="p-3 bg-gray-200 rounded-lg shadow-md text-xl font-semibold text-center w-full max-w-md mx-auto"
    >
      <span class="mr-2">Total expenses:</span>
      <span class="text-blue-600">${{ totalExpensesAmount }}</span>
    </div>
  </div>

</template>

<script>

import { ref, onMounted, computed, watch } from "vue";
import ExpenseInput from "./components/local/ExpenseInput.vue";
import ExpenseList from "./components/local/ExpenseList.vue";

export default {

  components: { ExpenseInput, ExpenseList },

  setup(){

    const expenses = ref([]); // Main array of expenses
    const errorMessage = ref(""); // Variable used for errors
    const selectedFilter = ref("all"); // Variable used for filtering, passed as a prop to ExpenseList.vue

    // Loads the previous expenses if the page is loaded again
    onMounted(() => {

      const savedExpenses = localStorage.getItem("expenses");

      if (savedExpenses) {
        expenses.value = JSON.parse(savedExpenses);
        expenses.value = [...expenses.value]; // Force Vue to detect change
      }

      // console.log("Loaded expenses:", expenses.value); // Debugging log

    });

    const inputError = (currentErrorMessage) => { // Shows the error in case there's one emitted from App or child components
      errorMessage.value = currentErrorMessage;
    }

    // Saves the array to localStorage at every dynamic change, so when the page is reloaded the data persists
    watch(expenses, (newExpenses) => {

      // console.log("Saving to localStorage:", newExpenses); // Debug log
      localStorage.setItem("expenses", JSON.stringify(newExpenses)); //  Save automatically

    }, { deep: true });


    // Adds a new expense to the array when called by the event add-expense
    const addExpense = (item) => {
      expenses.value.push(item);
    }

    // Deletes an expense given an ID, received from ExpenseItem.vue
    const deleteExpense = (id) => {
      expenses.value = expenses.value.filter(expense => expense.id !== id);
    }

    // Calculates the total amount of expenses and assigns it to totalExpensesAmount
    const totalExpensesAmount = computed(
      () => expenses.value.reduce((expAcc, exp) => expAcc + exp.amount, 0)
    );

    // Dynamically filters and sorts the expenses array by creating a sorted version of it 
    const derivedExpenses = computed(() => {

        if(selectedFilter.value === "above"){
          return expenses.value.filter((exp) => exp.amount >= 50).toSorted((a, b) => b.amount - a.amount); // Returns the filtered array (expenses >= $50), sorted (high to low)
        } else if (selectedFilter.value === "below"){
          return expenses.value.filter((exp) => exp.amount < 50).toSorted((a, b) => b.amount - a.amount); // Returns the filtered array (expenses < $50), sorted (high to low)
        }

        return expenses.value.toSorted((a, b) => b.amount - a.amount) // Returns the sorted array (high to low)

      }
    );

    return { expenses, errorMessage, selectedFilter, inputError, onMounted, addExpense, deleteExpense, totalExpensesAmount, derivedExpenses };

  }

};

</script>
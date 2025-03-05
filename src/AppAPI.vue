<template>

  <div class="h-screen flex flex-col items-center justify-start p-3 bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Expense Tracker</h1>

    <ExpenseInput
      class="flex justify-center bg-gray-200 p-3 space-x-4 max-w-lg w-full rounded-lg"
      @add-expense="addExpense"
      @input-error="inputError"
    />

    <!-- Error message -->
    <div
      v-if="errorMessage !== ``"
      class="bg-red-500 font-bold text-white rounded-lg p-3 mt-3"
    >
      ❌ {{ errorMessage }}
    </div>

    <ExpenseList
      v-if="expenses.length > 0"
      :selectedFilter="selectedFilter"
      @update:selectedFilter="selectedFilter = $event"
      @input-error="inputError"
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

import { ref, onMounted, computed } from "vue";
import ExpenseInput from "./components/api/ExpenseInputAPI.vue";
import ExpenseList from "./components/api/ExpenseListAPI.vue";

// Pinia stuff
import { useExpenseStore } from "./stores/useExpenseStore";
import { storeToRefs } from "pinia";

export default {

  components: { ExpenseInput, ExpenseList },

  setup(){

    // Initialize Pinia store
    const expenseStore = useExpenseStore();
    const { expenses, errorMessage } = storeToRefs(expenseStore); // Main array of expenses & variable used for errors. storeToRefs() ensures reactivity in Vue

    const selectedFilter = ref("all"); // Variable used for filtering, passed as a prop to ExpenseList.vue

    // Fetch expenses from Pinia store when the component mounts
    onMounted(() => {
      expenseStore.fetchExpenses();
    });

    // Total expenses computed directly from Pinia
    const totalExpensesAmount = computed(() =>
      expenses.value.reduce((expAcc, exp) => expAcc + exp.amount, 0)
    );

    const inputError = (currentErrorMessage) => { // Shows the error in case there's one emitted from App or child components
      errorMessage.value = currentErrorMessage;
    }

    return { expenses, errorMessage, selectedFilter, inputError, totalExpensesAmount };

  }

};

</script>
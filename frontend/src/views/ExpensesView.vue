<template>
  
  <div class="h-screen flex flex-col items-center justify-start">

    <!-- Expense Input -->
    <ExpenseInput
      :isAdmin="isAdmin"
      @add-expense="addExpense"
      @input-error="inputError"
    />

    <!-- Expense List -->
    <ExpenseList
      :isAdmin="isAdmin"
      v-if="expenses.length > 0"
      :selectedFilter="selectedFilter"
      @update:selectedFilter="selectedFilter = $event"
      @input-error="inputError"
    />

    <!-- Total expenses -->
    <div
      v-if="totalExpensesAmount > 0"
      class="white-section text-xl font-semibold text-center w-full max-w-2xl mx-auto"
    >
      <span class="mr-2">Total expenses:</span>
      <span class="text-teal-600">${{ totalExpensesAmount }}</span>
    </div>

  </div>

</template>

<script>

import { ref, onMounted, computed } from "vue";
import ExpenseInput from "../components/ExpenseInput.vue";
import ExpenseList from "../components/ExpenseList.vue";

// Pinia stuff
import { useExpenseStore } from "../stores/useExpenseStore";
import { storeToRefs } from "pinia";

export default {

  props:["isAdmin"],
  components: { ExpenseInput, ExpenseList },

  setup(){

    // Initialize Pinia store
    const expenseStore = useExpenseStore();
    const { expenses, errorMessage } = storeToRefs(expenseStore); // Main array of expenses & variable used for errors. storeToRefs() ensures reactivity in Vue

    const selectedFilter = ref("all"); // Variable used for filtering, passed as a prop to ExpenseListRouter.vue

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
<template>

  <div class="white-section max-w-2xl mx-auto w-full flex flex-col justify-between">

    <div>
      <h1 class="text-xl font-semibold mb-4 text-center">Details</h1>

      <div class="light-gray-section text-gray-700 text-lg">
        <p>ID: <strong>{{ expenseId }}</strong></p>
        <p>Name: <strong>{{ expense.name }}</strong></p>
        <p>Amount: <strong>${{ expense.amount }}</strong></p>
      </div>

    </div>

    <div class="mt-auto flex justify-center">
      <router-link to="/expenses" class="btn btn-teal">⬅️ Back to Expenses</router-link>
    </div>

  </div>

</template>

<script setup>

import { useRoute } from "vue-router";
import { useExpenseStore } from "../stores/useExpenseStore";
import { computed } from "vue";

const route = useRoute();
const expenseId = route.params.id; // Access the ID through the route URL

const expenseStore = useExpenseStore();

// Get the specific expense using the ID from the route
const expense = computed(() =>
  expenseStore.expenses.find(exp => exp.id === expenseId)
);

</script>
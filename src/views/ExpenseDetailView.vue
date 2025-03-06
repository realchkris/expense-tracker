<template>
  <div class="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
    <h1 class="text-xl font-semibold mb-4 text-center">Expense Details</h1>
    <p class="text-gray-700">Viewing details for expense ID: <strong>{{ expenseId }}</strong></p>
    <router-link to="/expenses" class="text-blue-500 underline">Back to Expenses</router-link>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    return { expenseId: route.params.id }; // Access the ID from the URL
  },
};
</script>
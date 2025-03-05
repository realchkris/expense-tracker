<template>

  <!-- Add Expense Button -->
  <button
  v-if="addExpenseMode == false"
  @click="addExpenseMode = true"
  class="m-3 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-400 transition-all duration-300 flex-shrink-0"
  >➕</button>

  <!-- Input Fields -->
  <div
  v-if="addExpenseMode"
  class="flex items-center space-x-2 shadow-md">

    <!-- Expense amount -->
    <span class="text-lg">$</span>
    <input
      @keydown.enter="addExpense"
      @keydown.esc="clearFields"
      class="bg-gray-100 w-20 p-2 rounded-lg"
      v-model="itemAmount"
      type="number"
      required
    >

    <!-- Expense name -->
    <input
      @keydown.enter="addExpense"
      @keydown.esc="clearFields"
      class="bg-gray-100 flex-1 p-2 rounded-lg"
      v-model="itemName"
      type="text"
      placeholder="Detail expense here..."
      required
    >

    <!-- Done Adding Expense Button -->
    <button
      @click="addExpense"
      class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
    >✔️</button>

    <!-- Cancel Adding Expense Button -->
    <button
      @click="() => {addExpenseMode = false; clearFields();}"
      class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
    >❌</button>

  </div>

</template>

<script>

import { ref } from "vue";

import { useExpenseStore } from "@/stores/useExpenseStore";

export default {

  emits: ["input-error"],

  setup(props, { emit }){

    // Pinia stuff
    const expenseStore = useExpenseStore();
    // const { expenses } = storeToRefs(expenseStore);

    // Used for input fields
    const addExpenseMode = ref(false);
    const itemAmount = ref(0);
    const itemName = ref("");

    const addExpense = () => { // Sends the items to root component

      if(itemName.value !== "" && itemAmount.value > 0){ // Adds the correct expense through Pinia

        expenseStore.addExpense({ name: itemName.value, amount: itemAmount.value }); // ID is already added through Pinia that's why it's not passed

        clearFields(); // Resetting input fields

        // Resetting possible error messages after adding an expense
        emit("input-error", "");

      } else { // Emits an error message to App.vue
        emit("input-error", "Please insert a valid expense.");
      }

    }

    const clearFields = () => {
      // Resetting input fields after adding/canceling an expense from the input fields
      itemName.value = "";
      itemAmount.value = 0;
    }

    return {addExpenseMode, itemAmount, itemName, addExpense, clearFields};

  }

};

</script>
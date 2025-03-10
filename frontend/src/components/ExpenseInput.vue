<template>

  <!-- Add Expense Button -->
  <button
  v-if="addExpenseMode == false"
  @click="addExpenseMode = true"
  class="btn btn-teal"
  >➕</button>

  <!-- Input Fields -->
  <div
    v-if="addExpenseMode"
    class="emerald-section emerald-hover flex items-center space-x-2"
  >

    <!-- Expense Amount -->
    <span class="text-lg font-bold text-white">$</span>
    <input
      @keydown.enter="addExpense"
      @keydown.esc="clearFields"
      class="w-20 input-field"
      v-model="itemAmount"
      type="number"
      required
    >

    <!-- Expense Name -->
    <input
      @keydown.enter="addExpense"
      @keydown.esc="clearFields"
      class="flex-1 input-field"
      v-model="itemName"
      type="text"
      placeholder="Detail expense here..."
      required
    >

    <!-- Done Adding Expense Button (Admin) -->
    <button
      v-if="isAdmin"
      @click="addExpense"
      class="btn btn-emerald"
    >✔️</button>

    <!-- Done Adding Expense Button (Viewer) -->
    <button
      v-if="!isAdmin"
      class="btn btn-gray"
    >✔️</button>

    <!-- Cancel Adding Expense Button -->
    <button
      @click="() => {addExpenseMode = false; clearFields();}"
      class="btn btn-red"
    >❌</button>

  </div>

</template>

<script>

import { ref } from "vue";
import { useExpenseStore } from "../stores/useExpenseStore";

export default {

  props:["isAdmin"],
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

<style scoped>

.btn-emerald {
  @apply bg-teal-600 hover:bg-teal-500;
}

.btn-red {
  @apply bg-red-500 hover:bg-red-400;
}

.btn-gray {
  @apply bg-gray-500 hover:bg-gray-400;
}

</style>
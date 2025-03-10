<template>

  <!-- Add Expense Button -->
  <button
    v-if="!addExpenseMode"
    @click="addExpenseMode = true"
    class="btn btn-teal"
  >➕</button>

  <!-- Input Fields -->
  <div
    v-if="addExpenseMode"
    class="emerald-section emerald-hover flex flex-wrap items-center gap-2 w-full max-w-xl"
  >

    <!-- Expense Amount -->
    <span class="text-lg font-bold text-white">$</span>
    <input
      @keydown.enter="addExpense"
      @keydown.esc="clearFields"
      class="input-field w-1/4 md:w-1/6 min-w-20"
      v-model="itemAmount"
      type="number"
      required
    >

    <!-- Expense Name -->
    <input
      @keydown.enter="addExpense"
      @keydown.esc="clearFields"
      class="flex-1 input-field w-full min-w-20"
      v-model="itemName"
      type="text"
      placeholder="Detail expense here..."
      required
    >

    <!-- Done Adding Expense Button (Admin) -->
    <button
      v-if="isAdmin"
      @click="addExpense"
      class="btn btn-emerald flex items-center justify-center w-12 h-12"
    >
      <img
        src="../assets/check.png"
        class="w-12 h-12 object-contain shrink-0"
      >
    </button>

    <!-- Done Adding Expense Button (Viewer) -->
    <button
      v-if="!isAdmin"
      class="btn btn-gray flex items-center justify-center w-12 h-12"
    >
      <img
        src="../assets/check.png"
        class="w-12 h-12 object-contain shrink-0"
      >
    </button>

    <!-- Cancel Adding Expense Button -->
    <button
      @click="() => {addExpenseMode = false; clearFields();}"
      class="btn btn-red flex items-center justify-center w-12 h-12"
    >

      <img
        src="../assets/close.png"
        class="w-12 h-12 object-contain shrink-0"
      >

    </button>

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
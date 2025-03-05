<template>

  <div class="flex items-center space-x-2 shadow-md">

    <!-- Expense amount -->
    <span class="text-lg">$</span>
    <input
      class="bg-gray-100 w-20 p-2 rounded-lg"
      v-model="itemAmount"
      type="number"
      required
    >

    <!-- Expense name -->
    <input
      class="bg-gray-100 flex-1 p-2 rounded-lg"
      v-model="itemName"
      type="text"
      placeholder="Detail expense here..."
      required
    >

    <!-- Add Expense Button -->
    <button
      @click="addExpense"
      class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
    >➕</button>

  </div>

</template>

<script>

import { ref } from "vue";

export default {

  props: ["expenses"],
  emits: ["addExpense", "inputError"],

  setup(props, { emit }){

    const itemAmount = ref(0);
    const itemName = ref("");

    const addExpense = () => { // Sends the items to root component

      if(itemName.value !== "" && itemAmount.value > 0){ // Emits the right value to App.vue

        emit("add-expense", { id: Date.now(), name: itemName.value, amount: itemAmount.value });

        // Resetting input fields after adding an expense
        itemName.value = "";
        itemAmount.value = "";

        // Resetting possible error messages after adding an expense
        emit("input-error", "");

      } else { // Emits an error message to App.vue
        emit("input-error", "Please insert a valid expense.");
      }

    }

    return {itemAmount, itemName, addExpense};

  }

};

</script>
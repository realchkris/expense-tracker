<template>

	<div class="flex flex-nowrap justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md w-full max-w-xs">
		<!-- Expense name, amount -->
		<div
			v-if="!isEditing"
			:class="{
				'text-red-600': amount > 100,
				'text-yellow-600': amount <= 100 && amount >= 50,
				'text-green-600': amount < 50
			}" 
			class="flex-1 flex flex-col items-start bg-gray-300 rounded-md p-3 min-w-0"
		>
			<div class="text-lg font-semibold">${{ amount }}</div>
			<div class="text-sm break-words whitespace-normal overflow-hidden text-ellipsis min-w-0 max-w-[150px]">
				{{ name }}
			</div>
		</div>

		<!-- Expense name, amount EDIT MODE -->
		<div
			v-else
			class="flex-1 flex flex-col items-start bg-gray-300 rounded-md p-3 min-w-0"
		>
			<div>
				<span>$</span>
				<input
					@keydown.enter="updateExpense"
					@keydown.esc="isEditing = false"
					class="mb-2 w-full max-w-full p-2 rounded-lg min-w-0"
					type="number" v-model="localAmount"
				>
			</div>
			<input
				@keydown.enter="updateExpense"
				@keydown.esc="isEditing = false"
				class="w-full max-w-full p-2 rounded-lg min-w-0"
				type="text" v-model="localName"
			>
		</div>

		<!-- View button -->
		<nav>
			<router-link
				:to="`/expenses/${id}`"
				class="ml-3 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-400 transition-all duration-300 flex-shrink-0"
			>👁️</router-link>
		</nav>

		<!-- Edit button -->
		<button
			v-if="!isEditing"
			@click="isEditing = !isEditing"
			class="ml-3 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-400 transition-all duration-300 flex-shrink-0"
		>✏️</button>

		<!-- Edit mode done button -->
		<button
			v-else
			@click="updateExpense"
			class="ml-3 bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-400 transition-all duration-300 flex-shrink-0"
		>✔️</button>

		<!-- Delete button -->
		<button
			class="ml-3 bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-400 transition-all duration-300 flex-shrink-0"
			@click="deleteExpense"
		>🗑️</button>
		
	</div>

</template>

<script>

import { useExpenseStore } from "@/stores/useExpenseStore";
import { ref } from "vue";

export default {

	props: ["name", "amount", "id"], // Receive props from ExpenseListRouter.vue
	emits: ["update:expense", "input-error"],

	setup(props, { emit }){

		const isEditing = ref(false); // Used to enter/exit edit mode

		const localAmount = ref(props.amount); // Used to edit amount (as prop is read-only)
		const localName = ref(props.name); // Used to edit name (as prop is read-only)

		const expenseStore = useExpenseStore(); // Pinia store

		const updateExpense = () => {

			if(localName.value !== "" && localAmount.value > 0){ // Checks if the edited input is valid

				expenseStore.updateExpense(props.id, { amount: localAmount.value, name: localName.value });
				emit("update:expense", { amount: localAmount.value, name: localName.value }); // Asks the parent (ExpenseListAPI.vue) to handle the update (Vue does not allow modifying props directly)

				isEditing.value = false; // Exits edit mode

			} else {
				emit("input-error", "Please insert a valid expense.");
			}

		}

		const deleteExpense = () => {
			expenseStore.deleteExpense(props.id);
		}

		return { isEditing, localAmount, localName, updateExpense, deleteExpense };

	}

};
	
</script>
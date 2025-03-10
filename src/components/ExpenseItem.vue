<template>

	<div class="light-gray-section light-gray-section-hover flex justify-between items-center w-full max-w-2xl">

		<!-- Expense name, amount -->
		<div class="gray-section flex-1 flex flex-col items-start min-w-0">

			<!-- Read mode -->
			<div
				v-if="!isEditing"
				:class="{
					'text-red-600': amount > 100,
					'text-yellow-600': amount <= 100 && amount >= 50,
					'text-green-600': amount < 50
				}"
			>

				<div class="text-lg font-semibold">${{ amount }}</div>
				<div class="text-sm">
					{{ truncatedName }}
				</div>

			</div>

			<!-- Edit Mode -->
			<div
				v-else 
				class="space-y-2 w-full"
			>

				<div class="flex items-center space-x-2">

					<span class="text-lg font-semibold">$</span>
					<input
						@keydown.enter="updateExpense"
						@keydown.esc="isEditing = false"
						class="w-full input-field"
						type="number"
						v-model="localAmount"
						:readonly="!isAdmin"
					>

				</div>

				<input
					@keydown.enter="updateExpense"
					@keydown.esc="isEditing = false"
					class="w-full input-field"
					type="text"
					v-model="localName"
					:readonly="!isAdmin"
				>

			</div>

		</div>

		<!-- Action Buttons -->
		<div class="flex flex-wrap space-x-2 ml-3">

			<!-- View Button -->
			<button class="btn btn-teal">
			  <router-link :to="`/expenses/${id}`">
			    🔍
			  </router-link>
			</button>

			<!-- Edit Button -->
			<button
				v-if="!isEditing"
				@click="isEditing = !isEditing"
				class="btn btn-teal"
			>✏️</button>

			<!-- Edit Mode Done Button -->
			<button
				v-else
				@click="updateExpense"
				class="btn btn-green"
			>✔️</button>

			<!-- Delete Button (Admin) -->
			<button
				v-if="isAdmin"
				class="btn btn-red"
				@click="deleteExpense"
			>🗑️</button>

			<!-- Delete Button (Viewer) -->
			<button
				v-if="!isAdmin"
				class="btn btn-gray"
			>🗑️</button>
			
		</div>

	</div>

</template>

<script>

import { useExpenseStore } from "../stores/useExpenseStore";
import { ref, computed } from "vue";

export default {

	props: ["name", "amount", "id", "isAdmin"], // Receive props from ExpenseListRouter.vue
	emits: ["update:expense", "input-error"],

	setup(props, { emit }){

		const isEditing = ref(false); // Used to enter/exit edit mode

		const localAmount = ref(props.amount); // Used to edit amount (as prop is read-only)
		const localName = ref(props.name); // Used to edit name (as prop is read-only)

		const expenseStore = useExpenseStore(); // Pinia store

		// Avoids name overflow
		const truncatedName = computed(() => {
		  return props.name.length > 20 ? props.name.substring(0, 17) + "..." : props.name;
		});

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

		return { isEditing, localAmount, localName, updateExpense, deleteExpense, truncatedName };

	}

};
	
</script>


<template>

	<div class="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto m-3">
		<h2 class="text-xl font-semibold mb-4 text-center">Your Expenses</h2>

		<!-- Filter Expenses -->
		<div class="mb-4">
			<label class="mr-2">Filter:</label>
			<select
				@change="$emit('update:selectedFilter', $event.target.value)"
				class="border rounded-lg p-2"
			>
				<option value="all">All</option>
				<option value="above">Above $50</option>
				<option value="below">Below $50</option>
			</select>
		</div>

		<!-- List of Expenses -->
		<ul class="space-y-2 flex flex-col items-center">
			<ExpenseItem
				v-for="expense in derivedExpenses"
				:key="expense.id"
				:id="expense.id"
				:name="expense.name"
				:amount="expense.amount"
				:isAdmin="isAdmin"
				@input-error="$emit('input-error', $event)"
			/>
		</ul>
	</div>

</template>

<script>

import ExpenseItem from "./ExpenseItem.vue";

import { useExpenseStore } from "../stores/useExpenseStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

export default {

	components: { ExpenseItem },
	props: ["selectedFilter", "isAdmin"],

	setup(props){

		// Pinia stuff
		const expenseStore = useExpenseStore();
		const { expenses } = storeToRefs(expenseStore);

		// Compute filtered expenses based on `selectedFilter`
		const derivedExpenses = computed(() => {

			if (props.selectedFilter === "above") {
				return expenses.value.filter((exp) => exp.amount >= 50).toSorted((a, b) => b.amount - a.amount);
			} else if (props.selectedFilter === "below") {
				return expenses.value.filter((exp) => exp.amount < 50).toSorted((a, b) => b.amount - a.amount);
			}

			return expenses.value.toSorted((a, b) => b.amount - a.amount);

		});

		return { expenses, derivedExpenses };

	}

}
	
</script>
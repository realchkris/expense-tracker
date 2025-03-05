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
				v-for="expense in expenses"
				:key="expense.id"
				:id="expense.id"
				:name="expense.name"
				:amount="expense.amount"
				@delete-expense="$emit('delete-expense', expense.id)"
			/>
		</ul>
	</div>

</template>

<script>

import ExpenseItem from "./ExpenseItem.vue";

export default {

	components: { ExpenseItem },
	props: ["expenses","selectedFilter"],

	setup(){

	}

}
	
</script>
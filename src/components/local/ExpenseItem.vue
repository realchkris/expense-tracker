<template>

	<div class="flex flex-nowrap justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md w-full max-w-xs">
		<!-- Expense name, amount, ID -->
		<div :class="{
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

		<!-- Fix button alignment -->
		<button
			class="ml-3 bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-400 transition-all duration-300 flex-shrink-0"
			@click="deleteExpense"
		>✖️</button>
		
	</div>

</template>

<script>

export default {

	props: ["name", "amount", "id"], // Receive props from ExpenseList.vue

	setup(props, { emit }){

		const deleteExpense = () => {
			emit("delete-expense", props.id);
		}

		return { deleteExpense };

	}

};
	
</script>
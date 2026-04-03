<script>
	let { data } = $props();
</script>

<p class="text-gray-500 text-sm p-4">
	{JSON.stringify(data)}
</p>

<div class="mx-auto max-w-xs">
	<h1 class="text-2xl font-bold mb-4">todos</h1>

	<label class="block text-sm font-medium text-gray-700 mb-2">
		add a todo:
		<input
			class="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
			type="text"
			autocomplete="off"
			onkeydown={async (e) => {
				if (e.key !== 'Enter') return;

				const input = e.currentTarget;
				const description = input.value;
				// ИСПРАВЛЕНО: /todoapi вместо /todo_api
				const response = await fetch('/todoapi', {
					method: 'POST',
					body: JSON.stringify({ description }),
					headers: {
						'Content-Type': 'application/json'
					}
				});

				const { id } = await response.json();

				const todos = [
					...data.todos,
					{
						id,
						description,
						done: false
					}
				];

				data = { ...data, todos };
				
				input.value = '';
			}}
		/>
	</label>

	<ul class="mt-4 space-y-2">
		{#each data.todos as todo (todo.id)}
			<li class="flex items-center gap-3 border rounded-lg p-3 hover:shadow-sm transition-shadow">
				<label class="flex items-center gap-3 flex-1 cursor-pointer">
					<input
						type="checkbox"
						checked={todo.done}
						onchange={async (e) => {
							const done = e.currentTarget.checked;
							
							// ИСПРАВЛЕНО: /todoapi/${todo.id} вместо /todo_api/${todo.id}
							await fetch(`/todoapi/${todo.id}`, {
								method: 'PUT',
								body: JSON.stringify({ done }),
								headers: {
									'Content-Type': 'application/json'
								}
							});
							
							// Обновляем локальное состояние
							const updatedTodos = data.todos.map(t => 
								t.id === todo.id ? { ...t, done } : t
							);
							data = { ...data, todos: updatedTodos };
						}}
						class="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
					/>
					<span class={todo.done ? 'text-gray-400 line-through' : 'text-gray-700'}>
						{todo.description}
					</span>
				</label>
				<button
					aria-label="Delete todo"
					onclick={async () => {
						// ИСПРАВЛЕНО: /todoapi/${todo.id} вместо /todo_api/${todo.id}
						await fetch(`/todoapi/${todo.id}`, {
							method: 'DELETE'
						});
						
						// Удаляем из локального состояния
						const updatedTodos = data.todos.filter(t => t.id !== todo.id);
						data = { ...data, todos: updatedTodos };
					}}
					class="text-red-500 hover:text-red-700 transition-colors p-1"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</li>
		{/each}
	</ul>
	
	{#if data.todos.length === 0}
		<p class="text-center text-gray-500 mt-8">No todos yet. Add one above!</p>
	{/if}
</div>
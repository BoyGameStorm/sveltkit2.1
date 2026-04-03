<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import { fly, slide } from 'svelte/transition';

	let { data, form }: PageProps = $props();

	let edit_id = $state<string | null>(null);
	let creating = $state(false);
	let deleting = $state<string[]>([]);
	let editValue = $state('');

	function handleUpdateSubmit() {
		return async ({ result, update }) => { 
			console.log('Update result:', result);
			if (result.type === 'success') {
				await update(); 
				edit_id = null;
			}
		};
	}

	function handleDelete(todoId: string) {
		deleting = [...deleting, todoId];
		return async ({ update }) => {
			await update();
			deleting = deleting.filter(id => id !== todoId);
		};
	}

	function handleCreate() {
		creating = true;
		return async ({ update }) => {
			await update();
			creating = false;
		};
	}
</script>

<div class="mx-auto max-w-xl p-4">
	<h1 class="text-3xl font-bold text-center mb-6">todos</h1>
	{#if form?.error && edit_id === null}
		<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
			{form.error}
		</div>
	{/if}

	<!-- Форма создания новой задачи -->
	<form 
		method="POST" 
		action="?/create" 
		use:enhance={handleCreate}
		class="mb-8"
	>
		<label class="block text-sm font-medium text-gray-700 mb-2">
			Добавить новую задачу:
		</label>
		<div class="flex gap-2">
			<input
				type="text"
				name="description"
				value={form?.description ?? ''}
				autocomplete="off"
				required
				disabled={creating}
				class="flex-1 rounded-lg border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
				placeholder="Что нужно сделать?"
			/>
			<button 
				type="submit"
				disabled={creating}
				class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium min-w-[100px]"
			>
				{creating ? '...' : 'Создать'}
			</button>
		</div>
	</form>

	<!-- Список задач -->
	<div class="space-y-3">
		{#each data.todos.filter(todo => !deleting.includes(todo.id)) as todo (todo.id)}
			<div 
				in:fly={{ y: 20 }} 
				out:slide
				class="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
			>
				{#if edit_id === todo.id}
					<!-- Режим редактирования -->
					<form 
						method="POST" 
						action="?/update" 
						use:enhance={handleUpdateSubmit}
						class="space-y-3"
					>
						<input type="hidden" name="id" value={todo.id} />
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-2">
								Редактировать задачу:
							</label>
							<input
								type="text"
								name="description"
								value={editValue}
								autocomplete="off"
								required
								onfocus={(e) => e.target.select()}
								onblur={() => {
									setTimeout(() => {
										if (edit_id === todo.id) edit_id = null;
									}, 200);
								}}
								class="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							/>
						</div>
						<div class="flex gap-2">
							<button 
								type="submit"
								class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
							>
								💾 Сохранить
							</button>
							<button 
								type="button"
								onclick={() => edit_id = null}
								class="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
							>
								✖️ Отмена
							</button>
						</div>
					</form>
				{:else}
					<!-- Обычный режим просмотра -->
					<div class="flex items-center justify-between">
						<div class="flex-1">
							<span 
								ondblclick={() => {
									edit_id = todo.id;
									editValue = todo.description;
								}}
								class="text-lg cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg block transition-colors"
							>
								{todo.description}
							</span>
						</div>
						<div class="flex gap-2">
							<button
								type="button"
								onclick={() => {
									edit_id = todo.id;
									editValue = todo.description;
								}}
								class="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
								title="Редактировать"
							>
								✏️
							</button>
							<form 
								method="POST" 
								action="?/delete"
								use:enhance={() => handleDelete(todo.id)}
							>
								<input type="hidden" name="id" value={todo.id} />
								<button 
									type="submit"
									class="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
									title="Удалить"
								>
									🗑️
								</button>
							</form>
						</div>
					</div>
				{/if}
			</div>
		{:else}
			<!-- Пустой список -->
			<div class="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
				<p class="text-2xl text-gray-400 mb-2">✨</p>
				<p class="text-xl text-gray-600 mb-2">Здесь пока пусто</p>
				<p class="text-sm text-gray-500">Создайте свою первую задачу</p>
			</div>
		{/each}
	</div>

	<!-- Счетчик задач -->
	{#if data.todos.length > 0}
		<div class="mt-6 text-sm text-gray-500 text-center border-t pt-4">
			Всего задач: <span class="font-semibold text-indigo-600">{data.todos.length}</span>
			<span class="mx-2">•</span>
			Выполнено: <span class="font-semibold text-green-600">{data.todos.filter(t => t.done).length}</span>
		</div>
	{/if}
</div>


<script lang="ts">
	import { getGroups } from '$lib/data/groups.js';
	
	const allGroups = $derived(getGroups());
</script>

<div class="max-w-5xl mx-auto">
	<h1 class="text-3xl font-bold text-white mb-8">Список групп</h1>
	
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each allGroups as group}
			<div class="group-card bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-blue-500 hover:shadow-xl transition-all">
				<h2 class="text-xl font-semibold mb-3">
					<a href="/groups/{group.gname}" class="text-blue-400 hover:text-blue-300">
						{group.gname}
					</a>
				</h2>
				<div class="flex justify-between items-center">
					<span class="text-gray-400">Студентов:</span>
					<span class="text-white font-bold bg-gray-900 px-3 py-1 rounded-full">
						{group.slist.length}
					</span>
				</div>
			</div>
		{/each}
	</div>
</div>
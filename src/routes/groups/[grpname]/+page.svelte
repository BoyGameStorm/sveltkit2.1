<script lang="ts">
	interface Student {
		firstname: string;
		lastname: string;
		age: number;
		gender: 'male' | 'female';
	}

	interface Props {
		data: {
			group: {
				gname: string;
				slist: Student[];
			};
			formatted: string;
		};
	}
	
	let { data }: Props = $props();
	let { group, formatted } = $derived(data);
	
	// ФИЛЬТР ПО ПОЛУ: 'all' | 'male' | 'female'
	let genderFilter = $state<'all' | 'male' | 'female'>('all');
	
	// ОТФИЛЬТРОВАННЫЙ СПИСОК СТУДЕНТОВ
	let filteredStudents = $derived(
		genderFilter === 'all' 
			? group.slist 
			: group.slist.filter(s => s.gender === genderFilter)
	);
	
	// СТАТИСТИКА ДЛЯ КНОПОК
	let maleCount = $derived(group.slist.filter(s => s.gender === 'male').length);
	let femaleCount = $derived(group.slist.filter(s => s.gender === 'female').length);
</script>

<div class="max-w-6xl mx-auto">
	<!-- ХЛЕБНЫЕ КРОШКИ -->
	<div class="flex items-center gap-2 text-gray-400 mb-6">
		<a href="/groups" class="hover:text-blue-400 transition-colors">Группы</a>
		<span>/</span>
		<span class="text-white font-medium">{group.gname}</span>
	</div>
	
	<!-- ШАПКА С ФИЛЬТРАМИ -->
	<div class="flex flex-wrap items-center justify-between mb-8">
		<h1 class="text-3xl font-bold text-white">
			Группа <span class="text-blue-400">{group.gname}</span>
		</h1>
		
		<!-- ЁБАНЫЕ КНОПКИ ФИЛЬТРАЦИИ -->
		<div class="flex gap-2 bg-gray-800 p-1 rounded-lg border border-gray-700">
			<button
				onclick={() => genderFilter = 'all'}
				class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
					{genderFilter === 'all'
						? 'bg-blue-600 text-white shadow'
						: 'text-gray-300 hover:bg-gray-700'
					}"
			>
				Все <span class="ml-1 text-xs bg-gray-900 px-2 py-0.5 rounded-full">{group.slist.length}</span>
			</button>
			<button
				onclick={() => genderFilter = 'male'}
				class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
					{genderFilter === 'male'
						? 'bg-blue-600 text-white shadow'
						: 'text-gray-300 hover:bg-gray-700'
					}"
			>
				♂ Мужчины <span class="ml-1 text-xs bg-gray-900 px-2 py-0.5 rounded-full">{maleCount}</span>
			</button>
			<button
				onclick={() => genderFilter = 'female'}
				class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
					{genderFilter === 'female'
						? 'bg-blue-600 text-white shadow'
						: 'text-gray-300 hover:bg-gray-700'
					}"
			>
				♀ Женщины <span class="ml-1 text-xs bg-gray-900 px-2 py-0.5 rounded-full">{femaleCount}</span>
			</button>
		</div>
	</div>
	
	<!-- ИНФО О КОЛИЧЕСТВЕ ПОСЛЕ ФИЛЬТРА -->
	<div class="mb-4 text-sm text-gray-400">
		Показано: <span class="text-white font-medium">{filteredStudents.length}</span> из <span class="text-white font-medium">{group.slist.length}</span> студентов
	</div>
	
	<!-- ТАБЛИЦА СТУДЕНТОВ -->
	<div class="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
		<table class="w-full">
			<thead class="bg-gray-900/70">
				<tr>
					<th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">№</th>
					<th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Фамилия</th>
					<th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Имя</th>
					<th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Возраст</th>
					<th class="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Пол</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-700">
				{#each filteredStudents as student, i}
					<tr class="hover:bg-gray-700/50 transition-colors">
						<td class="px-6 py-4 text-gray-300">{i + 1}</td>
						<td class="px-6 py-4 font-medium text-white">{student.lastname}</td>
						<td class="px-6 py-4 text-gray-300">{student.firstname}</td>
						<td class="px-6 py-4">
							<span class="px-3 py-1 bg-gray-900 rounded-full text-sm text-gray-300">
								{student.age} лет
							</span>
						</td>
						<td class="px-6 py-4">
							{#if student.gender === 'male'}
								<span class="text-blue-400">♂ Муж.</span>
							{:else}
								<span class="text-pink-400">♀ Жен.</span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	
	<!-- ЕСЛИ НИКОГО НЕ НАШЛОСЬ -->
	{#if filteredStudents.length === 0}
		<div class="mt-8 p-8 text-center bg-gray-800/50 rounded-lg border border-gray-700">
			<p class="text-gray-400 text-lg">😢 Нет студентов с таким полом</p>
		</div>
	{/if}
	
	<!-- ФОРМАТИРОВАННАЯ СТРОКА (ДЛЯ ПРЕПОДОВ) -->
	{#if formatted}
		<div class="mt-8 p-5 bg-gray-800/70 rounded-lg border border-gray-700">
			<h3 class="text-sm font-medium text-gray-400 mb-2">Строка для преподов:</h3>
			<pre class="text-gray-300 font-mono text-sm whitespace-pre-wrap">{formatted}</pre>
		</div>
	{/if}
</div>
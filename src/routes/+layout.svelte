<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Link from '$lib/components/LinkComp.svelte';
	
	let { children } = $props();
	
	const navLinks = [
		{ addr: '/', text: 'home', exact: true },
		{ addr: '/blog', text: 'blog', exact: true },
		{ addr: '/groups', text: 'Список групп', exact: false },
		{ addr: '/tododb', text: 'Работа с бд', exact: false },
		{ addr: '/demo', text: 'Авторизация Гит', exact: false },
		{ addr: '/todoapi', text: 'Туду АПИ', exact: false}
	];
</script>

<nav class="flex justify-center items-center gap-4 bg-gray-800 py-4 px-6 shadow-lg">
	{#each navLinks as link (link.addr)}
		<Link 
			addr={link.addr} 
			text={link.text}
			exact={link.exact}
		/>
	{/each}
</nav>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
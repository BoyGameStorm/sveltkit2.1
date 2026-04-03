<script lang="ts">
	import { page } from '$app/stores';
	
	interface Props {
		addr: string;
		text: string;
		exact?: boolean;
	}
	
	let { addr, text, exact = true }: Props = $props();
	
	let isActive = $derived(
		exact 
			? $page.url.pathname === addr
			: $page.url.pathname.startsWith(addr)
	);
</script>

<a 
	href={addr}
	class="px-4 py-2 rounded-lg font-medium transition-all duration-200
		{isActive 
			? 'bg-blue-600 text-white shadow-lg scale-105' 
			: 'bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white'
		}"
>
	{text}
</a>
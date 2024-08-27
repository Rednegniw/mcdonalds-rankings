<script>
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';

	onMount(() => {
		if (typeof window !== 'undefined') {
			(window.adsbygoogle = window.adsbygoogle || []).push({});
		}
	});
</script>

<div class={cn('fixed bottom-0 w-full hidden', 'phone:block')}>
	<ins
		class="adsbygoogle"
		style="display:inline-block;width:320px;height:50px"
		data-ad-client="ca-pub-6899551553514815"
		data-ad-slot="4129157827"
	/>
</div>

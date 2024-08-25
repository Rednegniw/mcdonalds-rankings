<script>
	import '../app.css';
</script>

<div>
	<slot />
	<span class="flex justify-center w-full px-2 py-4 text-sm text-center text-gray-500"
		>This site is not affiliated in any way with McDonald's.</span
	>
</div>

<svelte:head>
	{#if process.env.NODE_ENV === 'production'}
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-PJMCFE593C"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());

			gtag('config', 'G-PJMCFE593C');
		</script>
	{/if}
</svelte:head>

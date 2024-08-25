<script>
	import '../app.css';
</script>

<slot />

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

<script lang="ts">
	import '../app.css';
	import AdBanner from '$lib/components/AdBanner.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="min-h-screen -mb-[50px]">
	<div class="pb-10">{@render children?.()}</div>
</div>
<div class="flex justify-center w-full px-2 py-4 text-sm text-center text-gray-500 h-[50px]">
	This site is not affiliated in any way with McDonald's.
</div>
<AdBanner />

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
		<meta name="google-adsense-account" content="ca-pub-6899551553514815" />
	{/if}
</svelte:head>

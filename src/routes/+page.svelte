<script lang="ts">
	import PlacesSearch from '$lib/components/PlacesSearch.svelte';
	import mcDonaldsIcon from '$lib/assets/mcdonalds_icon.svg';
	import { cn } from '$lib/utils';
	import { goto } from '$app/navigation';

	let searchFocused = false;

	const onResultsOpen = () => (searchFocused = true);
	const onBlur = () => (searchFocused = false);

	const onPlaceSelected = async (placeId: string, _, sessionToken: string) => {
		goto(`/results?place_id=${placeId}&sessionToken=${sessionToken}`);
	};

	const onLocationSuccess = (pos: GeolocationPosition) => {
		goto(`/results?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`);
	};
</script>

<main
	class={cn('flex flex-col items-center h-screen max-w-3xl mx-auto text-center', 'tablet:px-4')}
>
	<div class={cn('flex flex-col items-center w-full gap-10 mt-24', searchFocused && 'tablet:mt-4')}>
		<div class={cn('flex flex-col items-center gap-10', searchFocused && 'tablet:hidden')}>
			<img src={mcDonaldsIcon} alt="McDonalds" class="size-24" />
			<h1 class={cn('text-4xl font-bold', 'phone:text-3xl')}>
				Find the best ranked McDonalds near you.
			</h1>
		</div>

		<PlacesSearch
			{onPlaceSelected}
			{onLocationSuccess}
			on:resultsOpen={onResultsOpen}
			on:blur={onBlur}
		/>
	</div>
</main>

<svelte:head>
	<title>Find the best McDonalds in your area</title>
</svelte:head>

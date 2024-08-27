<script lang="ts">
	import { goto } from '$app/navigation';
	import PlacesList from '$lib/components/PlacesList.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import emptyResults from '$lib/assets/empty_results.svg';
	import PlacesSearch from '$lib/components/PlacesSearch.svelte';
	import { cn } from '$lib/utils.js';
	import PlacesFilterMenu from '$lib/components/PlacesFilterMenu.svelte';
	import PlacesMobileFilterDropdown from '$lib/components/PlacesMobileFilterDropdown.svelte';
	import { query } from '$lib/stores/index.js';

	export let data;
	export let radius = data.radius;
	export let openNow = data.openNow;

	$: places = data.places;
	$: lat = (+data.lat).toFixed(4);
	$: lng = (+data.lng).toFixed(4);

	let mobilePopoverOpen = false;

	const onFilter = async () => {
		const url = new URL(window.location.href);

		url.searchParams.set('radius', radius);
		url.searchParams.set('openNow', openNow);

		goto(url.toString(), { replaceState: true });
	};

	const onPlaceSelected = async (placeId: string, _, sessionToken: string) => {
		const url = new URL(window.location.href);

		url.searchParams.delete('lat');
		url.searchParams.delete('lng');
		url.searchParams.set('place_id', placeId);
		url.searchParams.set('sessionToken', sessionToken);

		goto(url.toString(), { replaceState: true });
	};

	const onLocationSuccess = (pos: GeolocationPosition) => {
		const url = new URL(window.location.href);

		url.searchParams.delete('place_id');
		url.searchParams.set('lat', pos.coords.latitude.toString());
		url.searchParams.set('lng', pos.coords.longitude.toString());

		goto(url.toString(), { replaceState: true });
	};
</script>

<main class={cn('container max-w-6xl py-8 mx-auto space-y-10', 'phone:p-4 phone:space-y-0')}>
	<PlacesSearch {onPlaceSelected} {onLocationSuccess} />

	<div class={cn('flex items-center justify-between', 'phone:gap-4')}>
		<div class="space-y-1">
			<h1 class={cn('text-2xl font-medium', 'phone:text-xl')}>Best McDonalds in the area</h1>
			<span class="text-sm text-gray-500">Latitude: {lat}, Longitude: {lng}</span>
		</div>
		<div class={cn('flex-shrink-0 hidden', 'phone:flex')}>
			<PlacesMobileFilterDropdown bind:popoverOpen={mobilePopoverOpen}>
				<PlacesFilterMenu
					on:click={(e) => {
						onFilter(e);
						mobilePopoverOpen = false;
					}}
					bind:radius
					bind:openNow
				/>
			</PlacesMobileFilterDropdown>
		</div>
	</div>

	<section class={cn('flex w-full gap-10', 'phone:mt-4')}>
		<div class={cn('basis-1/3', 'phone:hidden')}>
			<PlacesFilterMenu on:click={onFilter} bind:radius bind:openNow />
		</div>
		<Separator orientation="vertical" class={cn('mx-4 mr-0', 'phone:hidden')} />
		<div class={cn('basis-2/3', 'phone:basis-full phone:mt-4')}>
			{#if places.length}
				<PlacesList {places} />
			{:else}
				<div class={cn('space-y-10 text-center', 'phone:w-full phone:mt-12')}>
					<h1 class="text-2xl font-medium">No results found. Try a different radius?</h1>
					<img src={emptyResults} alt="No results found" class="mx-auto" />
				</div>
			{/if}
		</div>
	</section>
</main>

<svelte:head>
	<title>Best McDonald's near {($query ? $query : { lat }, { lng })}</title>
</svelte:head>

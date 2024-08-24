<script lang="ts">
	import { goto } from '$app/navigation';
	import PlacesList from '$lib/components/PlacesList.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import emptyResults from '$lib/assets/empty_results.svg';
	import PlacesSearch from '$lib/components/PlacesSearch.svelte';

	export let data;
	export let radius = data.radius;

	$: places = data.places;
	$: openNow = data.openNow;

	const onFilter = async (e) => {
		e.preventDefault();

		const url = new URL(window.location.href);

		url.searchParams.set('radius', radius);
		url.searchParams.set('openNow', openNow);

		goto(url.toString(), { replaceState: true });
	};

	const onPlaceSelected = async (placeId: string, _, sessionToken: string) => {
		const url = new URL(window.location.href);

		url.searchParams.set('place_id', placeId);
		url.searchParams.set('sessionToken', sessionToken);

		goto(url.toString(), { replaceState: true });
	};

	const onLocationSuccess = (pos: GeolocationPosition) => {
		const url = new URL(window.location.href);

		url.searchParams.set('lat', pos.coords.latitude.toString());
		url.searchParams.set('lng', pos.coords.longitude.toString());

		goto(url.toString(), { replaceState: true });
	};
</script>

<main class="container max-w-6xl py-8 mx-auto space-y-10">
	<div>
		<PlacesSearch {onPlaceSelected} {onLocationSuccess} />
	</div>

	<div class="space-y-1">
		<h1 class="text-2xl font-medium">Best McDonalds in the area</h1>
		<span class="text-sm text-gray-500">Latitude: {data.lat}, Longitude: {data.lng}</span>
	</div>

	<section class="flex w-full gap-10">
		<div class="space-y-8 basis-1/3">
			<div class="space-y-2">
				<label for="radius" class="text-sm font-medium">Radius (in meters)</label>
				<Input bind:value={radius} name="radius" min={0} max={10000} type="number" />
			</div>
			<div class="flex items-center space-x-2">
				<Checkbox id="terms" bind:checked={openNow} aria-labelledby="terms-label" />
				<label
					id="terms-label"
					for="terms"
					class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Is this place open now?
				</label>
			</div>
			<Button on:click={onFilter} class="w-full mt-4">Filter</Button>
		</div>
		<Separator orientation="vertical" class="mx-4 mr-0" />
		<div class=" basis-2/3">
			{#if places.length}
				<PlacesList {places} />
			{:else}
				<div class="space-y-10 text-center">
					<h1 class="text-2xl font-medium">No results found. Try a different radius?</h1>
					<img src={emptyResults} alt="No results found" class="mx-auto" />
				</div>
			{/if}
		</div>
	</section>

	<!-- {#if $position}
		Current position: {$position.lat}, {$position.lng}
	{/if}

	{#if places.length}
		<PlacesList bind:places />
	{/if} -->
</main>

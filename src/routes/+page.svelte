<script lang="ts">
	import PlacesList from "$lib/components/PlacesList.svelte";
	import PlacesSearch from "$lib/components/PlacesSearch.svelte";
	import { position } from '../stores'
	import type { Place } from "$lib/types";
	
	let places: Place[] = [];

	$: $position, getPlaces();
	$: console.log('places', places);

	async function getPlaces() {
		if ($position === null) {
			return;
		}

		const response = await fetch('/api/places?lat=' + $position.lat + '&lng=' + $position.lng);
		if (!response.ok) {
			throw new Error('Failed to fetch from Google Places API');
		}

		places = await response.json();
	}
</script>

<div>
	<h1 class="text-4xl font-bold">Find the best McDonalds in your area</h1>
	<PlacesSearch />
		
	{#if $position}
		Current position: {$position.lat}, {$position.lng}
	{/if}
	
	{#if places.length}
		<PlacesList bind:places />
	{/if}
</div>

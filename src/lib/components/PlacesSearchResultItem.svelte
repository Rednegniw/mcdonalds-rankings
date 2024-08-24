<script lang="ts">
	import type { PlacesAutocompletePrediction } from "$lib/types";

	export let place: PlacesAutocompletePrediction;

	$: console.log('place', place);
</script>

<div class="px-5 py-4 text-lg transition hover:bg-gray-100" on:click {...$$restProps}>
	{place.description}
</div>
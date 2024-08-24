<script lang="ts">
	import type { Place } from '$lib/types';
	import PlacesListItem from './PlacesListItem.svelte';

	export let places: Place[];
</script>

<div class="space-y-2">
	{#each places as place}
		<PlacesListItem {place} />
	{/each}
</div>

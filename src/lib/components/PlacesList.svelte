<script lang="ts">
	import type { Place } from "$lib/types";
	import PlacesListItem from "./PlacesListItem.svelte";

	export let places: Place[];
</script>

<div class="flex flex-col gap-4 p-4">
	{#each places as place}
		<PlacesListItem {place} />
	{/each}
</div>
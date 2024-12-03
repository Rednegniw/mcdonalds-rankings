<script lang="ts">
	import type { Place } from '$lib/types';
	import PlacesListItem from './PlacesListItem.svelte';

	interface Props {
		places: Place[];
	}

	let { places }: Props = $props();
</script>

<div class="space-y-2">
	{#each places as place}
		<PlacesListItem {place} />
	{/each}
</div>

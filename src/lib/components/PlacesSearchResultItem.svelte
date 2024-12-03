<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import type { PlacesAutocompletePrediction } from '$lib/types';

	interface Props {
		place: PlacesAutocompletePrediction;
		[key: string]: any;
	}

	let { place, ...rest }: Props = $props();
</script>

<div class="px-5 py-4 text-lg transition hover:bg-gray-100" onclick={bubble('click')} {...rest}>
	{place.description}
</div>

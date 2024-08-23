<script lang="ts">
	import mcDonaldsIcon from '$lib/assets/mcdonalds_icon.svg';
	import type { Place } from '$lib/types';
	import { SquareArrowOutUpRight } from 'lucide-svelte';
	import StarRating from './StarRating/StarRating.svelte';

	export let place: Place;
</script>

<div class="flex items-center justify-between">
	<div class="flex items-center gap-3">
		<img src={mcDonaldsIcon} alt="McDonalds" class="p-2 size-12" />
		<div class="flex flex-col gap-0.5">
			<span class="font-bold">{place.name}</span>
			<span class="text-sm text-gray-500">{place.vicinity}</span>
		</div>
	</div>
	{#if place.rating}
		<StarRating rating={place.rating} />
	{/if}
	{#if place.url}
		<a href={place.url} target="_blank" rel="noopener noreferrer">
			<SquareArrowOutUpRight class="w-6 h-6" />
		</a>
	{/if}
</div>

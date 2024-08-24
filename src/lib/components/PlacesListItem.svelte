<script lang="ts">
	import mcDonaldsIcon from '$lib/assets/mcdonalds_icon.svg';
	import type { Place } from '$lib/types';
	import { SquareArrowOutUpRight } from 'lucide-svelte';
	import StarRating from './StarRating/StarRating.svelte';
	import { goto } from '$app/navigation';

	export let place: Place;

	let googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${place.place_id}`;
</script>

<a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
	<div class="flex items-center justify-between p-5 py-3.5 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
		<div class="flex items-center gap-6">
			<img src={mcDonaldsIcon} alt="McDonalds" class="size-12" />
			<div class="flex flex-col gap-0.5">
				<span class="font-medium font-lg">{place.name}</span>
				<span class="text-gray-500">{place.vicinity}</span>
			</div>
		</div>
	
		<div class="flex flex-col items-end gap-1">
			{#if place.rating}
				<div class="flex items-center gap-2">
					<StarRating rating={place.rating} />
					<span class="text-sm text-gray-400">({place.user_ratings_total})</span>
				</div>
			{/if}
			<a
				href={googleMapsUrl}
				target="_blank"
				class="text-sm text-blue-800 hover:underline"
				rel="noopener noreferrer">See on Google Maps</a
			>
		</div>
	</div>
</a>

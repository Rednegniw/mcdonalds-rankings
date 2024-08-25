<script lang="ts">
	import mcDonaldsIcon from '$lib/assets/mcdonalds_icon.svg';
	import type { Place } from '$lib/types';
	import { cn } from '$lib/utils';
	import StarRating from './StarRating/StarRating.svelte';

	export let place: Place;

	$: googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${place.place_id}`;
</script>

<a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
	<div
		class={cn(
			'flex items-center justify-between p-5 py-3.5 rounded-xl cursor-pointer transition-colors',
			'hover:bg-gray-50',
			'phone:p-3 phone:border-b phone:border-gray-200 phone:rounded-none'
		)}
	>
		<div class={cn('flex items-center gap-6', 'phone:gap-4')}>
			<img src={mcDonaldsIcon} alt="McDonalds" class={cn('size-12', 'phone:size-8')} />
			<div class={cn('flex flex-col gap-0.5')}>
				<span class={cn('font-medium font-lg', 'phone:text-base')}>{place.name}</span>
				<span class={cn('text-gray-500', 'phone:text-sm')}>{place.vicinity}</span>
				{#if place.rating}
					<div class={cn('hidden items-center gap-2', 'phone:flex phone:gap-1')}>
						<StarRating rating={place.rating} />
						<span class="text-sm text-gray-400">({place.user_ratings_total})</span>
					</div>
				{/if}
			</div>
		</div>

		<div class={cn('flex flex-col items-end gap-1', 'phone:hidden')}>
			{#if place.rating}
				<div class="flex items-center gap-2">
					<StarRating rating={place.rating} />
					<span class="text-sm text-gray-400">({place.user_ratings_total})</span>
				</div>
			{/if}
			<a
				href={googleMapsUrl}
				target="_blank"
				class={cn('text-sm text-blue-800 hover:underline')}
				rel="noopener noreferrer">See on Google Maps</a
			>
		</div>
	</div>
</a>

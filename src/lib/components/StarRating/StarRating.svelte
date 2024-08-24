<script lang="ts">
	import Star from './Star.svelte';

	export let rating: number;
	let starPercentages: Record<number, number>;
	
	$: starPercentages = {
		1: rating > 0 && rating <= 1 ? (rating * 100) : 0,
		2: rating > 1 && rating <= 2 ? (rating - 1 * 100) : 0,
		3: rating > 2 && rating <= 3 ? (rating - 2 * 100) : 0,
		4: rating > 3 && rating <= 4 ? (rating - 3 * 100) : 0,
		5: rating > 4 ? (rating - 4 * 100) : 0
	};
</script>

<div class="flex items-center gap-2">
	<span class="font-medium">{rating}</span>
	<div class="flex gap-0.5">
		{#each Object.entries(starPercentages) as [index, percentage] (index)}
			<Star percentage={percentage} class="size-4" />
		{/each}
	</div>
</div>
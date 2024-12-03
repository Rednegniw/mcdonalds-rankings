<script lang="ts">
	import { cn } from '$lib/utils';
	import Star from './Star.svelte';

	interface Props {
		rating: number;
	}

	let { rating }: Props = $props();
	let starPercentages: Record<number, number> = $derived({
		1: rating > 0 && rating <= 1 ? rating * 100 : 100,
		2: rating > 1 ? (rating <= 2 ? (rating - 1) * 100 : 100) : 0,
		3: rating > 2 ? (rating <= 3 ? (rating - 2) * 100 : 100) : 0,
		4: rating > 3 ? (rating <= 4 ? (rating - 3) * 100 : 100) : 0,
		5: rating > 4 ? (rating <= 5 ? (rating - 4) * 100 : 100) : 0
	});
</script>

<div class="flex items-center gap-2">
	<span class={cn('font-medium', 'phone:text-sm')}>{rating}</span>
	<div class="flex gap-0.5">
		{#each Object.entries(starPercentages) as [index, percentage] (index)}
			<Star {percentage} class="size-4" />
		{/each}
	</div>
</div>

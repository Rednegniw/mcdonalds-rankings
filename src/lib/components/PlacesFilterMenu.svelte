<script lang="ts">
	import Button from './ui/button/button.svelte';
	import Checkbox from './ui/checkbox/checkbox.svelte';
	import Input from './ui/input/input.svelte';

	interface Props {
		radius: number;
		openNow: boolean;
	}

	let { radius = $bindable(), openNow = $bindable() }: Props = $props();
</script>

<div class="space-y-8">
	<div class="space-y-2">
		<label for="radius" class="text-sm font-medium">Radius (in meters)</label>
		<Input bind:value={radius} name="radius" min={0} max={10000} type="number" />
	</div>
	<div class="flex items-center space-x-2">
		<Checkbox id="terms" bind:checked={openNow} aria-labelledby="terms-label" />
		<label
			id="terms-label"
			for="terms"
			class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			Only places open now
		</label>
	</div>
	<Button on:click class="w-full mt-4">Filter</Button>
</div>

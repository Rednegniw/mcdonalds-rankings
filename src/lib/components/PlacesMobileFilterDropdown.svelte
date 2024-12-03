<script lang="ts">
	import { cn } from '$lib/utils';
	import * as Popover from '$lib/components/ui/popover';
	import { SlidersHorizontal } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';

	interface Props {
		popoverOpen?: boolean;
		children?: import('svelte').Snippet;
	}

	let { popoverOpen = $bindable(false), children }: Props = $props();
</script>

<Popover.Root bind:open={popoverOpen}>
	<Popover.Trigger class={cn('flex items-center gap-2')}>
		<Button variant="outline" class="px-2"><SlidersHorizontal class="size-6" /></Button>
	</Popover.Trigger>

	<Popover.Content>
		{@render children?.()}
	</Popover.Content>
</Popover.Root>

<script lang="ts">
	import { createBubbler, passive } from 'svelte/legacy';

	const bubble = createBubbler();
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	type $$Props = HTMLInputAttributes & { wrapperClass?: string };

	// Workaround for https://github.com/sveltejs/svelte/issues/9305

	interface Props {
		class?: $$Props['class'];
		value?: $$Props['value'];
		wrapperClass?: $$Props['class'];
		// Fixed in Svelte 5, but not backported to 4.x.
		readonly?: $$Props['readonly'];
		leftContent?: import('svelte').Snippet;
		rightContent?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		class: className = undefined,
		value = $bindable(undefined),
		wrapperClass = undefined,
		readonly = undefined,
		leftContent,
		rightContent,
		...rest
	}: Props = $props();
</script>

<div class={cn('border-input flex items-center gap-4 w-full rounded-lg border p-3', wrapperClass)}>
	{@render leftContent?.()}
	<input
		class={cn(
			'placeholder:text-muted-foreground flex-grow h-full border-none ring-0',
			'focus-visible:outline-none',
			className
		)}
		bind:value
		{readonly}
		onblur={bubble('blur')}
		onchange={bubble('change')}
		onclick={bubble('click')}
		onfocus={bubble('focus')}
		onfocusin={bubble('focusin')}
		onfocusout={bubble('focusout')}
		onkeydown={bubble('keydown')}
		onkeypress={bubble('keypress')}
		onkeyup={bubble('keyup')}
		onmouseover={bubble('mouseover')}
		onmouseenter={bubble('mouseenter')}
		onmouseleave={bubble('mouseleave')}
		onmousemove={bubble('mousemove')}
		onpaste={bubble('paste')}
		oninput={bubble('input')}
		use:passive={['wheel', () => bubble('wheel')]}
		{...rest}
	/>
	{@render rightContent?.()}
</div>

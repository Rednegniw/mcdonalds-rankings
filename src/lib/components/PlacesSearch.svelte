<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { Search } from 'lucide-svelte';
	import CurrentLocation from '$lib/components/CurrentLocation.svelte';
	import { Input } from '$lib/components/ui/input';
	import { goto } from '$app/navigation';
	import PlacesSearchResultItem from './PlacesSearchResultItem.svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { createEventDispatcher } from 'svelte';
	import { cn } from '$lib/utils';
	import type { PlacesAutocompletePrediction } from '$lib/types';

	let open = false;
	let value = '';
	let sessionToken: string = uuidv4();
	let suggestions: PlacesAutocompletePrediction[] = [];
	const dispatch = createEventDispatcher();

	$: console.log('sessionToken', sessionToken);

	const autocomplete = async (query: string) => {
		const response = await fetch(
			'/api/autocomplete?query=' + query + '&sessionToken=' + sessionToken
		);

		if (!response.ok) {
			throw new Error('Failed to fetch from Google Places API');
		}

		suggestions = await response.json();
	};

	$: {
		if (value.length) {
			dispatch('resultsOpen');
		} else {
			dispatch('blur');
		}
	}

	const onInput = () => {
		if (value.length > 2) {
			open = true;
			autocomplete(value);
		} else {
			open = false;
			suggestions = [];
		}
	};

	const onFocus = () => {
		if (value.length > 2) {
			open = true;
		}
	};

	const onPlaceSelected = async (id: string) => {
		goto(`/results?place_id=${id}&sessionToken=${sessionToken}`);
		open = false;
	};
</script>

<Popover.Root bind:open openFocus={false} disableFocusTrap closeOnOutsideClick>
	<Input
		bind:value
		on:focus={onFocus}
		on:input={onInput}
		placeholder="Find the best McDonalds in your area"
		wrapperClass={cn(
			'w-full border border-gray-300 shadow-md px-4 py-5 rounded-lg',
			'phone:px-3 phone:py-4'
		)}
		class={cn('text-xl', 'phone:text-base')}
		autocomplete="off"
	>
		<Search slot="leftContent" class={cn('size-6', 'phone:size-5')} />
		<CurrentLocation slot="rightContent" />
	</Input>
	<Popover.Trigger class="relative w-full -top-9" />
	<Popover.Content sameWidth class="p-0 overflow-y-auto">
		{#each suggestions as suggestion}
			<PlacesSearchResultItem
				place={suggestion}
				on:click={() => onPlaceSelected(suggestion.place_id)}
			/>
		{/each}
	</Popover.Content>
</Popover.Root>

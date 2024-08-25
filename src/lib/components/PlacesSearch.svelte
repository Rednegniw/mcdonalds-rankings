<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { Search } from 'lucide-svelte';
	import CurrentLocation from '$lib/components/CurrentLocation.svelte';
	import { Input } from '$lib/components/ui/input';
	import PlacesSearchResultItem from './PlacesSearchResultItem.svelte';
	import { createEventDispatcher } from 'svelte';
	import { cn } from '$lib/utils';
	import type { PlacesAutocompletePrediction } from '$lib/types';
	import { query } from '$lib/stores';
	import { v4 as uuidv4 } from 'uuid';

	let open = false;
	let loadingResults = false;
	let suggestions: PlacesAutocompletePrediction[] = [];
	let sessionToken: string = uuidv4();
	export let onLocationSuccess: (pos: GeolocationPosition) => void;
	export let onPlaceSelected: (placeId: string, name: string, sessionToken?: string) => void;
	const dispatch = createEventDispatcher();

	const autocomplete = async (query: string) => {
		loadingResults = true;
		const response = await fetch(
			'/api/autocomplete?query=' + query + '&sessionToken=' + sessionToken
		);

		if (!response.ok) {
			throw new Error('Failed to fetch from Google Places API');
		}

		suggestions = await response.json();
		loadingResults = false;
	};

	$: {
		if ($query.length) {
			dispatch('resultsOpen');
		} else {
			dispatch('blur');
		}
	}

	const onInput = () => {
		if ($query.length > 2) {
			open = true;
			autocomplete($query);
		} else {
			open = false;
			suggestions = [];
		}
	};

	const onFocus = (e) => {
		dispatch('focus');
		e.target.select();
		if ($query.length > 2) {
			open = true;
		}
	};
</script>

<Popover.Root bind:open openFocus={false} disableFocusTrap closeOnOutsideClick>
	<Input
		bind:value={$query}
		on:focus={onFocus}
		on:input={onInput}
		placeholder="Find the best McDonalds in your area"
		wrapperClass={cn(
			'w-full border border-gray-300 shadow-md px-4 py-5 rounded-lg',
			'phone:px-3 phone:py-4'
		)}
		class={cn('text-xl select-none', 'phone:text-base')}
		autocomplete="off"
	>
		<Search slot="leftContent" class={cn('size-6', 'phone:size-5')} />
		<CurrentLocation {onLocationSuccess} slot="rightContent" />
	</Input>
	<Popover.Trigger class="w-full " />
	<Popover.Content sameWidth class="p-0 overflow-y-auto" sideOffset={-15}>
		{#if loadingResults && !suggestions.length}
			<div class="flex items-center justify-center w-full h-full py-3">Loading...</div>
		{/if}
		{#if !loadingResults && !suggestions.length}
			<div class="flex items-center justify-center w-full h-full py-3">No results loaded.</div>
		{/if}
		{#each suggestions as suggestion}
			<PlacesSearchResultItem
				place={suggestion}
				on:click={() => {
					query.set(suggestion.description);
					open = false;
					onPlaceSelected(suggestion.place_id, suggestion.name, sessionToken);
				}}
			/>
		{/each}
	</Popover.Content>
</Popover.Root>

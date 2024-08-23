<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { Search } from 'lucide-svelte';
	import CurrentLocation from '$lib/components/CurrentLocation.svelte';
	import { Input } from '$lib/components/ui/input';
	import type { PlaceDetailsResponse } from '$lib/types';
	import { position } from '../../stores';

	let open = false;
	let value = '';
	let suggestions: google.maps.places.AutocompleteResponse['predictions'] = [];

	const autocomplete = async (query: string) => {
		const response = await fetch('/api/autocomplete?query=' + query);

		if (!response.ok) {
			throw new Error('Failed to fetch from Google Places API');
		}

		suggestions = await response.json();
	}

	const placeDetails = async (placeId: string): Promise<PlaceDetailsResponse['result']> => {
		console.log('placeId', placeId);
		const response = await fetch('/api/placeDetails?placeId=' + placeId);

		if (!response.ok) {
			throw new Error('Failed to fetch from Google Places API');
		}

		return response.json();
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
		if (value.length > 2) open = true;
	};

	const onPlaceSelected = async (id: string) => {
		open = false;
		const result = await placeDetails(id);
		if (result.geometry) {
			position.set(result.geometry.location);
		}
	};
</script>

<Popover.Root bind:open openFocus={false} disableFocusTrap>
	<Input
		bind:value
		on:focus={onFocus}
		on:input={onInput}
		placeholder="Where would you like to search?"
		wrapperClass="w-full border border-gray-200 shadow-md px-4"
		class="text-xl rounded-xl"
		autocomplete="off"
	>
		<Search slot="leftContent" class="size-6" />
		<CurrentLocation slot="rightContent" />
	</Input>
	<Popover.Trigger class="relative w-full -top-4" />
	<Popover.Content sameWidth class="overflow-y-auto max-h-80">
		{#each suggestions as suggestion}
			<div
				on:click={() => onPlaceSelected(suggestion.place_id)}
				class="flex items-center gap-3 p-4 border-b border-gray-200 hover:bg-gray-100"
			>
				<div class="flex flex-col flex-1 min-w-0">
					<span class="text-sm font-medium text-gray-900">{suggestion.description}</span>
				</div>
			</div>
		{/each}
	</Popover.Content>
</Popover.Root>

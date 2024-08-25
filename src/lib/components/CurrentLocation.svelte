<script lang="ts">
	import { cn } from '$lib/utils';
	import { LocateFixed } from 'lucide-svelte';
	import { position, query } from '../stores';
	import * as Tooltip from '$lib/components/ui/tooltip';

	let loading = false;
	export let onLocationSuccess: (pos: GeolocationPosition) => void;

	const onSuccess = (pos: GeolocationPosition) => {
		position.set({
			lat: pos.coords.latitude,
			lng: pos.coords.longitude
		});

		query.set(pos.coords.latitude.toFixed(4) + ',' + pos.coords.longitude.toFixed(4));

		onLocationSuccess(pos);
		loading = false;
	};

	const onError = (error: GeolocationPositionError) => {
		loading = false;
		console.error(error);
	};

	const onClick = () => {
		loading = true;
		const { geolocation } = navigator;

		if (!geolocation) {
			throw new Error('Geolocation is not supported in this browser.');
		}

		geolocation.getCurrentPosition(onSuccess, onError);
	};
</script>

<button on:click={onClick} aria-label="Current Location">
	<Tooltip.Root openDelay={0}>
		<Tooltip.Trigger class="flex items-center self-center">
			<LocateFixed
				class={cn(
					'text-gray-400 cursor-pointer size-6 hover:text-gray-500 animate',
					loading && 'animate-pulse scale-105 text-red-500 hover:text-red-500'
				)}
			/>
		</Tooltip.Trigger>
		<Tooltip.Content>Use your current location</Tooltip.Content>
	</Tooltip.Root>
</button>

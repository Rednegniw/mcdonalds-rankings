<script lang="ts">
	import { cn } from '$lib/utils';
    import { Locate } from 'lucide-svelte';
	import { position } from '../../stores';

	let loading = false;

	const onSuccess = (pos: GeolocationPosition) => {
		loading = false;
		position.set({
			lat: pos.coords.latitude,
			lng: pos.coords.longitude,
		});
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

<div on:click={onClick} aria-label="Current Location">
	<Locate class={cn("text-gray-400 cursor-pointer size-6 hover:text-gray-500", loading && "animate-spin")} />
</div>

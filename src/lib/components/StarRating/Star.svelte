<script lang="ts">
	import { v4 as uuid } from 'uuid';

	let className: string | undefined = undefined;
	export { className as class };
	export let percentage: number;

	let id = uuid();

	let yellow = '#fbbd05';
	let gray = '#d1d5db';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	viewBox="0 0 32 32"
	class={className}
>
	<defs>
		<linearGradient {id}>
			<stop offset={`${percentage}%`} stop-color={yellow} />
			<stop offset={'0%'} stop-color={gray} />
		</linearGradient>
	</defs>
	<path
		fill={`url(#${id})`}
		d="M20.388,10.918L32,12.118l-8.735,7.749L25.914,31.4l-9.893-6.088L6.127,31.4l2.695-11.533L0,12.118
  l11.547-1.2L16.026,0.6L20.388,10.918z"
	/>
</svg>

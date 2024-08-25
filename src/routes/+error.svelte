<script>
	import { cn } from '$lib/utils';
	import error404 from '$lib/assets/404_error.svg';
</script>

<div
	class={cn(
		'flex flex-col items-center justify-center w-full h-screen gap-12 text-center',
		'tablet:px-4'
	)}
>
	<h1 class={cn('text-4xl font-bold', 'phone:text-3xl')}>
		An unexpected error occurred. Please <a class="text-blue-700 underline" href="/">try again</a>.
	</h1>
	<img src={error404} alt="404 error" class={cn('max-w-lg mx-auto', 'phone:max-w-full')} />
</div>

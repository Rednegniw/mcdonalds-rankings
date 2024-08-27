// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				GOOGLE_PLACES_API_KEY: DurableObjectNamespace;
			};
			caches: CacheStorage & { default: Cache };
		}
	}
	interface Window {
		adsbygoogle: Array<object>;
	}
}

export {};

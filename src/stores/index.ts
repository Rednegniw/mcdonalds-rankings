import type { LatLngLiteral } from '$lib/types';
import { writable } from 'svelte/store';

export const position = writable<LatLngLiteral | null>(null);

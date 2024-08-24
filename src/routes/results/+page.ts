import { DEFAULT_RADIUS } from '$lib/constants.js';
import type { Place, PlaceDetailsResponse } from '$lib/types.js';

export const load = async ({ url: { searchParams }, fetch }) => {
	const place_id = searchParams.get('place_id');
	let lat = searchParams.get('lat');
	let lng = searchParams.get('lng');
	const sessionToken = searchParams.get('sessionToken');
	const radius = searchParams.get('radius') ?? DEFAULT_RADIUS
	const openNow = searchParams.get('openNow') === 'true';

	/*
		If no place_id OR lat and lng are provided, we throw an error.
	*/
	if (!place_id && (!lat && !lng)) {
		throw new Error('No place_id or lat and lng provided');
	}

	if (place_id && !lat && !lng) {
		/*  
			Get the location details along with longitude and latitude from the place id.
		*/
		const placeDetailsResponse = await fetch(
			`/api/placeDetails?placeId=${place_id}&sessionToken=${sessionToken}`
		);
		if (!placeDetailsResponse.ok) {
			throw new Error('Failed to fetch from Google Places API');
		}
	
		const placeDetailsResult: PlaceDetailsResponse['result'] = await placeDetailsResponse.json();

	
		if (!placeDetailsResult?.geometry) {
			throw new Error('No geometry found in place details');
		}
	
		/* 
			Here we get the information about the place from the place details response.
		*/
		lat = placeDetailsResult.geometry.location.lat.toString();
		lng = placeDetailsResult.geometry.location.lng.toString();
	}

	const response = await fetch(`/api/places?lat=${lat}&lng=${lng}&radius=${radius}`);
	if (!response.ok) {
		throw new Error('Failed to fetch from Google Places API');
	}

	const places: Place[] = await response.json();

	return {
		places,
		lat,
		lng,
		radius,
		openNow,
	};
};

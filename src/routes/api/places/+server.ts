import { json, type RequestHandler } from '@sveltejs/kit';
import { GOOGLE_PLACES_API_KEY as apiKey } from '$env/static/private';
import type { PlacesNearbySearchResponse } from '$lib/types';

export const GET: RequestHandler = async ({ url }) => {
	const lat = url.searchParams.get('lat');
	const lng = url.searchParams.get('lng');

	const type = 'restaurant';
	const keyword = 'McDonald\'s';

	if (!lat || !lng) {
		return json({ error: 'Latitude and Longitude are required' }, { status: 400 });
	}

	const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&type=${type}&keyword=${keyword}&key=${apiKey}&rankby=distance`;

	const response = await fetch(apiUrl);
	if (!response.ok) {
		return json({ error: 'Failed to fetch from Google Places API' }, { status: 500 });
	}

	const data: PlacesNearbySearchResponse = await response.json();

    // Only return places that contain the keyword
    const filteredResults = data.results.filter(place => place.name?.includes(keyword));

	return json(filteredResults, { status: 200 });
};
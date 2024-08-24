import { type RequestHandler, json } from '@sveltejs/kit';
import { GOOGLE_PLACES_API_KEY as apiKey } from '$env/static/private';
import type { PlaceDetailsResponse } from '$lib/types';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const placeId = url.searchParams.get('placeId');
	const sessionToken = url.searchParams.get('sessionToken');

	console.log('PLACE_DETAILS sessionToken', sessionToken);

	const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&sessiontoken=${sessionToken}`;

	const response = await fetch(apiUrl);
	if (!response.ok) {
		return json(
			{ error: 'Failed to fetch from Google Places API', message: response.statusText },
			{ status: 500 }
		);
	}

	const data: PlaceDetailsResponse = await response.json();

	return json(data.result);
};

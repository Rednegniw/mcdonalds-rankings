import { json, type RequestHandler } from '@sveltejs/kit';
import { GOOGLE_PLACES_API_KEY as apiKey } from '$env/static/private';

export const GET: RequestHandler = async ({ url, fetch }) => {
	const query = url.searchParams.get('query');
	const sessionToken = url.searchParams.get('sessionToken');
	const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}&sessiontoken=${sessionToken}`;

	console.log('AUTOCOMPLETE sessionToken', sessionToken);

	if (!query?.length) {
		return json({ error: 'No query provided' }, { status: 400 });
	}

	const response = await fetch(apiUrl);
	if (!response.ok) {
		return json(
			{ error: 'Failed to fetch from Google Places API', message: response.statusText },
			{ status: 500 }
		);
	}

	const data: google.maps.places.AutocompleteResponse = await response.json();

	return json(data.predictions, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};

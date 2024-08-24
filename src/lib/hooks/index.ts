import { goto } from '$app/navigation';

interface GoToResultsProps {
	placeId?: string;
	lat?: number;
	lng?: number;
	sessionToken?: string;
}

export const goToResults = ({ placeId, lat, lng }: GoToResultsProps) => {
	const currentUrl = new URL(window.location.href);
	const url = new URL('/results', currentUrl.origin);

	if (placeId) {
		url.searchParams.set('place_id', placeId);
	} else if (lat && lng) {
		url.searchParams.set('lat', lat.toString());
		url.searchParams.set('lng', lng.toString());
	}

	const radius = currentUrl.searchParams.get('radius');
	const openNow = currentUrl.searchParams.get('openNow');

	if (radius) {
		url.searchParams.set('radius', radius);
	}

	if (openNow) {
		url.searchParams.set('openNow', openNow);
	}

	goto(url.toString(), { replaceState: true });
};

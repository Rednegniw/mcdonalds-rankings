type PlacesSearchStatus = 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR';

export interface PlaceDetailsResponse {
	html_attributions: string[];
	result: Place;
	status: PlacesSearchStatus;
	info_messages?: string[];
}

export interface PlacesNearbySearchResponse {
	html_attributions: string[];
	results: Place[];
	status: PlacesSearchStatus;
	error_message?: string;
	info_messages?: string[];
	next_page_token?: string;
}

export interface LatLngLiteral {
	lat: number;
	lng: number;
}

interface Geometry {
	location: LatLngLiteral;
	viewport: {
		northeast: LatLngLiteral;
		southwest: LatLngLiteral;
	};
}

interface AddressComponent {
	long_name: string;
	short_name: string;
	types: string[];
}

interface PlaceOpeningHoursPeriodDetail {
	day: number;
	time: string;
	date?: string;
	truncated?: boolean;
}

interface PlaceOpeningHoursPeriod {
	open: PlaceOpeningHoursPeriodDetail;
	close?: PlaceOpeningHoursPeriodDetail;
}

interface PlaceSpecialDay {
	date?: string;
	exceptional_hours?: boolean;
}

interface PlaceOpeningHours {
	open_now?: boolean;
	periods?: PlaceOpeningHoursPeriod[];
	special_days?: PlaceSpecialDay[];
	type?: string;
	weekday_text?: string[];
}

interface PlaceEditorialSummary {
	language?: string;
	overview?: string;
}

interface PlacePhoto {
	height: number;
	html_attributions: string[];
	photo_reference: string;
	width: number;
}

export interface Place {
	adress_components?: AddressComponent[];
	adr_address?: string;
	business_status?: string;
	curbside_pickup?: boolean;
	current_opening_hours?: PlaceOpeningHours;
	delivery?: boolean;
	dine_in?: boolean;
	editorial_summary?: PlaceEditorialSummary;
	formatted_address?: string;
	formatted_phone_number?: string;
	geometry?: Geometry;
	icon?: string;
	icon_background_color?: string;
	icon_mask_base_uri?: string;
	international_phone_number?: string;
	name?: string;
	opening_hours?: PlaceOpeningHours;
	photos?: PlacePhoto[];
	place_id?: string;
	plus_code?: google.maps.places.PlusCode;
	price_level?: number;
	rating?: number;
	reservable?: boolean;
	reviews?: google.maps.places.PlaceReview[];
	secondary_opening_hours?: PlaceOpeningHours;
	serves_beer?: boolean;
	serves_breakfast?: boolean;
	serves_brunch?: boolean;
	serves_dinner?: boolean;
	serves_lunch?: boolean;
	serves_vegetarian_food?: boolean;
	serves_wine?: boolean;
	takeout?: boolean;
	url?: string;
	user_ratings_total?: number;
	utc_offset?: number;
	vicinity?: string;
	website?: string;
	wheelchair_accessible_entrance?: boolean;
}
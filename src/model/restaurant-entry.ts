export class RestaurantEntry {
	id: string;
	alia: string;
	name: string;
	image_url: string;
	is_closed: boolean;
	url: string;
	review_count: number;
    categories: any[];
    rating: number;
    coordinates: any;
    transactions: any[];
    price: string;
    location: any;
    phone: string;
    display_phone: string;
    distance: number;
}
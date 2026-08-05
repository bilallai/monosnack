export type CategoryId = 
  | 'entrees-salades' 
  | 'plats-grillades' 
  | 'sandwichs-tacos' 
  | 'pizzas' 
  | 'crepes-desserts' 
  | 'boissons';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number; // in DA (Algerian Dinar)
  description: string;
  image: string;
  itemNumber?: string;
}

export interface Category {
  id: CategoryId;
  number: string;
  name: string;
  subtitle: string;
}

export interface RestaurantInfo {
  name: string;
  slogan: string;
  subtitle: string;
  address: string;
  phone: string;
  hours: string;
  currencySymbol: string;
}

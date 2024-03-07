export interface Party {
  id: number;
  perks: string[];
  images: Image;
  name: string;
  category: number;
  address: string;
  shortDetail: string;
  mainDetail: string;
  maxCustomers: number;
  price: number;
  rating: number;
}

export interface Image {
  resized: [];
}

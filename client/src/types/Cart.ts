export type CartItem = {
  _id: string;
  name: string;
  image: string | undefined;
  slug: unknown;
  price: number;
  quantity: number;
  countInStock: number;
};

export type ShippingAddress = {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

export type Cart = {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};

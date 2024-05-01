declare type LoginFormProps = {
  type: "Sign In" | "Sign Up";
};

declare type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

declare type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

declare type AuthenticateUserProps = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

declare interface UserDetailsTypes {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  image: string;
  balance: number;
}

type Product = {
  id: number;
  name: string;
  description: string;
  category: number[];
  price: number;
  quantity: number;
  created_at: string;
  location: number;
  images: { id: number; image: string }[];
  favourites: number;
  user: number;
};

declare type SearchedProductTypes = {
  count: number;
  next: null | string;
  previous: null | string;
  results: Product[];
}

declare type ProductList = Product[];

declare type favoriteProductList = {
  product: Product;
}

declare type fetchProductsTypes = {
  min_price?: string;
  max_price?: string;
  location?: string;
  searchQuery?: string;
  page_size?: number;
  user?: number;
  page?: number;
}

declare type PromotingProps = {
  buttonText: string;
  image: {
    src: any;
    alt: string;
  };
  title: string;
  description: string;
}


declare type CartProducts = {
  quantity: number;
  product: {
    id: number;
    name: string;
    category: number[];
    created_at: string;
    description: string;
    favourites: number;
    id: number;
    images: { id: number; image: string }[];
    location: number;
    name: string;
    price: number;
    quantity: number;
    user: numbrt;
  };
};

declare type NewProductsCardTypes =  {
  id: number;
  images: {
    id: number;
    image: string;
  }[];
  title: string;
  price: number;
}
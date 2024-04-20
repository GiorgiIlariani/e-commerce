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

declare type Product = {
  id: number;
  name: string;
  description: string;
  category: number[];
  price: number;
  quantity: number;
  created_at: string; // Assuming this is a string representation of datetime
  location: string;
  favourites?: number;
  images: { id: number; image: string }[];
  user: number;
};

declare type ProductList = Product[];

declare type favoriteProductList = {
  product: Product;
}


declare type fetchProductsTypes = {
  min_price: string;
  max_price: string;
  location: string;
}

declare type FavoriteCardTypes = {
  id: number;
  product: number;
  user: number;
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
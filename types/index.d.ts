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
  category?: string;
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
  route: string;
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

declare interface TransactionHistoryType {
  sender: number;
  receiver: number;
  amount: number;
  date: string;
}

declare interface PayForProductsProps {
  accessToken: string;
  refreshToken: string;
  product: number;
  quantity: number;
}

declare interface FillBalanceProps {
  accessToken: string;
  refreshToken: string;
  amount: number;
}

declare interface TransferToSomeoneProps {
  accessToken: string;
  refreshToken: string;
  receiver: number;
  amount: number;
}

declare interface UploadedImagesProps {
  imageUrl: string;
  handleImageRemove: (index: number, imageId: number) => void;
  index: number;
  imageId: number;
}

declare interface UploadImageContainerProps {
  handleImagesChange: (
    e: ChangeEvent<HTMLInputElement>,
    field: any
  ) => Promise<void>;
  field: any;
  isAtListOneImage: boolean;
}

declare interface FilteredProductsForm {
  searchedProducts: Product[];
  favoriteProducts: any;
  refetchFavorites: () => Promise<void>;
  refetchCartProducts: () => Promise<void>;
  cartProducts: CartProducts[];
  isAuthenticated: boolean;
  userId: number | undefined;
}

declare interface ProductCardProps extends Product  {
  isFavorite?: boolean;
  isInCart?: boolean;
  refetchFavorites?: () => Promise<void>;
  refetchCartProducts?: () => Promise<void>;
  baseUrl?: string;
  setFavoriteProducts?: React.Dispatch<
    React.SetStateAction<favoriteProductList[]>
  >;
  isOnFavoritePage?: boolean;
  isNewProduct?: boolean;
  isAuthenticated?: boolean;
  userId?: number | undefined;
}

declare interface CheckoutModalProps {
  cartProducts: CartProducts[];
  totalPrice: number;
  accessToken: string | false | null;
  refreshToken: string | false | null;
  user: UserDetailsTypes | undefined;
}

declare interface ConfirmationModalProps {
  onConfirm: () => void;
  title: string;
  message: React.ReactNode;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  onCancel: () => void;
}

declare interface DeactivateAccountAlertDialogProps { 
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onDeleteAccount: () => Promise<void>;
  onCancel: () => void;
  isRemoving: boolean;
}

declare interface ProfileModalProps {
  setShowProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  showProfileModal: boolean;
  isAuthenticated: boolean;
  user: UserDetailsTypes | undefined;
}

declare interface CartItemProps {
  cartItem: CartProducts;
  handleRemoveCartItem: (productId: number) => Promise<void>;
  selectedCartProductsId: number[];
  setSelectedCartProductsId: Dispatch<SetStateAction<number[]>>;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  setCartProducts: Dispatch<SetStateAction<CartProducts[]>>;
};

declare interface DropdownProps {
  value?: string;
  onChangeHandler?: (value: string) => void;
  placeholder: string;
  type: "category" | "location";
  setSelectedCategory?: Dispatch<SetStateAction<string>>;
};

declare interface HeaderSignInInfoProps {
  user: UserDetailsTypes | undefined;
  isLoading: boolean;
  isFetching: boolean;
}

declare type PaginationComponentProps = {
  count: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};
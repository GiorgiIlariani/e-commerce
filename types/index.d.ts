declare type LoginFormProps = {
    type: "Sign In" | "Sign Up";
}

declare type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

declare type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}


declare type AuthenticateUserProps = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

declare interface UserDetailsTypes {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile: {
    image: string;
    balance: number;
  };
}
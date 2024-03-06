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

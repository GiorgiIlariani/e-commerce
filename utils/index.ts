import qs from "query-string";

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function sliceDescription(
  text: string,
  length: number,
  isSliced: boolean
) {
  if (text.length >= length && isSliced) {
    const newText = text.slice(0, length);

    return newText + "...";
  } else {
    return text;
  }
}

export function sliceTitle(
  text: string,
  length: number,
  isSliced: boolean
) {
  if (text.length >= length && isSliced) {
    const newText = text.slice(0, length);

    return newText + "...";
  } else {
    return text;
  }
}
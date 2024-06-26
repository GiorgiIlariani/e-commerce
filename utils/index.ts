import qs from "query-string";

// create all with chat gpt

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

export const convertDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  return formattedDate;
};


// calculates tha transaction history
export  const calculateTotals = ({ transactionHistory, user }: { transactionHistory: TransactionHistoryType[], user: UserDetailsTypes | undefined }) => {
    let income = 0;
    let expence = 0;
    transactionHistory.forEach((transaction) => {
      if (transaction.receiver === user?.id) {
        income += transaction.amount;
      }
      if (transaction.sender === user?.id) {
        expence += transaction.amount;
      }
    });
    return { income, expence };
  };

export  const getPriceText = ({ minPrice, maxPrice }: { minPrice: number; maxPrice: number }) => {
  if (minPrice && maxPrice) {
    return `${minPrice}-${maxPrice}`;
  } else if (minPrice) {
    return `${minPrice}`;
  } else if (maxPrice) {
    return `-${maxPrice}`;
  } else {
    return "Price";
  }
};
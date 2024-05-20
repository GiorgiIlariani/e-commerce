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

export function generateCode() {
    var characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var code = '';
    for (var i = 0; i < 5; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}


  function getMonthName(date: Date): string {
    const options = { month: "long" } as const;
    return date.toLocaleDateString("en-US", options);
  }

export function getNextThreeDays() {
  const today = new Date();
  const dates = [];
  const prices = [12, 8, 6];

  for (let i = 0; i < 3; i++) {
    const current = new Date(today);
    current.setDate(today.getDate() + i);
    const options = { month: 'long' } as const;
    const month = current.toLocaleDateString('en-US', options);
    const date = current.getDate();
    dates.push({ today: month, date, price: prices[i] });
  }

  return dates;
}

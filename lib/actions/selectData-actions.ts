const url = "http://16.16.253.75";

export const fetchDropdownContentList = async (
  type: "location" | "category"
) => {
  const endpoint = `${url}/products/${
    type === "category" ? "category/" : "location/"
  }`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const dropdownContent = await response.json();
    return dropdownContent;
  } catch (error) {
    console.error("Error while fetching categories:", error);
    throw error;
  }
};
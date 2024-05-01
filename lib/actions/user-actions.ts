import { fetchWithRetry } from "./refresh-token";

 const url = 'http://16.16.253.75';


export const authenticateUser = async ({
  email,
  first_name,
  last_name,
  username,
  password,
}: AuthenticateUserProps) => {
    try {
      const response = await fetch(`${url}/users/`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          first_name,
          last_name,
          username,
          password,
        })
      });

    if (!response.ok) {
      throw new Error('Failed to authenticate user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
};

export const SignInUser = async ({ username, password }: { username: string, password: string}) => {
  const response = await fetch(`${url}/api/token/`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  const data = await response.json();

  // Handle response data here
  return data;
}

export const deleteUser = async (user: string) => {
  try {
    const response = await fetch(`${url}/users/me/`, {
      method: 'DELETE',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${user}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    
    return response.status;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const fetchCurrentUser = async (user: string) => {
  try {
    const response = await fetch(`${url}/users/me/`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${user}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch current user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};


export const updateUserProfileImage = async ({
  accessToken,
  image,
}: {
  accessToken: string;
  image: any;
}) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(`${url}/users/profile/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update user profile");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const updateUserInformation = async (
  userData: any,
  accessToken: string,
  refreshToken: string
) => {
  const options = {
    method: "PATCH",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetchWithRetry(
      `${url}/users/me/`,
      options,
      accessToken,
      refreshToken
    );
    return response.status;
  } catch (error) {
    console.error("Error while updating user information:", error);
    throw error;
  }
};

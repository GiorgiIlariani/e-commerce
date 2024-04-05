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


export const deleteUser = async (user: string, password: string) => {
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

    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


export const loginApi = async (username: string, password: string) => {
  const response = await fetch('https://fakestoreapi.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  return response.json(); // { token: '...' }
};

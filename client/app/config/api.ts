const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const setToken = (token: string) => {
  document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;
};

export const getToken = () => {
  return document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
};

export const removeToken = () => {
  document.cookie = 'token=; path=/; max-age=0';
};

export const register = async (email: string, password: string, name: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Registration failed');
  }

  return data;
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }

  return data;
};

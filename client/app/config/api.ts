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
  console.log('Setting token:', token);
  const isDevelopment = process.env.NODE_ENV === 'development';
  const cookieOptions = [
    `token=${token}`,
    'path=/',
    `max-age=${60 * 60 * 24 * 7}`,
    isDevelopment ? '' : 'secure',
    isDevelopment ? '' : 'samesite=strict'
  ].filter(Boolean).join('; ');
  
  document.cookie = cookieOptions;
  console.log('Current cookies after setting:', document.cookie);
};

export const getToken = () => {
  console.log('Getting token from cookies:', document.cookie);
  const cookies = document.cookie.split('; ');
  console.log('Split cookies:', cookies);
  const tokenCookie = cookies.find(row => row.startsWith('token='));
  console.log('Found token cookie:', tokenCookie);
  if (!tokenCookie) {
    console.log('No token cookie found');
    return null;
  }
  const token = tokenCookie.split('=')[1];
  console.log('Extracted token:', token);
  return token || null;
};

export const removeToken = () => {
  console.log('Removing token');
  document.cookie = 'token=; path=/; max-age=0';
  console.log('Current cookies after removal:', document.cookie);
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

export const login = async (email: string, password: string) => {
    try {
        console.log('Making login request...');
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        console.log('Login response status:', response.status);
        const data = await response.json();
        console.log('Login response data:', data);

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        return data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
};

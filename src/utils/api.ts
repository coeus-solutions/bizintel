export const API_BASE_URL = 'http://localhost:8000/api/v1';

interface ApiOptions extends RequestInit {
  requireAuth?: boolean;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface ApiError {
  detail: Array<{ loc: (string | number)[]; msg: string; type: string; }>;
  message?: string;
}

export async function apiRequest<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { requireAuth = true, headers: customHeaders = {}, ...rest } = options;

  const headers = new Headers({
    'Content-Type': 'application/json',
    ...customHeaders,
  });

  if (requireAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    headers.append('Authorization', `Bearer ${token}`);
  }

  try {
    console.log(`Making API request to: ${API_BASE_URL}${endpoint}`); // Debug log
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...rest,
    });

    const data = await response.json();
    console.log('API response:', { status: response.status, data }); // Debug log

    if (!response.ok) {
      // Handle API error responses
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Authentication failed. Please log in again.');
      }

      const error = data as ApiError;
      throw new Error(
        error.detail?.[0]?.msg || 
        error.message || 
        `Request failed with status ${response.status}`
      );
    }

    return data as T;
  } catch (error) {
    console.error('API request error:', error); // Debug log
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
} 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { Button } from '../Button';
import { Input } from '../Input';
import { useAuth } from '../../context/AuthContext';

interface AuthFormProps {
  type: 'login' | 'register';
}

interface ApiError {
  detail: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPasswordError('');

    // Only validate password length on register
    if (type === 'register' && password.length !== 8) {
      setPasswordError('Password must be exactly 8 characters long');
      return;
    }

    setLoading(true);

    try {
      if (type === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        try {
          // Try to parse the error message as JSON
          const apiError = JSON.parse(err.message) as ApiError;
          setError(apiError.detail);
        } catch {
          // If parsing fails, use the error message directly
          setError(err.message);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Only show password validation error on register page
    if (type === 'register') {
      setPasswordError(newPassword.length !== 8 ? 'Password must be exactly 8 characters long' : '');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-700">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      <Input
        label="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        error={type === 'register' ? passwordError : undefined}
        required
      />

      <Button
        type="submit"
        className="w-full"
        loading={loading}
      >
        {type === 'login' ? 'Sign in' : 'Create account'}
      </Button>
    </form>
  );
};
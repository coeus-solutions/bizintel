import { useState, useEffect } from 'react';
import { Business } from '../types';

// Demo data
const DEMO_BUSINESS: Business = {
  id: '1',
  name: 'TechCorp Solutions',
  url: 'https://techcorp.com',
  status: 'completed'
};

export function useBusiness(id: string | undefined) {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (id === '1') {
          setBusiness(DEMO_BUSINESS);
        } else {
          setError('Business not found');
        }
      } catch (err) {
        setError('Failed to load business details');
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id]);

  return { business, loading, error };
}
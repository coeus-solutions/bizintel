import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PlusCircle, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Business } from '../types';
import { apiRequest } from '../utils/api';
import { useAuth } from '../context/AuthContext';

interface BusinessSummary {
  id: string;
  name: string;
  url: string;
  status: 'analyzing' | 'completed' | 'error';
  created_at: string;
  updated_at: string;
}

interface BusinessHistoryResponse {
  status: string;
  data: BusinessSummary[];
}

interface LocationState {
  message?: string;
  analysisStarted?: boolean;
  businessId?: string;
}

export const Dashboard: React.FC = () => {
  const [businesses, setBusinesses] = useState<BusinessSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  useEffect(() => {
    // Check for success message in location state
    const state = location.state as LocationState;
    if (state?.message) {
      setSuccessMessage(state.message);
      // Clear the message from location state but keep other state
      navigate(location.pathname, { 
        replace: true, 
        state: { 
          analysisStarted: state.analysisStarted,
          businessId: state.businessId
        } 
      });
    }
  }, [location, navigate]);

  useEffect(() => {
    fetchBusinessHistory();
    // Set up polling if analysis was just started
    const state = location.state as LocationState;
    if (state?.analysisStarted) {
      const pollInterval = setInterval(fetchBusinessHistory, 5000); // Poll every 5 seconds
      return () => clearInterval(pollInterval);
    }
  }, [location.state]);

  const fetchBusinessHistory = async () => {
    try {
      setLoading(true);
      const response = await apiRequest<BusinessHistoryResponse>('/business-history', {
        method: 'GET',
      });
      console.log('Business history response:', response);

      if (response.status === 'success' && Array.isArray(response.data)) {
        setBusinesses(response.data);
        
        // If all businesses are completed/error, or if the specific business is completed/error, stop polling
        const state = location.state as LocationState;
        if (state?.analysisStarted) {
          const shouldStopPolling = state.businessId
            ? response.data.find(b => b.id === state.businessId)?.status !== 'analyzing'
            : !response.data.some(b => b.status === 'analyzing');

          if (shouldStopPolling) {
            const completedBusiness = response.data.find(b => b.id === state.businessId);
            if (completedBusiness?.status === 'completed') {
              navigate(`/business/${state.businessId}/details`, { 
                replace: true,
                state: { 
                  fromAnalysis: true,
                  message: 'Business analysis completed successfully.' 
                }
              });
            } else {
              navigate(location.pathname, { 
                replace: true, 
                state: { 
                  ...state,
                  analysisStarted: false,
                  message: 'Business analysis completed.'
                } 
              });
            }
          }
        }
      } else {
        setBusinesses([]);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching business history:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch business history';
      
      if (errorMessage.includes('Authentication failed') || errorMessage.includes('validate credentials')) {
        await logout();
        navigate('/login');
        return;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderBusinessURL = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          {hostname}
          <ExternalLink className="w-4 h-4" />
        </a>
      );
    } catch (e) {
      return (
        <span className="text-sm text-gray-500">
          {url}
        </span>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Business Analysis History</h1>
        <Link to="/analyze">
          <Button>
            <PlusCircle className="w-5 h-5 mr-2" />
            New Analysis
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-green-700">
          {successMessage}
        </div>
      )}

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        {(!businesses || businesses.length === 0) ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">No business analyses yet</p>
            <Link to="/analyze">
              <Button variant="outline">
                Start Your First Analysis
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {businesses.map((business) => (
                  <tr key={business.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {business.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderBusinessURL(business.url)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${business.status === 'completed' ? 'bg-green-100 text-green-800' : 
                          business.status === 'analyzing' ? 'bg-blue-100 text-blue-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {business.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {business.updated_at ? new Date(business.updated_at).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {business.status === 'analyzing' ? (
                        <span className="text-gray-400 cursor-not-allowed">
                          View Details
                        </span>
                      ) : (
                        <Link
                          to={`/business/${business.id}/details`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { apiRequest } from '../utils/api';

interface BusinessAnalysisRequest {
  business_name: string;
  business_url: string;
  client: string;
}

interface BusinessAnalysisResponse {
  message: string;
  business_id: string;
  status: 'processing';
}

interface ApiErrorResponse {
  detail: string | {
    loc: (string | number)[];
    msg: string;
    type: string;
  }[];
}

export const BusinessAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BusinessAnalysisRequest>({
    business_name: '',
    business_url: '',
    client: 'web'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.business_name.trim() || !formData.business_url.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const response = await apiRequest<BusinessAnalysisResponse | ApiErrorResponse>('/business-insights', {
        method: 'POST',
        body: JSON.stringify({
          business_name: formData.business_name.trim(),
          business_url: formData.business_url.trim(),
          client: formData.client
        }),
      });

      console.log('Business analysis response:', response);

      // Check if response is an error response
      if ('detail' in response) {
        const errorMessage = typeof response.detail === 'string' 
          ? response.detail 
          : response.detail[0]?.msg || 'Failed to start business analysis';
        setError(errorMessage);
        return;
      }

      // Check if response has the expected structure
      if (response && response.business_id && response.status === 'processing') {
        // Redirect to dashboard after successful submission
        navigate('/dashboard', { 
          state: { 
            message: response.message || 'Business analysis started successfully. You will be notified when it completes.',
            analysisStarted: true,
            businessId: response.business_id
          }
        });
      } else {
        console.error('Unexpected response structure:', response);
        setError('Failed to start business analysis. Please try again.');
      }
    } catch (err) {
      console.error('Error starting business analysis:', err);
      setError(err instanceof Error ? err.message : 'Failed to start business analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">New Business Analysis</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
          <Input
            label="Business Name"
            placeholder="Enter the business name"
            value={formData.business_name}
            onChange={(e) => setFormData(prev => ({ ...prev, business_name: e.target.value }))}
            required
            disabled={loading}
          />
          <Input
            label="Business URL"
            placeholder="Enter the business website URL (e.g., https://example.com)"
            type="url"
            value={formData.business_url}
            onChange={(e) => setFormData(prev => ({ ...prev, business_url: e.target.value }))}
            required
            disabled={loading}
            pattern="https?://.*"
            title="Please enter a valid URL starting with http:// or https://"
          />
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Starting Analysis...
              </>
            ) : (
              'Start Analysis'
            )}
          </Button>
        </form>

        <div className="mt-6 text-sm text-gray-500">
          <p>Note: The analysis will run in the background. You'll be redirected to the dashboard where you can monitor its progress.</p>
        </div>
      </div>
    </div>
  );
}; 
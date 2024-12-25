import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Plus, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { apiRequest } from '../utils/api';
import { PitchInfo } from '../types';

interface PitchResponse {
  message: string;
  pitch: PitchInfo;
}

interface BusinessPitchesResponse {
  message: string;
  pitches: PitchInfo[];
}

export const BusinessPitch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productOrService, setProductOrService] = useState('');
  const [pitches, setPitches] = useState<PitchInfo[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showGenerateForm, setShowGenerateForm] = useState(false);
  const [loadingPitches, setLoadingPitches] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchPitches = async () => {
      if (!id) return;
      
      try {
        setLoadingPitches(true);
        const response = await apiRequest<BusinessPitchesResponse>(`/businesses/${id}/pitches`, {
          method: 'GET',
        });
        
        console.log('Fetched pitches:', response);
        
        if (mounted) {
          if (response.pitches && Array.isArray(response.pitches)) {
            setPitches(response.pitches);
          } else {
            console.warn('Unexpected response format:', response);
            setPitches([]);
          }
        }
      } catch (err) {
        console.error('Error fetching pitches:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch pitches');
        }
      } finally {
        if (mounted) {
          setLoadingPitches(false);
        }
      }
    };

    fetchPitches();

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !productOrService.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);
      
      const response = await apiRequest<PitchResponse>('/generate-pitch', {
        method: 'POST',
        body: JSON.stringify({
          business_id: id,
          product_or_service: productOrService.trim()
        }),
      });

      console.log('Generate pitch response:', response);

      if (response.pitch) {
        setPitches(prevPitches => [response.pitch, ...prevPitches]);
        setSuccessMessage(response.message);
        setProductOrService('');
        setShowGenerateForm(false);
      } else {
        console.error('Unexpected response structure:', response);
        setError('Failed to generate pitch. Please try again.');
      }
    } catch (err) {
      console.error('Error generating pitch:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate pitch');
    } finally {
      setLoading(false);
    }
  };

  const renderPitch = (pitch: PitchInfo, index: number) => {
    if (!pitch) {
      console.warn('Invalid pitch data:', pitch);
      return null;
    }

    return (
      <div key={index} className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Summary</h2>
          <p className="text-gray-600">{pitch.summary}</p>
        </div>

        {pitch.key_points && Object.keys(pitch.key_points).length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Key Points</h2>
            {Object.entries(pitch.key_points).map(([category, points]) => (
              <div key={category} className="mb-4">
                <h3 className="text-md font-medium text-gray-900 mb-2 capitalize">
                  {category.split('_').join(' ')}
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {points.map((point, i) => (
                    <li key={i} className="text-gray-600">{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {pitch.recommended_tone && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Recommended Tone</h2>
            <p className="text-gray-600">{pitch.recommended_tone}</p>
          </div>
        )}
      </div>
    );
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

      <div className="space-y-6">
        {/* Header with Generate Button */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Business Pitches</h1>
          <Button
            onClick={() => setShowGenerateForm(!showGenerateForm)}
            className="flex items-center gap-2"
          >
            {showGenerateForm ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide Form
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Generate New Pitch
              </>
            )}
          </Button>
        </div>

        {/* Generate Form */}
        {showGenerateForm && (
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate New Pitch</h2>

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

            <form onSubmit={handleSubmit} className="max-w-xl">
              <Input
                label="Product or Service"
                placeholder="Enter the product or service name"
                value={productOrService}
                onChange={(e) => setProductOrService(e.target.value)}
                required
                disabled={loading}
              />
              <Button
                type="submit"
                className="mt-4"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Pitch'
                )}
              </Button>
            </form>
          </div>
        )}

        {/* Pitches List */}
        <div className="space-y-6">
          {loadingPitches ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : pitches.length === 0 ? (
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Pitches Yet</h3>
              <p className="text-gray-500 mb-4">Generate your first pitch by clicking the button above.</p>
              <Button onClick={() => setShowGenerateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Generate First Pitch
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {pitches.map((pitch, index) => renderPitch(pitch, index))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
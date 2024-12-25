import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, ExternalLink, TrendingUp, Users, MessageSquare, Package, Wand2 } from 'lucide-react';
import { Button } from '../components/Button';
import { apiRequest } from '../utils/api';
import { BusinessDetailsResponse, BusinessDetailsData } from '../types';

export const BusinessDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BusinessDetailsData | null>(null);

  useEffect(() => {
    if (id) {
      fetchBusinessDetails(id);
    }
  }, [id]);

  const fetchBusinessDetails = async (businessId: string) => {
    try {
      setLoading(true);
      const response = await apiRequest<BusinessDetailsResponse>(`/businesses/${businessId}/details`, {
        method: 'GET',
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching business details:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch business details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error || !data) {
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
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error || 'Failed to load business details'}
        </div>
      </div>
    );
  }

  const { business, competitors, market_insights, customer_feedback, employee_feedback, products_and_services, pitches } = data;

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

      {/* Business Header */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{business.name}</h1>
            <a
              href={business.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              {business.url}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 text-right">
              <div>Created: {new Date(business.created_at).toLocaleDateString()}</div>
              <div>Updated: {new Date(business.updated_at).toLocaleDateString()}</div>
            </div>
            <Button
              onClick={() => navigate(`/business/${business.id}/pitch`)}
              className="ml-4"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Pitch
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Market Insights */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Market Insights</h2>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Industry Trends</h3>
              <p className="text-gray-600">{market_insights.industry_trends}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Growth Opportunities</h3>
              <p className="text-gray-600">{market_insights.growth_opportunities}</p>
            </div>
          </div>
        </div>

        {/* Competitors */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Competitors</h2>
          </div>
          <div className="space-y-4">
            {competitors.map((competitor, index) => (
              <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{competitor.name}</h3>
                  <span className="text-sm text-gray-500">{competitor.market_position}</span>
                </div>
                <a
                  href={competitor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-2"
                >
                  {competitor.url}
                  <ExternalLink className="w-4 h-4" />
                </a>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Strengths</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {competitor.details.strengths.map((strength, i) => (
                        <li key={i}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Weaknesses</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {competitor.details.weaknesses.map((weakness, i) => (
                        <li key={i}>{weakness}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Feedback</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Customer Feedback</h3>
              <div className="text-sm">
                <div className="mb-2">
                  Sentiment: <span className="font-medium">{customer_feedback.overall_sentiment}</span>
                </div>
                <pre className="bg-gray-50 p-3 rounded-lg overflow-auto">
                  {JSON.stringify(customer_feedback.feedback, null, 2)}
                </pre>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Employee Feedback</h3>
              <div className="text-sm">
                <div className="mb-2">
                  Sentiment: <span className="font-medium">{employee_feedback.overall_sentiment}</span>
                </div>
                <pre className="bg-gray-50 p-3 rounded-lg overflow-auto">
                  {JSON.stringify(employee_feedback.feedback, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Products and Services */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Products & Services</h2>
          </div>
          <div className="space-y-4">
            {products_and_services.map((product, index) => (
              <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.details.description}</p>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Key Features</h4>
                  <pre className="text-sm bg-gray-50 p-3 rounded-lg overflow-auto">
                    {JSON.stringify(product.details.key_features, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pitches */}
      {pitches && pitches.length > 0 && (
        <div className="mt-6 bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Generated Pitches</h2>
          <div className="space-y-6">
            {pitches.map((pitch, index) => (
              <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Summary</h3>
                  <p className="text-gray-600">{pitch.summary}</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Key Points</h3>
                  {Object.entries(pitch.key_points).map(([category, points]) => (
                    <div key={category} className="mb-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-1 capitalize">{category}</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Recommended Tone</h3>
                  <p className="text-gray-600">{pitch.recommended_tone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
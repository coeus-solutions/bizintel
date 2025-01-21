import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Loader2, ArrowLeft, ExternalLink, TrendingUp, Users, MessageSquare, Package, Wand2, RefreshCcw } from 'lucide-react';
import { Button } from '../components/Button';
import { apiRequest } from '../utils/api';
import { 
  BusinessDetailsResponse, 
  BusinessDetailsData, 
  AnalysisCompetitorsResponse,
  AnalysisMarketInsightsResponse, 
  AnalysisFeedbackResponse,
  ProductsServicesResponse,
  AnalysisCompetitorInfo,
  AnalysisMarketInsights,
  AnalysisFeedbackData,
  ProductService
} from '../types';

interface LocationState {
  businessId: string;
  businessName: string;
  businessUrl: string;
}

export const BusinessAnalysisView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const { businessId, businessName, businessUrl } = state || {};

  // Redirect if no business info
  useEffect(() => {
    if (!businessId || !businessName || !businessUrl) {
      navigate('/analyze');
    }
  }, [businessId, businessName, businessUrl, navigate]);

  const [businessData, setBusinessData] = useState<BusinessDetailsData | null>(null);
  const [loadingBusiness, setLoadingBusiness] = useState(true);
  const [businessError, setBusinessError] = useState<string | null>(null);

  // Section-specific states
  const [competitors, setCompetitors] = useState<AnalysisCompetitorInfo[] | null>(null);
  const [loadingCompetitors, setLoadingCompetitors] = useState(true);
  const [competitorsError, setCompetitorsError] = useState<string | null>(null);

  const [marketInsights, setMarketInsights] = useState<AnalysisMarketInsights | null>(null);
  const [loadingMarketInsights, setLoadingMarketInsights] = useState(true);
  const [marketInsightsError, setMarketInsightsError] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<{
    customer_feedback: AnalysisFeedbackData;
    employee_feedback: AnalysisFeedbackData;
  } | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(true);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const [productsServices, setProductsServices] = useState<ProductService[] | null>(null);
  const [loadingProductsServices, setLoadingProductsServices] = useState(true);
  const [productsServicesError, setProductsServicesError] = useState<string | null>(null);

  useEffect(() => {
    if (businessId) {
      fetchCompetitors(businessId);
      fetchMarketInsights(businessId);
      fetchFeedback(businessId);
      fetchProductsServices(businessId);
    }
  }, [businessId]);

  const fetchCompetitors = async (id: string) => {
    try {
      setLoadingCompetitors(true);
      const response = await apiRequest<AnalysisCompetitorsResponse>(`/businesses/${id}/competitors`, {
        method: 'GET',
      });
      if (response?.status === 'success' && Array.isArray(response.data)) {
        setCompetitors(response.data);
      } else {
        setCompetitorsError('We couldn\'t find any competitor information at the moment. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching competitors:', err);
      setCompetitorsError('We\'re having trouble analyzing the competitors. Please try again in a few moments.');
    } finally {
      setLoadingCompetitors(false);
    }
  };

  const fetchMarketInsights = async (id: string) => {
    try {
      setLoadingMarketInsights(true);
      const response = await apiRequest<AnalysisMarketInsightsResponse>(`/businesses/${id}/market-insights`, {
        method: 'GET',
      });
      if (response?.status === 'success' && response.data) {
        setMarketInsights(response.data);
      } else {
        setMarketInsightsError('We couldn\'t gather market insights at the moment. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching market insights:', err);
      setMarketInsightsError('We\'re having trouble analyzing the market insights. Please try again in a few moments.');
    } finally {
      setLoadingMarketInsights(false);
    }
  };

  const fetchFeedback = async (id: string) => {
    try {
      setLoadingFeedback(true);
      const response = await apiRequest<AnalysisFeedbackResponse>(`/businesses/${id}/feedback-analysis`, {
        method: 'GET',
      });
      if (response?.status === 'success' && response.data) {
        setFeedback(response.data);
      } else {
        setFeedbackError('We couldn\'t analyze the feedback at the moment. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setFeedbackError('We\'re having trouble processing the feedback analysis. Please try again in a few moments.');
    } finally {
      setLoadingFeedback(false);
    }
  };

  const fetchProductsServices = async (id: string) => {
    try {
      setLoadingProductsServices(true);
      const response = await apiRequest<ProductsServicesResponse>(`/businesses/${id}/products-and-services`, {
        method: 'GET',
      });
      if (response?.status === 'success' && Array.isArray(response.data)) {
        setProductsServices(response.data);
      } else {
        setProductsServicesError('We couldn\'t analyze the products and services at the moment. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching products and services:', err);
      setProductsServicesError('We\'re having trouble analyzing the products and services. Please try again in a few moments.');
    } finally {
      setLoadingProductsServices(false);
    }
  };

  const renderSectionLoader = () => (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
    </div>
  );

  const renderSectionError = (error: string | null, retryFunction: () => void) => (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-red-600 mb-4">{error || 'Failed to load data'}</div>
      <Button onClick={retryFunction} variant="outline" className="flex items-center gap-2">
        <RefreshCcw className="w-4 h-4" />
        Retry
      </Button>
    </div>
  );

  // Render competitors section
  const renderCompetitors = () => {
    if (!competitors || competitors.length === 0) {
      return <div className="text-gray-500">No competitors data available</div>;
    }

    return (
      <div className="space-y-4">
        {competitors.map((competitor, index) => (
          <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{competitor.name || 'Unnamed Competitor'}</h3>
              <span className="text-sm text-gray-500">{competitor.market_position || 'Unknown'}</span>
            </div>
            {competitor.url && (
              <a
                href={competitor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-2"
              >
                {competitor.url}
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Strengths</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {competitor.strengths?.map((strength: string, i: number) => (
                    <li key={i}>{strength}</li>
                  )) || <li>No strengths data available</li>}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">Weaknesses</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {competitor.weaknesses?.map((weakness: string, i: number) => (
                    <li key={i}>{weakness}</li>
                  )) || <li>No weaknesses data available</li>}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render market insights section
  const renderMarketInsights = () => {
    if (!marketInsights?.industry_trends || !marketInsights?.growth_opportunities) {
      return <div className="text-gray-500">No market insights data available</div>;
    }

    return (
      <div className="space-y-6">
        {/* Industry Trends */}
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Industry Trends</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {marketInsights.industry_trends.map((trend, i) => (
              <li key={i} className="text-sm">{trend}</li>
            ))}
          </ul>
        </div>

        {/* Growth Opportunities */}
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Growth Opportunities</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {marketInsights.growth_opportunities.map((opportunity, i) => (
              <li key={i} className="text-sm">{opportunity}</li>
            ))}
          </ul>
        </div>

        {/* Market Segments */}
        {marketInsights.market_segments && marketInsights.market_segments.length > 0 && (
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Market Segments</h3>
            <div className="space-y-4">
              {marketInsights.market_segments.map((segment, i) => (
                <div key={i} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                  <h4 className="font-medium text-gray-900 mb-1">{segment.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{segment.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Market Size:</span>{' '}
                      <span className="text-gray-600">{segment.size}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Growth Potential:</span>{' '}
                      <span className="text-gray-600">{segment.growth_potential}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderFeedbackSection = (title: string, feedbackData: AnalysisFeedbackData) => {
    const sentimentColors = {
      positive: 'text-green-600',
      negative: 'text-red-600',
      neutral: 'text-gray-600'
    };

    return (
      <div>
        <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
        <div className="text-sm space-y-4">
          <div className="mb-2">
            Overall Sentiment:{' '}
            <span className={sentimentColors[feedbackData.overall_sentiment as keyof typeof sentimentColors]}>
              {feedbackData.overall_sentiment}
            </span>
          </div>
          
          {/* Positive Feedback */}
          <div>
            <h4 className="font-medium text-green-600 mb-2">Positive Feedback</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {feedbackData.feedback_data.positive.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Negative Feedback */}
          <div>
            <h4 className="font-medium text-red-600 mb-2">Negative Feedback</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {feedbackData.feedback_data.negative.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Neutral Feedback */}
          <div>
            <h4 className="font-medium text-gray-600 mb-2">Neutral Feedback</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {feedbackData.feedback_data.neutral.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // Render feedback section
  const renderFeedback = () => {
    if (!feedback?.customer_feedback || !feedback?.employee_feedback) {
      return <div className="text-gray-500">No feedback data available</div>;
    }

    return (
      <div className="space-y-6">
        {renderFeedbackSection('Customer Feedback', feedback.customer_feedback)}
        {renderFeedbackSection('Employee Feedback', feedback.employee_feedback)}
      </div>
    );
  };

  // Render products and services section
  const renderProductsServices = () => {
    if (!productsServices || productsServices.length === 0) {
      return <div className="text-gray-500">No products and services data available</div>;
    }

    return (
      <div className="space-y-4">
        {productsServices.map((product, index) => (
          <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
            <h3 className="font-medium text-gray-900 mb-2">{product.name || 'Unnamed Product'}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Key Features</h4>
              <div className="space-y-2">
                {Object.entries(product.key_features).map(([key, value], i) => (
                  <div key={i} className="text-sm">
                    <span className="font-medium text-gray-900">{key}:</span>{' '}
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const isAllDataLoaded = () => {
    return !loadingCompetitors && 
           !loadingMarketInsights && 
           !loadingFeedback && 
           !loadingProductsServices;
  };

  if (!businessId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          No business information provided. Please start a new analysis.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="outline"
        onClick={() => navigate('/analyze')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* Business Header */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{businessName || 'Business Analysis'}</h1>
            {businessUrl && (
              <a
                href={businessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                {businessUrl}
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              {!isAllDataLoaded() ? 'Analysis in progress...' : 'Analysis completed'}
            </div>
            <Button
              onClick={() => navigate(`/business/${businessId}/pitch`, {
                state: {
                  businessName: businessName,
                  products: productsServices || []
                }
              })}
              disabled={!isAllDataLoaded()}
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
          {loadingMarketInsights ? renderSectionLoader() : 
           marketInsightsError ? renderSectionError(marketInsightsError, () => fetchMarketInsights(businessId)) :
           renderMarketInsights()}
        </div>

        {/* Competitors */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Competitors</h2>
          </div>
          {loadingCompetitors ? renderSectionLoader() :
           competitorsError ? renderSectionError(competitorsError, () => fetchCompetitors(businessId)) :
           renderCompetitors()}
        </div>

        {/* Feedback */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Feedback</h2>
          </div>
          {loadingFeedback ? renderSectionLoader() :
           feedbackError ? renderSectionError(feedbackError, () => fetchFeedback(businessId)) :
           renderFeedback()}
        </div>

        {/* Products and Services */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Products & Services</h2>
          </div>
          {loadingProductsServices ? renderSectionLoader() :
           productsServicesError ? renderSectionError(productsServicesError, () => fetchProductsServices(businessId)) :
           renderProductsServices()}
        </div>
      </div>
    </div>
  );
}; 
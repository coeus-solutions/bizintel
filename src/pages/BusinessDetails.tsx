import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Loader2, ArrowLeft, ExternalLink, TrendingUp, Users, MessageSquare, Package, Wand2, RefreshCcw } from 'lucide-react';
import { Button } from '../components/Button';
import { apiRequest } from '../utils/api';
import { 
  BusinessDetailsResponse, 
  BusinessDetailsData, 
  CompetitorInfo,
  MarketInsights,
  ProductService
} from '../types';

interface FeedbackData {
  feedback: {
    positive: string[];
    negative: string[];
    neutral: string[];
  };
  overall_sentiment: string;
}

interface FeedbackAnalysisData {
  customer_feedback: FeedbackData;
  employee_feedback: FeedbackData;
}

interface CompetitorsResponse {
  status: string;
  message?: string;
  data: CompetitorInfo[];
}

interface MarketInsightsResponse {
  status: string;
  message?: string;
  data: MarketInsights;
}

interface FeedbackAnalysisResponse {
  status: string;
  message?: string;
  data: FeedbackAnalysisData;
}

interface ProductsServicesResponse {
  status: string;
  message?: string;
  data: ProductService[];
}

interface LocationState {
  fromAnalysis?: boolean;
  message?: string;
}

export const BusinessDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const isFromAnalysis = state?.fromAnalysis;

  const [businessData, setBusinessData] = useState<BusinessDetailsData | null>(null);
  const [loadingBusiness, setLoadingBusiness] = useState(true);
  const [businessError, setBusinessError] = useState<string | null>(null);

  // Section-specific states
  const [competitors, setCompetitors] = useState<CompetitorInfo[] | null>(null);
  const [loadingCompetitors, setLoadingCompetitors] = useState(isFromAnalysis);
  const [competitorsError, setCompetitorsError] = useState<string | null>(null);

  const [marketInsights, setMarketInsights] = useState<MarketInsights | null>(null);
  const [loadingMarketInsights, setLoadingMarketInsights] = useState(isFromAnalysis);
  const [marketInsightsError, setMarketInsightsError] = useState<string | null>(null);

  const [feedback, setFeedback] = useState<FeedbackAnalysisData | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(isFromAnalysis);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const [productsServices, setProductsServices] = useState<ProductService[] | null>(null);
  const [loadingProductsServices, setLoadingProductsServices] = useState(isFromAnalysis);
  const [productsServicesError, setProductsServicesError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      if (isFromAnalysis) {
        // If coming from analysis, fetch each section individually
        fetchBusinessDetails(id);
        fetchCompetitors(id);
        fetchMarketInsights(id);
        fetchFeedback(id);
        fetchProductsServices(id);
      } else {
        // If coming from listing, fetch all data at once
        fetchCombinedDetails(id);
      }
    }
  }, [id, isFromAnalysis]);

  const fetchCombinedDetails = async (businessId: string) => {
    try {
      setLoadingBusiness(true);
      const response = await apiRequest<BusinessDetailsResponse>(`/businesses/${businessId}/details`, {
        method: 'GET',
      });
      
      // Set all data at once
      setBusinessData(response.data);
      if (response.data) {
        setCompetitors(response.data.competitors);
        setMarketInsights(response.data.market_insights);
        setFeedback({
          customer_feedback: response.data.customer_feedback,
          employee_feedback: response.data.employee_feedback
        });
        setProductsServices(response.data.products_and_services);
      }
      
      setBusinessError(null);
    } catch (err) {
      console.error('Error fetching business details:', err);
      setBusinessError(err instanceof Error ? err.message : 'Failed to fetch business details');
    } finally {
      setLoadingBusiness(false);
    }
  };

  const fetchBusinessDetails = async (businessId: string) => {
    try {
      setLoadingBusiness(true);
      const response = await apiRequest<BusinessDetailsResponse>(`/businesses/${businessId}/details`, {
        method: 'GET',
      });
      setBusinessData(response.data);
      setBusinessError(null);
    } catch (err) {
      console.error('Error fetching business details:', err);
      setBusinessError(err instanceof Error ? err.message : 'Failed to fetch business details');
    } finally {
      setLoadingBusiness(false);
    }
  };

  const fetchCompetitors = async (businessId: string) => {
    try {
      setLoadingCompetitors(true);
      const response = await apiRequest<CompetitorsResponse>(`/businesses/${businessId}/competitors`, {
        method: 'GET',
      });
      setCompetitors(response.data);
      setCompetitorsError(null);
    } catch (err) {
      console.error('Error fetching competitors:', err);
      setCompetitorsError(err instanceof Error ? err.message : 'Failed to fetch competitors');
    } finally {
      setLoadingCompetitors(false);
    }
  };

  const fetchMarketInsights = async (businessId: string) => {
    try {
      setLoadingMarketInsights(true);
      const response = await apiRequest<MarketInsightsResponse>(`/businesses/${businessId}/market-insights`, {
        method: 'GET',
      });
      setMarketInsights(response.data);
      setMarketInsightsError(null);
    } catch (err) {
      console.error('Error fetching market insights:', err);
      setMarketInsightsError(err instanceof Error ? err.message : 'Failed to fetch market insights');
    } finally {
      setLoadingMarketInsights(false);
    }
  };

  const fetchFeedback = async (businessId: string) => {
    try {
      setLoadingFeedback(true);
      const response = await apiRequest<FeedbackAnalysisResponse>(`/businesses/${businessId}/feedback-analysis`, {
        method: 'GET',
      });
      if (response?.data) {
        setFeedback(response.data);
      } else {
        setFeedbackError('Invalid feedback data received');
      }
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setFeedbackError(err instanceof Error ? err.message : 'Failed to fetch feedback');
    } finally {
      setLoadingFeedback(false);
    }
  };

  const fetchProductsServices = async (businessId: string) => {
    try {
      setLoadingProductsServices(true);
      const response = await apiRequest<ProductsServicesResponse>(`/businesses/${businessId}/products-and-services`, {
        method: 'GET',
      });
      setProductsServices(response.data);
      setProductsServicesError(null);
    } catch (err) {
      console.error('Error fetching products and services:', err);
      setProductsServicesError(err instanceof Error ? err.message : 'Failed to fetch products and services');
    } finally {
      setLoadingProductsServices(false);
    }
  };

  if (loadingBusiness) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (businessError || !businessData) {
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
          {businessError || 'Failed to load business details'}
        </div>
      </div>
    );
  }

  const { business } = businessData;

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

  const renderMarketInsights = () => {
    if (!marketInsights?.industry_trends || !marketInsights?.growth_opportunities) {
      return <div className="text-gray-500">No market insights data available</div>;
    }

    return (
      <div className="space-y-6">
        {/* Industry Trends */}
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Industry Trends</h3>
          <p className="text-gray-600">{marketInsights.industry_trends}</p>
        </div>

        {/* Growth Opportunities */}
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Growth Opportunities</h3>
          <p className="text-gray-600">{marketInsights.growth_opportunities}</p>
        </div>

        {/* Market Segments */}
        {marketInsights.segmentation && Object.keys(marketInsights.segmentation).length > 0 && (
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Market Segments</h3>
            <div className="space-y-4">
              {Object.values(marketInsights.segmentation).map((segment, i) => (
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

  const renderFeedbackSection = (title: string, feedbackData: FeedbackData) => {
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
              {feedbackData.feedback.positive.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Negative Feedback */}
          <div>
            <h4 className="font-medium text-red-600 mb-2">Negative Feedback</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {feedbackData.feedback.negative.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Neutral Feedback */}
          <div>
            <h4 className="font-medium text-gray-600 mb-2">Neutral Feedback</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {feedbackData.feedback.neutral.map((item: string, i: number) => (
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

  const renderProductsServices = () => {
    if (!productsServices || productsServices.length === 0) {
      return <div className="text-gray-500">No products and services data available</div>;
    }

    return (
      <div className="space-y-4">
        {productsServices.map((product, index) => (
          <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
            <h3 className="font-medium text-gray-900 mb-2">{product.name || 'Unnamed Product'}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.details.description}</p>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Key Features</h4>
              <div className="space-y-2">
                {Object.entries(product.details.key_features).map(([key, value], i) => (
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
          {loadingMarketInsights ? renderSectionLoader() : 
           marketInsightsError ? renderSectionError(marketInsightsError, () => fetchMarketInsights(id!)) :
           marketInsights && (
            <div className="space-y-4">
              {renderMarketInsights()}
            </div>
          )}
        </div>

        {/* Competitors */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Competitors</h2>
          </div>
          {loadingCompetitors ? renderSectionLoader() :
           competitorsError ? renderSectionError(competitorsError, () => fetchCompetitors(id!)) :
           competitors && (
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
                        {competitor.details.strengths.map((strength: string, i: number) => (
                          <li key={i}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Weaknesses</h4>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {competitor.details.weaknesses.map((weakness: string, i: number) => (
                          <li key={i}>{weakness}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feedback */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Feedback</h2>
          </div>
          {loadingFeedback ? renderSectionLoader() :
           feedbackError ? renderSectionError(feedbackError, () => fetchFeedback(id!)) :
           feedback && (
            <div className="space-y-6">
              {renderFeedback()}
            </div>
          )}
        </div>

        {/* Products and Services */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Products & Services</h2>
          </div>
          {loadingProductsServices ? renderSectionLoader() :
           productsServicesError ? renderSectionError(productsServicesError, () => fetchProductsServices(id!)) :
           productsServices && (
            <div className="space-y-4">
              {renderProductsServices()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
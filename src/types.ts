export interface CompetitorInfo {
  name: string;
  url: string;
  market_position: string;
  details: {
    strengths: string[];
    weaknesses: string[];
  };
}

export interface AnalysisCompetitorInfo {
  name: string;
  url: string;
  market_position: string;
  strengths: string[];
  weaknesses: string[];
}

export interface AnalysisCompetitorsResponse {
  status: string;
  message?: string;
  data: AnalysisCompetitorInfo[];
}

export interface CompetitorsResponse {
  status: string;
  message?: string;
  data: CompetitorInfo[];
}

export interface MarketSegment {
  name: string;
  description: string;
  size: string;
  growth_potential: string;
}

export interface AnalysisMarketInsights {
  industry_trends: string[];
  growth_opportunities: string[];
  market_segments: MarketSegment[];
}

export interface MarketInsights {
  industry_trends: string;
  growth_opportunities: string;
  segmentation: Record<string, MarketSegment>;
}

export interface MarketInsightsResponse {
  status: string;
  message?: string;
  data: MarketInsights;
}

export interface FeedbackData {
  overall_sentiment: string;
  feedback: {
    positive: string[];
    negative: string[];
    neutral: string[];
  };
}

export interface AnalysisFeedbackData {
  feedback_data: {
    positive: string[];
    negative: string[];
    neutral: string[];
  };
  overall_sentiment: string;
}

export interface AnalysisFeedbackResponse {
  status: string;
  message?: string;
  data: {
    customer_feedback: AnalysisFeedbackData;
    employee_feedback: AnalysisFeedbackData;
  };
}

export interface ProductService {
  name: string;
  details: {
    description: string;
    key_features: Record<string, string>;
  };
}

export interface ProductsServicesResponse {
  status: string;
  message?: string;
  data: ProductService[];
}

export interface BusinessDetailsData {
  business: {
    id: string;
    name: string;
    url: string;
    created_at: string;
    updated_at: string;
  };
  competitors: CompetitorInfo[];
  market_insights: MarketInsights;
  customer_feedback: {
    feedback: {
      positive: string[];
      negative: string[];
      neutral: string[];
    };
    overall_sentiment: string;
  };
  employee_feedback: {
    feedback: {
      positive: string[];
      negative: string[];
      neutral: string[];
    };
    overall_sentiment: string;
  };
  products_and_services: ProductService[];
}

export interface BusinessDetailsResponse {
  status: string;
  message?: string;
  data: BusinessDetailsData;
}

export interface AnalysisMarketSegment {
  name: string;
  description: string;
  size: string;
  growth_potential: string;
}

export interface AnalysisMarketInsightsResponse {
  status: string;
  message?: string;
  data: AnalysisMarketInsights;
} 
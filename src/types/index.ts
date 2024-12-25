export interface User {
  id: string;
  email: string;
}

export interface Business {
  id: string;
  name: string;
  url: string;
  status: 'analyzing' | 'completed' | 'error';
  created_at: string;
  updated_at: string;
}

export interface BusinessSummary {
  id: string;
  name: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessDetailsData {
  business: BusinessSummary;
  competitors: CompetitorInfo[];
  market_insights: MarketInsights;
  customer_feedback: FeedbackInfo;
  employee_feedback: FeedbackInfo;
  products_and_services: ProductService[];
  pitches: PitchInfo[];
}

export interface BusinessDetailsResponse {
  status: string;
  data: BusinessDetailsData;
}

export interface BusinessInsights {
  competitors: CompetitorInfo[];
  market_insights: MarketInsights;
  customer_feedback: FeedbackInfo;
  employee_feedback: FeedbackInfo;
  products_and_services: ProductService[];
  pitch?: PitchInfo | null;
}

export interface CompetitorInfo {
  name: string;
  url: string;
  market_position: string;
  details: {
    strengths: string[];
    weaknesses: string[];
  };
}

export interface MarketInsights {
  industry_trends: string;
  growth_opportunities: string;
  segmentation: Record<string, MarketSegment>;
}

export interface MarketSegment {
  name: string;
  description: string;
  size?: string;
  growth_potential?: string;
}

export interface FeedbackInfo {
  feedback: Record<string, any>;
  overall_sentiment: string;
}

export interface ProductService {
  name: string;
  details: {
    description: string;
    key_features: Record<string, any>;
  };
}

export interface PitchInfo {
  summary: string;
  key_points: Record<string, string[]>;
  recommended_tone: string;
}
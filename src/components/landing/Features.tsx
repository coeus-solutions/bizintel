import React from 'react';
import { 
  BarChart2, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Target,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: <BarChart2 className="w-8 h-8 text-blue-600" />,
    title: "Competitor Analysis",
    description: "Get detailed insights about your competitors' strategies, strengths, and weaknesses through AI-powered analysis."
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
    title: "Market Insights",
    description: "Stay ahead with real-time market trends and industry analysis tailored to your business sector."
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
    title: "Customer Feedback Analysis",
    description: "Understand customer sentiment and employee feedback through advanced AI summarization."
  },
  {
    icon: <Target className="w-8 h-8 text-blue-600" />,
    title: "Product Intelligence",
    description: "Identify and analyze products and services in your market for competitive positioning."
  },
  {
    icon: <Zap className="w-8 h-8 text-blue-600" />,
    title: "AI-Powered Pitches",
    description: "Generate tailored, contextually relevant pitches for your products and services using GPT-4."
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: "Actionable Insights",
    description: "Convert complex data into clear, actionable insights for informed decision-making."
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive Business Intelligence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform provides everything you need to understand your market and make informed decisions.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
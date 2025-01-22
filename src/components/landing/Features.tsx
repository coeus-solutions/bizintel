import React from 'react';
import { 
  LineChart, 
  Users2, 
  Sparkles, 
  MessageCircle, 
  Boxes,
  Lightbulb,
  Target,
  Map,
  Download,
  BarChart,
  TrendingUp,
  Zap,
  Wand2
} from 'lucide-react';

const features = [
  {
    icon: <LineChart className="w-7 h-7 stroke-[1.5]" />,
    title: "Competitor Analysis",
    description: "Instantly analyze your competitors' strengths, weaknesses, and market positioning. Get actionable insights to stay ahead of the competition.",
    gradient: "from-emerald-400 to-teal-500",
    shadowColor: "shadow-emerald-500/20",
    features: [
      "Competitor identification",
      "SWOT analysis",
      "Market positioning",
      "Strategy comparison"
    ]
  },
  {
    icon: <Target className="w-7 h-7 stroke-[1.5]" />,
    title: "Market Insights",
    description: "Uncover market trends, growth opportunities, and industry dynamics with our AI-powered analysis engine.",
    gradient: "from-blue-400 to-indigo-500",
    shadowColor: "shadow-blue-500/20",
    features: [
      "Industry trends",
      "Growth opportunities",
      "Market segments",
      "Consumer behavior"
    ]
  },
  {
    icon: <MessageCircle className="w-7 h-7 stroke-[1.5]" />,
    title: "Feedback Analysis",
    description: "Analyze customer and employee feedback to identify patterns, sentiment, and areas for improvement.",
    gradient: "from-violet-400 to-purple-500",
    shadowColor: "shadow-violet-500/20",
    features: [
      "Sentiment analysis",
      "Feedback categorization",
      "Trend identification",
      "Action recommendations"
    ]
  },
  {
    icon: <Boxes className="w-7 h-7 stroke-[1.5]" />,
    title: "Product Intelligence",
    description: "Get deep insights into your products and services, including market fit, competitive positioning, and optimization opportunities.",
    gradient: "from-orange-400 to-pink-500",
    shadowColor: "shadow-orange-500/20",
    features: [
      "Product analysis",
      "Market fit assessment",
      "Feature comparison",
      "Optimization suggestions"
    ]
  },
  {
    icon: <Wand2 className="w-7 h-7 stroke-[1.5]" />,
    title: "AI-Powered Pitches",
    description: "Generate compelling sales pitches tailored to your products and target audience in seconds.",
    gradient: "from-amber-400 to-orange-500",
    shadowColor: "shadow-amber-500/20",
    features: [
      "Customized messaging",
      "Value propositions",
      "Target audience focus",
      "PDF export"
    ]
  },
  {
    icon: <Map className="w-7 h-7 stroke-[1.5]" />,
    title: "Growth Roadmap",
    description: "Get a detailed roadmap for your business growth with actionable milestones and strategic recommendations.",
    gradient: "from-rose-400 to-red-500",
    shadowColor: "shadow-rose-500/20",
    features: [
      "Strategic planning",
      "Milestone tracking",
      "Resource planning",
      "Success metrics"
    ]
  }
];

export const Features = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-blue-50 to-white opacity-70" />
        <div className="absolute inset-y-0 right-0 w-[800px] bg-gradient-to-l from-blue-50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center rounded-full bg-blue-500/10 px-6 py-2 text-blue-600 ring-1 ring-blue-500/20 mb-8">
            <Zap className="mr-2 h-4 w-4" />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Everything You Need for Business Intelligence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform provides comprehensive analysis and insights to help you make data-driven decisions and stay ahead of the competition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative"
            >
              {/* Floating effect shadow */}
              <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 
                           blur-xl transition duration-700 group-hover:opacity-50 ${feature.shadowColor}`} />
              
              {/* Card content */}
              <div className="relative bg-white rounded-2xl p-8 shadow-xl transition duration-700
                           border border-gray-100 backdrop-blur-sm
                           hover:shadow-2xl hover:-translate-y-1">
                <div className={`mb-6 w-14 h-14 rounded-xl flex items-center justify-center
                             bg-gradient-to-r ${feature.gradient} text-white
                             shadow-lg transform transition duration-700
                             group-hover:scale-110 group-hover:rotate-3`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 bg-gradient-to-r ${feature.gradient}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
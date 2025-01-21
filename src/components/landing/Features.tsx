import React from 'react';
import { 
  LineChart, 
  Users2, 
  Sparkles, 
  MessageCircle, 
  Boxes,
  Lightbulb
} from 'lucide-react';

const features = [
  {
    icon: <LineChart className="w-7 h-7 stroke-[1.5]" />,
    title: "Competitor Analysis",
    description: "Get detailed insights about your competitors' strategies, strengths, and weaknesses through AI-powered analysis.",
    gradient: "from-emerald-400 to-teal-500",
    shadowColor: "shadow-emerald-500/20"
  },
  {
    icon: <Sparkles className="w-7 h-7 stroke-[1.5]" />,
    title: "Market Insights",
    description: "Stay ahead with real-time market trends and industry analysis tailored to your business sector.",
    gradient: "from-indigo-400 to-blue-600",
    shadowColor: "shadow-indigo-500/20"
  },
  {
    icon: <MessageCircle className="w-7 h-7 stroke-[1.5]" />,
    title: "Customer Feedback Analysis",
    description: "Understand customer sentiment and employee feedback through advanced AI summarization.",
    gradient: "from-blue-400 to-violet-600",
    shadowColor: "shadow-blue-500/20"
  },
  {
    icon: <Boxes className="w-7 h-7 stroke-[1.5]" />,
    title: "Product Intelligence",
    description: "Identify and analyze products and services in your market for competitive positioning.",
    gradient: "from-violet-400 to-purple-600",
    shadowColor: "shadow-violet-500/20"
  },
  {
    icon: <Lightbulb className="w-7 h-7 stroke-[1.5]" />,
    title: "AI-Powered Pitches",
    description: "Generate tailored, contextually relevant pitches for your products and services instantly.",
    gradient: "from-amber-400 to-orange-600",
    shadowColor: "shadow-amber-500/20"
  },
  {
    icon: <Users2 className="w-7 h-7 stroke-[1.5]" />,
    title: "Actionable Insights",
    description: "Convert complex data into clear, actionable insights for informed decision-making.",
    gradient: "from-rose-400 to-pink-600",
    shadowColor: "shadow-rose-500/20"
  }
];

export const Features = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-white" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Comprehensive Business Intelligence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform provides everything you need to understand your market and make informed decisions.
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
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
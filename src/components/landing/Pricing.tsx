import React from 'react';
import { Check, Sparkles, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';

const plans = [
  {
    name: "Hobby",
    description: "Perfect for small businesses getting started",
    price: "Free",
    billing: "forever",
    highlight: false,
    features: [
      "3 business analyses per month",
      "Basic market insights",
      "Competitor overview",
      "Simple sales pitch generation",
      "Community forum access"
    ],
    cta: "Get Started Free",
    gradient: "from-gray-600 to-gray-700",
    popular: false
  },
  {
    name: "Professional",
    description: "For businesses ready to scale",
    price: "$29",
    billing: "per month",
    highlight: true,
    features: [
      "25 business analyses per month",
      "Advanced market analytics",
      "Detailed competitor tracking",
      "AI-powered pitch generation",
      "Growth roadmap creation",
      "Priority support",
      "PDF & API access"
    ],
    cta: "Start Pro Trial",
    gradient: "from-blue-500 to-indigo-600",
    popular: true
  },
  {
    name: "Enterprise",
    description: "For large organizations and teams",
    price: "Custom",
    billing: "tailored plan",
    highlight: false,
    features: [
      "Unlimited analyses",
      "Custom market metrics",
      "Real-time competitor tracking",
      "White-labeled reports",
      "Advanced AI customization",
      "Dedicated success manager",
      "Team collaboration tools"
    ],
    cta: "Contact Sales",
    gradient: "from-purple-500 to-purple-600",
    popular: false
  }
];

export const Pricing = () => {
  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 py-24 relative overflow-hidden" id="pricing">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 via-gray-800/95 to-gray-900" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-blue-500/10 px-6 py-2 text-blue-400 ring-1 ring-blue-500/30 mb-8">
            <Star className="mr-2 h-4 w-4" />
            <span>Simple Pricing</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Free, Scale as You Grow
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your business. Start with our free tier and upgrade as your needs grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="relative group">
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <div className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2 text-sm font-medium text-white shadow-xl shadow-orange-500/20">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`relative rounded-2xl bg-gray-800 p-8 transition-all duration-300 
                ${plan.popular ? 'ring-2 ring-amber-500 scale-105 shadow-xl shadow-amber-500/20' : 'ring-1 ring-white/10'} 
                hover:shadow-xl hover:-translate-y-1 hover:bg-gray-800/90`}>
                
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-x-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.billing}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} 
                        flex items-center justify-center shadow-lg`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="text-center">
                  <Link to="/register" className="block">
                    <Button 
                      className={`w-full justify-center py-3 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-500/20'
                          : 'bg-gray-700 text-white ring-1 ring-white/20 hover:bg-gray-600'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-400">
            All plans include core features. Need a custom solution?{' '}
            <a href="mailto:sales@bizintel.ai" className="text-blue-400 hover:text-blue-300 font-medium">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}; 
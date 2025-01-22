import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: "Starter",
    description: "Perfect for small businesses just getting started",
    price: "$10",
    period: "month",
    features: [
      "5 business analyses per month",
      "Basic competitor insights",
      "Market trends overview",
      "Basic AI-powered analysis",
      "Sales pitch generation",
      "PDF export capability",
      "Email support"
    ],
    cta: "Start Free Trial",
    highlight: false
  },
  {
    name: "Professional",
    description: "For growing businesses needing deeper insights",
    price: "$49",
    period: "month",
    features: [
      "25 business analyses per month",
      "Advanced competitor tracking",
      "Detailed market insights",
      "Growth roadmap generation",
      "Custom pitch templates",
      "Priority email support",
      "API access (100 calls/day)",
      "Team collaboration (up to 5)"
    ],
    cta: "Get Started",
    highlight: true
  },
  {
    name: "Enterprise",
    description: "For large organizations requiring custom solutions",
    price: "Custom",
    period: "pricing",
    features: [
      "Unlimited business analyses",
      "Real-time competitor monitoring",
      "Advanced market intelligence",
      "Custom AI model training",
      "White-label reports",
      "24/7 dedicated support",
      "Full API access",
      "Custom integrations",
      "Team collaboration (unlimited)"
    ],
    cta: "Contact Sales",
    highlight: false
  }
];

export const Pricing = () => {
  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-blue-50 to-white" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-[0.15]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full bg-blue-500/10 px-6 py-2 text-blue-600 ring-1 ring-blue-500/20 mb-8">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Simple Pricing</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Get started with our AI-powered business intelligence platform. Scale as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl ${
                plan.highlight
                  ? 'bg-gradient-to-b from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30 border-0 lg:scale-110 lg:-translate-y-4'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <div className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1 text-sm font-medium text-white shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                <h3 className={`text-2xl font-semibold ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`mt-2 ${plan.highlight ? 'text-blue-100' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
                <div className="mt-6 flex items-baseline">
                  <span className={`text-5xl font-bold tracking-tight ${plan.highlight ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`ml-2 text-lg ${plan.highlight ? 'text-blue-100' : 'text-gray-500'}`}>
                    /{plan.period}
                  </span>
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={`h-5 w-5 shrink-0 ${plan.highlight ? 'text-blue-200' : 'text-emerald-500'}`} />
                      <span className={`ml-3 ${plan.highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 pt-0">
                <Link to="/register" className="w-full">
                  <Button 
                    className={`w-full justify-center ${
                      plan.highlight
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 
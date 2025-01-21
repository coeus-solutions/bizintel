import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

export const Pricing = () => {
  return (
    <div className="bg-black py-24 relative">
      {/* Gradient overlay for top */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center relative">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Choose the plan that best fits your business needs
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {/* Starter Plan */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-white">Starter</h3>
              <p className="mt-2 text-gray-400">Perfect for small businesses just getting started</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-white">$10</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">5 business analyses per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">Basic competitor insights</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">Market trends overview</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">Basic AI-powered analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">Email support</span>
                </li>
              </ul>
            </div>
            <div className="px-6 pb-8">
              <Link to="/register" className="w-full">
                <Button className="w-full bg-emerald-500 text-white hover:bg-emerald-600">Start Free Trial</Button>
              </Link>
            </div>
          </div>

          {/* Professional Plan */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border-2 border-indigo-500/50 hover:border-indigo-500 transition-colors relative">
            <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
              Popular
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-white">Professional</h3>
              <p className="mt-2 text-gray-400">Ideal for growing businesses needing deeper insights</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-white">$49</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">20 business analyses per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">Advanced competitor tracking</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">Detailed market segmentation</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">Enhanced AI analysis & insights</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">Priority email & chat support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">Custom report generation</span>
                </li>
              </ul>
            </div>
            <div className="px-6 pb-8">
              <Link to="/register" className="w-full">
                <Button className="w-full bg-indigo-500 text-white hover:bg-indigo-600">Get Started</Button>
              </Link>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-white">Enterprise</h3>
              <p className="mt-2 text-gray-400">For large organizations requiring custom solutions</p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-white">Custom</span>
                <span className="text-gray-400"> pricing</span>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">Unlimited business analyses</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">Real-time competitor monitoring</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">Advanced market intelligence</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">Custom AI model training</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">24/7 dedicated support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <span className="ml-3 text-gray-300">Custom integrations</span>
                </li>
              </ul>
            </div>
            <div className="px-6 pb-8">
              <Link to="/register" className="w-full">
                <Button className="w-full bg-gray-600 text-white hover:bg-gray-700">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay for bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </div>
  );
}; 
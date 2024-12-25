import React from 'react';
import { ArrowRight, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';

export const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Business Intelligence
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Leverage AI-powered insights to understand your competitors, market trends, and customer feedback. Make data-driven decisions with confidence.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button className="text-lg px-8 py-3">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="text-lg px-8 py-3">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
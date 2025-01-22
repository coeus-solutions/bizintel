import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-5">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90">
              <BarChart2 className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold text-white">BizIntel</span>
            </Link>
            <p className="text-gray-400">
              Transform your business intelligence with AI-powered insights and analysis. Make data-driven decisions with our comprehensive market research, competitor analysis, and strategic recommendations tailored to your business needs.
            </p>
          </div>

          {/* Product */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="md:col-span-3">
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <address className="text-gray-400 not-italic space-y-1">
              <p>1606 Headway Cir</p>
              <p>STE 9810</p>
              <p>Austin, TX 78754</p>
              <p>United States</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} BizIntel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
import React from 'react';
import { ArrowRight, BarChart2, Search, Sparkles, Target, Wand2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';

export const Hero = () => {
  const scrollToFeatures = () => {
    const element = document.getElementById('features-showcase');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 py-20 sm:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        <div className="absolute -top-48 left-1/2 -translate-x-1/2">
          <div className="h-96 w-96 rounded-full bg-blue-500 opacity-20 blur-3xl" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Content */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <div className="inline-flex items-center rounded-full bg-blue-500/10 px-6 py-2 text-blue-300 ring-1 ring-blue-500/20 mb-8">
              <Sparkles className="mr-2 h-4 w-4" />
              <span>AI-Powered Business Intelligence</span>
            </div>
            
            <h1 className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Transform Your Business with Data-Driven Insights
            </h1>
            
            <p className="text-lg text-blue-100 mb-8">
              Enter your business URL and let our AI analyze your market, competitors, and opportunities. Get instant insights, sales pitches, and growth roadmaps.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 lg:justify-start justify-center">
              <Link to="/register" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto text-lg px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white">
                  Start Free Analysis <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-3 text-white border-white/20 hover:bg-white/10 hover:border-white/30">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Preview GIF */}
          <div className="lg:col-span-2 relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-10 blur-2xl transition-all duration-500 group-hover:opacity-20" />
            <div className="relative transform transition-transform duration-500 hover:scale-[1.02] -mt-6">
              {/* Laptop Frame */}
              <div className="relative mx-auto w-full max-w-[720px] perspective">
                {/* Laptop Body */}
                <div className="relative">
                  {/* Screen Bezel */}
                  <div className="relative rounded-t-2xl bg-gray-800 p-2 shadow-xl">
                    {/* Camera */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-700 ring-1 ring-gray-600"></div>
                    {/* Screen Content */}
                    <div className="relative rounded-lg overflow-hidden shadow-2xl bg-gray-900 ring-1 ring-white/10">
                      <img 
                        src="/screenshots/competitors-n-insights_modified.png"
                        alt="BizIntel Dashboard"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/20 to-transparent" />
                    </div>
                  </div>
                  {/* Laptop Base with Keyboard */}
                  <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 h-[2px] w-[120%] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                    <div className="h-16 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-2xl shadow-xl relative">
                      {/* Keyboard Detail */}
                      <div className="absolute inset-x-8 top-2 bottom-4 rounded-lg bg-gray-800">
                        {/* Keyboard Grid */}
                        <div className="grid grid-cols-12 gap-1 p-1 h-full opacity-30">
                          {Array.from({ length: 48 }).map((_, i) => (
                            <div key={i} className="bg-gray-700 rounded-sm"></div>
                          ))}
                        </div>
                      </div>
                      {/* Touchpad */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-full opacity-30"></div>
                    </div>
                    {/* Stand/Shadow */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[95%] h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating Label */}
              <div className="absolute -bottom-4 left-4 right-4 text-center">
                <div className="inline-flex items-center rounded-full bg-blue-500/20 backdrop-blur-sm px-4 py-2 text-sm text-blue-200 ring-1 ring-blue-500/30">
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Powerful Analysis Dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature highlights in new row */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <Search className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-white text-sm">Competitor Analysis</h3>
              <p className="text-xs text-blue-200">Identify strengths & weaknesses</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <Target className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-white text-sm">Market Insights</h3>
              <p className="text-xs text-blue-200">Discover opportunities</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <Wand2 className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-white text-sm">AI Generation</h3>
              <p className="text-xs text-blue-200">Instant pitches & roadmaps</p>
            </div>
          </div>
        </div>

        {/* How it Works Link */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={scrollToFeatures}
            className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors group"
          >
            <span className="text-lg">See How it Works</span>
            <ChevronDown className="w-5 h-5 animate-bounce group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
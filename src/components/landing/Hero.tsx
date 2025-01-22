import React from 'react';
import { ArrowRight, BarChart2, Search, Sparkles, Target, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';

export const Hero = () => {
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
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full bg-blue-500/10 px-6 py-2 text-blue-300 ring-1 ring-blue-500/20 mb-8">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>AI-Powered Business Intelligence</span>
          </div>
          
          <h1 className="max-w-4xl bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent text-4xl font-bold tracking-tight sm:text-6xl">
            Transform Your Business with Data-Driven Insights
          </h1>
          
          <p className="mt-6 max-w-2xl text-lg text-blue-100">
            Enter your business URL and let our AI analyze your market, competitors, and opportunities. Get instant insights, sales pitches, and growth roadmaps.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link to="/register" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto text-lg px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white">
                Start Free Analysis <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-3 text-blue-300 border-blue-500/20 hover:bg-blue-500/10">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Search className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Competitor Analysis</h3>
                <p className="mt-1 text-sm text-blue-200">Identify strengths and weaknesses</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Target className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Market Insights</h3>
                <p className="mt-1 text-sm text-blue-200">Discover growth opportunities</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Wand2 className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">AI Generation</h3>
                <p className="mt-1 text-sm text-blue-200">Pitches & roadmaps in seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
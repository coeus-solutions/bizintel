import React from 'react';
import { TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { AnalysisCard } from './AnalysisCard';

interface MarketInsightsProps {
  businessId: string;
}

export const MarketInsights: React.FC<MarketInsightsProps> = () => {
  const trends = [
    { name: 'Market Growth', value: '+12.5%', trend: 'up', description: 'Year-over-year market expansion' },
    { name: 'Customer Demand', value: '+8.3%', trend: 'up', description: 'Increasing demand in target segment' },
    { name: 'Competition Level', value: '-2.1%', trend: 'down', description: 'Reduced competitive pressure' },
  ];

  return (
    <AnalysisCard title="Market Insights" icon={TrendingUp}>
      <div className="space-y-4">
        {trends.map((trend, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">{trend.name}</div>
              <div className="text-sm text-gray-500">{trend.description}</div>
            </div>
            <div className={`flex items-center gap-1 font-medium ${
              trend.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.value}
              {trend.trend === 'up' ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
            </div>
          </div>
        ))}
      </div>
    </AnalysisCard>
  );
};
import React from 'react';
import { Users, TrendingUp, Award } from 'lucide-react';
import { AnalysisCard } from './AnalysisCard';

interface CompetitorAnalysisProps {
  businessId: string;
}

export const CompetitorAnalysis: React.FC<CompetitorAnalysisProps> = () => {
  const competitors = [
    { name: 'TechGiant Corp', strengths: ['Market Leader', 'Strong R&D'], weaknesses: ['High Prices', 'Complex Products'] },
    { name: 'InnovateTech', strengths: ['Innovation Focus', 'User Experience'], weaknesses: ['Limited Market Reach'] },
  ];

  return (
    <AnalysisCard
      title="Competitor Analysis"
      icon={Users}
      className="col-span-1 lg:col-span-2"
    >
      <div className="space-y-6">
        {competitors.map((competitor, index) => (
          <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
            <h4 className="font-medium text-lg mb-2">{competitor.name}</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">Strengths</span>
                </div>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {competitor.strengths.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <Award className="w-4 h-4" />
                  <span className="font-medium">Weaknesses</span>
                </div>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {competitor.weaknesses.map((weakness, idx) => (
                    <li key={idx}>{weakness}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AnalysisCard>
  );
};
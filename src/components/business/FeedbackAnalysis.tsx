import React from 'react';
import { MessageSquare } from 'lucide-react';
import { AnalysisCard } from './AnalysisCard';

interface FeedbackAnalysisProps {
  businessId: string;
}

export const FeedbackAnalysis: React.FC<FeedbackAnalysisProps> = () => {
  const feedback = {
    sentiment: {
      positive: 75,
      neutral: 15,
      negative: 10,
    },
    highlights: [
      { type: 'positive', text: 'Excellent customer service and support' },
      { type: 'positive', text: 'Innovative product features' },
      { type: 'negative', text: 'Premium pricing compared to alternatives' },
    ],
  };

  return (
    <AnalysisCard title="Feedback Analysis" icon={MessageSquare}>
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-3">Sentiment Distribution</h4>
          <div className="flex gap-2 h-4 rounded-full overflow-hidden">
            <div 
              className="bg-green-500" 
              style={{ width: `${feedback.sentiment.positive}%` }}
              title={`Positive: ${feedback.sentiment.positive}%`}
            />
            <div 
              className="bg-gray-300" 
              style={{ width: `${feedback.sentiment.neutral}%` }}
              title={`Neutral: ${feedback.sentiment.neutral}%`}
            />
            <div 
              className="bg-red-500" 
              style={{ width: `${feedback.sentiment.negative}%` }}
              title={`Negative: ${feedback.sentiment.negative}%`}
            />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Key Highlights</h4>
          <div className="space-y-2">
            {feedback.highlights.map((item, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg ${
                  item.type === 'positive' ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div className={`text-sm ${
                  item.type === 'positive' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnalysisCard>
  );
};
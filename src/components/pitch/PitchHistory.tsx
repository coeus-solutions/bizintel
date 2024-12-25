import React from 'react';
import { History, Copy } from 'lucide-react';
import { Button } from '../Button';

interface PitchHistoryProps {
  businessId: string;
}

export const PitchHistory: React.FC<PitchHistoryProps> = () => {
  // Demo data
  const pitches = [
    {
      id: '1',
      date: '2024-03-15',
      target: 'Enterprise Software',
      preview: 'TechCorp Solutions is revolutionizing the enterprise software...'
    },
    {
      id: '2',
      date: '2024-03-14',
      target: 'Healthcare',
      preview: 'In the rapidly evolving healthcare sector, TechCorp Solutions...'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <History className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Previous Pitches</h2>
      </div>

      <div className="space-y-4">
        {pitches.map((pitch) => (
          <div key={pitch.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium">{pitch.target}</div>
                <div className="text-sm text-gray-500">{pitch.date}</div>
              </div>
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">{pitch.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
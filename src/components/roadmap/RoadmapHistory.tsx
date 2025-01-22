import React from 'react';
import { History, Download } from 'lucide-react';
import { Button } from '../Button';

interface RoadmapHistoryProps {
  businessId: string;
}

export const RoadmapHistory: React.FC<RoadmapHistoryProps> = () => {
  // Demo data
  const roadmaps = [
    {
      id: '1',
      date: '2024-03-15',
      duration: '6 months',
      preview: 'Strategic roadmap focusing on market expansion and product development...'
    },
    {
      id: '2',
      date: '2024-03-14',
      duration: '3 months',
      preview: 'Short-term roadmap targeting immediate growth opportunities...'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <History className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Previous Roadmaps</h2>
      </div>

      <div className="space-y-4">
        {roadmaps.map((roadmap) => (
          <div key={roadmap.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium">{roadmap.duration}</div>
                <div className="text-sm text-gray-500">{roadmap.date}</div>
              </div>
              <Button variant="outline" className="p-2">
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">{roadmap.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 
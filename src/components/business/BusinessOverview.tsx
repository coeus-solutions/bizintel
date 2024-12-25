import React from 'react';
import { ArrowLeft, Globe, Calendar, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Business } from '../../types';
import { Button } from '../Button';

interface BusinessOverviewProps {
  business: Business;
}

export const BusinessOverview: React.FC<BusinessOverviewProps> = ({ business }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" className="!p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{business.name}</h1>
            <div className="flex items-center gap-2 text-gray-500 mt-1">
              <Globe className="w-4 h-4" />
              <a href={business.url} target="_blank" rel="noopener noreferrer" 
                 className="hover:text-blue-600">{business.url}</a>
            </div>
          </div>
        </div>
        <Link to={`/business/${business.id}/pitch`}>
          <Button>
            <Wand2 className="w-5 h-5 mr-2" />
            Generate Pitch
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-blue-600 font-medium">Analysis Status</div>
          <div className="text-lg font-semibold mt-1 capitalize">{business.status}</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-green-600 font-medium">Insights Generated</div>
          <div className="text-lg font-semibold mt-1">24</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-purple-600 font-medium">Last Updated</div>
          <div className="text-lg font-semibold mt-1">2 hours ago</div>
        </div>
      </div>
    </div>
  );
};
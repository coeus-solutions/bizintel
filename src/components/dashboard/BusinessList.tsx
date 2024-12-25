import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Business } from '../../types';
import { Button } from '../Button';

interface BusinessListProps {
  businesses: Business[];
  onAddClick: () => void;
}

export const BusinessList: React.FC<BusinessListProps> = ({ businesses, onAddClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search businesses..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {businesses.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No businesses added yet. Click "Add Business" to get started.
          </div>
        ) : (
          businesses.map((business) => (
            <div key={business.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">{business.name}</h3>
                  <p className="text-sm text-gray-500">{business.url}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    business.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : business.status === 'error'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                  </span>
                  <Link to={`/business/${business.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
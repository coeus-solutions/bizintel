import React from 'react';
import { Package } from 'lucide-react';
import { AnalysisCard } from './AnalysisCard';

interface ProductAnalysisProps {
  businessId: string;
}

export const ProductAnalysis: React.FC<ProductAnalysisProps> = () => {
  const products = [
    {
      name: 'Enterprise Suite',
      category: 'Software',
      marketPosition: 'Premium',
      uniqueFeatures: ['AI Integration', 'Advanced Analytics'],
    },
    {
      name: 'Business Basic',
      category: 'Software',
      marketPosition: 'Mid-range',
      uniqueFeatures: ['Core Features', 'Basic Reporting'],
    },
  ];

  return (
    <AnalysisCard title="Product Analysis" icon={Package}>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{product.name}</h4>
              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                {product.marketPosition}
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-2">{product.category}</div>
            <div>
              <div className="text-sm font-medium mb-1">Unique Features:</div>
              <div className="flex flex-wrap gap-2">
                {product.uniqueFeatures.map((feature, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AnalysisCard>
  );
};
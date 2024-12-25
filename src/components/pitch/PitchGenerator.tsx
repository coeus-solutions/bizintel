import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Business } from '../../types';
import { PitchForm } from './PitchForm';
import { PitchPreview } from './PitchPreview';

interface PitchGeneratorProps {
  business: Business;
}

export const PitchGenerator: React.FC<PitchGeneratorProps> = ({ business }) => {
  const [generatedPitch, setGeneratedPitch] = useState<string>('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async (formData: any) => {
    setGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Enhanced pitch template with better structure
      const pitch = `
🎯 Value Proposition
${business.name} is revolutionizing the ${formData.target} industry with cutting-edge solutions designed specifically for ${formData.audience}.

💡 Key Benefits
• Streamlined operations with AI-powered automation
• Enhanced productivity through intelligent workflows
• Data-driven insights for better decision making

🌟 Why Choose Us
Our innovative approach combines state-of-the-art technology with exceptional service, making us the ideal partner for forward-thinking organizations.

📈 Impact
Join the growing number of businesses that have achieved:
• 40% increase in operational efficiency
• 25% reduction in costs
• 60% faster time-to-market

Ready to transform your business? Let's connect and explore how we can help you achieve your goals.
      `.trim();
      
      setGeneratedPitch(pitch);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Wand2 className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Generate New Pitch</h2>
      </div>

      <div className="space-y-6">
        <PitchForm onSubmit={handleGenerate} isGenerating={generating} />
        {generatedPitch && <PitchPreview pitch={generatedPitch} />}
      </div>
    </div>
  );
};
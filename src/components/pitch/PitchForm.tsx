import React from 'react';
import { Input } from '../Input';
import { Button } from '../Button';

interface PitchFormProps {
  onSubmit: (data: any) => void;
  isGenerating: boolean;
}

export const PitchForm: React.FC<PitchFormProps> = ({ onSubmit, isGenerating }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    onSubmit({
      target: formData.get('target'),
      audience: formData.get('audience'),
      tone: formData.get('tone'),
      length: formData.get('length')
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Target Market/Industry"
        name="target"
        placeholder="e.g., Enterprise Software, Healthcare"
        required
      />
      
      <Input
        label="Target Audience"
        name="audience"
        placeholder="e.g., CTOs, Small Business Owners"
        required
      />
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tone
          </label>
          <select
            name="tone"
            className="block w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="technical">Technical</option>
            <option value="persuasive">Persuasive</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Length
          </label>
          <select
            name="length"
            className="block w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          >
            <option value="short">Short (30s)</option>
            <option value="medium">Medium (1m)</option>
            <option value="long">Long (2m)</option>
          </select>
        </div>
      </div>

      <Button type="submit" loading={isGenerating} className="w-full">
        Generate Pitch
      </Button>
    </form>
  );
};
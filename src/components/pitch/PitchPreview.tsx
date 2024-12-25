import React from 'react';
import { Copy, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '../Button';

interface PitchPreviewProps {
  pitch: string;
}

export const PitchPreview: React.FC<PitchPreviewProps> = ({ pitch }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([pitch], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pitch.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="border-t border-gray-200 pt-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Generated Pitch</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleCopy}
                className="relative"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <div className="prose prose-blue max-w-none">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-blue-100">
              <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
                {pitch}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
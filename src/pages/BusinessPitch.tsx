import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2, X, ChevronDown, Download, Copy, Share2 } from 'lucide-react';
import { Button } from '../components/Button';
import { apiRequest } from '../utils/api';
import { ProductService } from '../types';

interface PitchInfo {
  summary: string;
  key_points: Record<string, string[]>;
  recommended_tone: string;
}

interface PitchResponse {
  message: string;
  pitch: PitchInfo;
}

interface LocationState {
  businessName: string;
  products: ProductService[];
}

export const BusinessPitch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { businessName, products = [] } = (location.state as LocationState) || {};
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>(products[0]?.name || '');
  const [generatedPitch, setGeneratedPitch] = useState<PitchInfo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGeneratePitch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      setLoading(true);
      setError(null);
      const response = await apiRequest<PitchResponse>('/generate-pitch', {
        method: 'POST',
        body: JSON.stringify({
          business_id: id,
          product_or_service: selectedProduct
        }),
      });

      if (response?.pitch) {
        setGeneratedPitch(response.pitch);
        setShowModal(true);
      } else {
        setError('Failed to generate pitch. Please try again.');
      }
    } catch (err) {
      console.error('Error generating pitch:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate pitch');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      const pitchText = `Sales Pitch Summary:
${generatedPitch?.summary}

Key Points:
${Object.entries(generatedPitch?.key_points || {})
  .map(([category, points]) => `${category.toUpperCase()}:
${points.map(point => `• ${point}`).join('\n')}`)
  .join('\n\n')}

Recommended Tone:
${generatedPitch?.recommended_tone}`;

      await navigator.clipboard.writeText(pitchText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const handleDownloadPDF = () => {
    // This is a placeholder - you'll need to implement actual PDF generation
    // You could use libraries like jsPDF or html2pdf
    console.log('Download PDF functionality to be implemented');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sales Pitch',
          text: `Sales Pitch for ${selectedProduct}`,
          // You might want to implement a way to share via a URL
          url: window.location.href,
        });
      } catch (err) {
        console.error('Failed to share:', err);
      }
    }
  };

  if (!businessName || products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
          Missing business information. Please go back and try again.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Generate Sales Pitch</h1>
          <p className="mt-1 text-sm text-gray-500">Generate a sales pitch for {businessName}</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleGeneratePitch} className="space-y-4">
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
              Select Product/Service
            </label>
            <div className="relative">
              <select
                id="product"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="block w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-8 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 sm:text-sm"
                required
                disabled={loading}
              >
                {products.map((product) => (
                  <option key={product.name} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !selectedProduct}
            className="w-full justify-center py-2.5"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Pitch...
              </>
            ) : (
              'Generate Pitch'
            )}
          </Button>
        </form>
      </div>

      {/* Enhanced Pitch Modal */}
      {showModal && generatedPitch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 flex justify-between items-center border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Generated Sales Pitch</h2>
                <p className="text-sm text-gray-500 mt-1">For {selectedProduct}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  onClick={handleCopyToClipboard}
                  className="flex items-center gap-1 relative"
                >
                  {copySuccess ? (
                    <>
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">PDF</span>
                </Button>
                {typeof navigator.share === 'function' && (
                  <Button
                    variant="secondary"
                    onClick={handleShare}
                    className="flex items-center gap-1"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                )}
                <Button
                  variant="secondary"
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="prose max-w-none space-y-4">
                {/* Summary Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Summary</h3>
                  <p className="text-gray-700 leading-relaxed">{generatedPitch.summary}</p>
                </div>
                
                {/* Key Points Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Key Points</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Object.entries(generatedPitch.key_points).map(([category, points]) => (
                      <div key={category} className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                          {category}
                        </h4>
                        <ul className="list-disc list-outside ml-4 space-y-1.5">
                          {points.map((point, index) => (
                            <li key={index} className="text-gray-600 text-sm leading-relaxed">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tone Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Recommended Tone</h3>
                  <p className="text-gray-700 leading-relaxed">{generatedPitch.recommended_tone}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Generated on {new Date().toLocaleDateString()}
                </p>
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
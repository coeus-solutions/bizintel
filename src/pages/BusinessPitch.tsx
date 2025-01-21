import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Loader2, X, ChevronDown, Download, Copy, Share2 } from 'lucide-react';
import { Button } from '../components/Button';
import { apiRequest } from '../utils/api';
import { ProductService } from '../types';
import jsPDF from 'jspdf';

interface PitchInfo {
  summary: string;
  key_points: {
    value_proposition: string[];
    benefits: string[];
    differentiators: string[];
  };
  target_audience: {
    primary: string[];
    pain_points: string[];
  };
  competitive_edge: {
    advantages: string[];
    market_position: string;
  };
  call_to_action: string;
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
  const [customProduct, setCustomProduct] = useState<string>('');
  const [generatedPitch, setGeneratedPitch] = useState<PitchInfo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGeneratePitch = async (e: React.FormEvent) => {
    e.preventDefault();
    const productToUse = products.length > 0 ? selectedProduct : customProduct;
    if (!productToUse) return;

    try {
      setLoading(true);
      setError(null);
      const response = await apiRequest<PitchResponse>('/generate-pitch', {
        method: 'POST',
        body: JSON.stringify({
          business_id: id,
          product_or_service: productToUse
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
Value Proposition:
${generatedPitch?.key_points.value_proposition.map(point => `• ${point}`).join('\n')}

Benefits:
${generatedPitch?.key_points.benefits.map(point => `• ${point}`).join('\n')}

Differentiators:
${generatedPitch?.key_points.differentiators.map(point => `• ${point}`).join('\n')}

Target Audience:
Primary: ${generatedPitch?.target_audience.primary.join(', ')}
Pain Points:
${generatedPitch?.target_audience.pain_points.map(point => `• ${point}`).join('\n')}

Competitive Edge:
Advantages:
${generatedPitch?.competitive_edge.advantages.map(point => `• ${point}`).join('\n')}
Market Position: ${generatedPitch?.competitive_edge.market_position}

Call to Action:
${generatedPitch?.call_to_action}

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
    if (!generatedPitch) return;

    const doc = new jsPDF();
    const lineHeight = 7;
    let yPos = 20;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - 2 * margin;

    // Helper function to check and add new page if needed
    const checkAndAddPage = (estimatedHeight: number = lineHeight) => {
      if (yPos + estimatedHeight > pageHeight - margin) {
        doc.addPage();
        yPos = 20;
        return true;
      }
      return false;
    };

    // Helper function to add text with word wrap
    const addWrappedText = (text: string, fontSize = 12) => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      const textHeight = lines.length * lineHeight;
      
      // Check if we need a new page
      checkAndAddPage(textHeight);
      
      doc.text(lines, margin, yPos);
      yPos += textHeight;
      return yPos;
    };

    // Helper function to add bullet points
    const addBulletPoints = (points: string[]) => {
      points.forEach(point => {
        const bulletText = `• ${point}`;
        const lines = doc.splitTextToSize(bulletText, maxWidth);
        const pointHeight = lines.length * lineHeight;

        // Check if we need a new page
        checkAndAddPage(pointHeight);

        doc.text(lines, margin, yPos);
        yPos += pointHeight;
      });
      yPos += lineHeight; // Add extra space after bullet points
    };

    // Helper function to add a section
    const addSection = (title: string, content: string | string[], isList = false, isMainTitle = false) => {
      // Check if we need a new page for the section
      checkAndAddPage(lineHeight * 3);

      // Add section title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(isMainTitle ? 16 : 14);
      doc.text(title, margin, yPos);
      yPos += lineHeight * 1.5;

      // Add content
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      
      if (isList && Array.isArray(content)) {
        addBulletPoints(content);
      } else if (typeof content === 'string') {
        addWrappedText(content);
      }
      
      yPos += lineHeight; // Add space after section
    };

    // Title
    addSection(`Sales Pitch for ${selectedProduct}`, '', false, true);

    // Summary
    addSection('Summary', generatedPitch.summary);

    // Key Points
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text('Key Points', margin, yPos);
    yPos += lineHeight * 1.5;

    // Value Proposition
    doc.setFontSize(12);
    doc.text('Value Proposition:', margin, yPos);
    yPos += lineHeight;
    doc.setFont("helvetica", "normal");
    addBulletPoints(generatedPitch.key_points.value_proposition);

    // Benefits
    doc.setFont("helvetica", "bold");
    doc.text('Benefits:', margin, yPos);
    yPos += lineHeight;
    doc.setFont("helvetica", "normal");
    addBulletPoints(generatedPitch.key_points.benefits);

    // Differentiators
    doc.setFont("helvetica", "bold");
    doc.text('Differentiators:', margin, yPos);
    yPos += lineHeight;
    doc.setFont("helvetica", "normal");
    addBulletPoints(generatedPitch.key_points.differentiators);

    // Target Audience
    addSection('Target Audience', '');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text('Primary Audience:', margin, yPos);
    yPos += lineHeight;
    doc.setFont("helvetica", "normal");
    addWrappedText(generatedPitch.target_audience.primary.join(", "));

    doc.setFont("helvetica", "bold");
    doc.text('Pain Points:', margin, yPos);
    yPos += lineHeight;
    doc.setFont("helvetica", "normal");
    addBulletPoints(generatedPitch.target_audience.pain_points);

    // Competitive Edge
    addSection('Competitive Edge', '');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text('Advantages:', margin, yPos);
    yPos += lineHeight;
    doc.setFont("helvetica", "normal");
    addBulletPoints(generatedPitch.competitive_edge.advantages);

    doc.setFont("helvetica", "bold");
    doc.text('Market Position:', margin, yPos);
    yPos += lineHeight;
    doc.setFont("helvetica", "normal");
    addWrappedText(generatedPitch.competitive_edge.market_position);

    // Call to Action
    addSection('Call to Action', generatedPitch.call_to_action);

    // Recommended Tone
    addSection('Recommended Tone', generatedPitch.recommended_tone);

    // Save the PDF
    doc.save(`${selectedProduct.toLowerCase().replace(/\s+/g, '-')}-pitch.pdf`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sales Pitch',
          text: `Sales Pitch for ${selectedProduct}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Failed to share:', err);
      }
    }
  };

  if (!businessName) {
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
              {products.length > 0 ? 'Select Product/Service' : 'Enter Product/Service Name'}
            </label>
            {products.length > 0 ? (
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
            ) : (
              <input
                type="text"
                id="product"
                value={customProduct}
                onChange={(e) => setCustomProduct(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 sm:text-sm"
                placeholder="Enter the name of the product or service"
                required
                disabled={loading}
              />
            )}
          </div>

          <Button
            type="submit"
            disabled={loading || (!selectedProduct && !customProduct)}
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
            <div className="p-6 flex justify-between items-center border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600">
              <div>
                <h2 className="text-xl font-semibold text-white">Generated Sales Pitch</h2>
                <p className="text-blue-100 mt-1">For {selectedProduct}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 bg-indigo-900 text-white hover:bg-indigo-800 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="p-1.5 bg-white/10 hover:bg-white/20 border-white/20 text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <div className="prose max-w-none space-y-6">
                {/* Summary Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">Summary</h3>
                  <p className="text-blue-800 leading-relaxed">{generatedPitch.summary}</p>
                </div>

                {/* Key Points Section */}
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 shadow-sm border border-emerald-100">
                    <h4 className="text-sm font-medium text-emerald-900 uppercase tracking-wide mb-3">
                      Value Proposition
                    </h4>
                    <ul className="list-disc list-outside ml-4 space-y-2">
                      {generatedPitch.key_points.value_proposition.map((point, index) => (
                        <li key={index} className="text-emerald-800 text-sm leading-relaxed">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-6 shadow-sm border border-purple-100">
                    <h4 className="text-sm font-medium text-purple-900 uppercase tracking-wide mb-3">
                      Benefits
                    </h4>
                    <ul className="list-disc list-outside ml-4 space-y-2">
                      {generatedPitch.key_points.benefits.map((point, index) => (
                        <li key={index} className="text-purple-800 text-sm leading-relaxed">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-sm border border-amber-100">
                    <h4 className="text-sm font-medium text-amber-900 uppercase tracking-wide mb-3">
                      Differentiators
                    </h4>
                    <ul className="list-disc list-outside ml-4 space-y-2">
                      {generatedPitch.key_points.differentiators.map((point, index) => (
                        <li key={index} className="text-amber-800 text-sm leading-relaxed">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Target Audience Section */}
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 shadow-sm border border-rose-100">
                  <h3 className="text-lg font-medium text-rose-900 mb-4">Target Audience</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-rose-900 uppercase tracking-wide mb-2">
                        Primary Audience
                      </h4>
                      <p className="text-rose-800">{generatedPitch.target_audience.primary.join(', ')}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-rose-900 uppercase tracking-wide mb-2">
                        Pain Points
                      </h4>
                      <ul className="list-disc list-outside ml-4 space-y-2">
                        {generatedPitch.target_audience.pain_points.map((point, index) => (
                          <li key={index} className="text-rose-800 text-sm leading-relaxed">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Competitive Edge Section */}
                <div className="bg-gradient-to-br from-cyan-50 to-sky-50 rounded-xl p-6 shadow-sm border border-cyan-100">
                  <h3 className="text-lg font-medium text-cyan-900 mb-4">Competitive Edge</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-cyan-900 uppercase tracking-wide mb-2">
                        Advantages
                      </h4>
                      <ul className="list-disc list-outside ml-4 space-y-2">
                        {generatedPitch.competitive_edge.advantages.map((advantage, index) => (
                          <li key={index} className="text-cyan-800 text-sm leading-relaxed">
                            {advantage}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-cyan-900 uppercase tracking-wide mb-2">
                        Market Position
                      </h4>
                      <p className="text-cyan-800">{generatedPitch.competitive_edge.market_position}</p>
                    </div>
                  </div>
                </div>

                {/* Call to Action Section */}
                <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-violet-100">
                  <h3 className="text-lg font-medium text-violet-900 mb-2">Call to Action</h3>
                  <p className="text-violet-800 leading-relaxed">{generatedPitch.call_to_action}</p>
                </div>

                {/* Tone Section */}
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Recommended Tone</h3>
                  <p className="text-gray-800 leading-relaxed">{generatedPitch.recommended_tone}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 bg-white">
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
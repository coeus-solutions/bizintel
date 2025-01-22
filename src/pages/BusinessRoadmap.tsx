import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Map, Download, X } from 'lucide-react';
import { Button } from '../components/Button';
import { apiRequest } from '../utils/api';
import jsPDF from 'jspdf';

interface LocationState {
  businessId: string;
  businessName: string;
}

interface RoadmapMilestone {
  month: number;
  title: string;
  description: string;
  category: string;
  kpis: string[];
  action_steps: string[];
  expected_outcome: string;
}

interface RoadmapData {
  summary: string;
  duration_months: number;
  milestones: RoadmapMilestone[];
  key_focus_areas: string[];
  success_metrics: {
    revenue: string[];
    customer: string[];
    product: string[];
    market: string[];
  };
  resource_requirements: {
    team: string[];
    technology: string[];
    budget: string[];
  };
}

interface RoadmapResponse {
  status: string;
  message: string;
  data: RoadmapData;
}

export const BusinessRoadmap: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { businessId, businessName } = location.state as LocationState;

  const [timeHorizon, setTimeHorizon] = useState<number>(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);

  const handleGenerateRoadmap = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiRequest<RoadmapResponse>(`/business-roadmap?business_id=${businessId}&time_horizon_months=${timeHorizon}`, {
        method: 'POST'
      });

      if (response?.data) {
        setRoadmapData(response.data);
        setShowRoadmapModal(true);
      } else {
        setError('Failed to generate roadmap. Please try again.');
      }
    } catch (err) {
      console.error('Error generating roadmap:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate roadmap');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!roadmapData) return;

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

        checkAndAddPage(pointHeight);

        doc.text(lines, margin, yPos);
        yPos += pointHeight;
      });
      yPos += lineHeight; // Add extra space after bullet points
    };

    // Helper function to add a section
    const addSection = (title: string, content: string | string[], isList = false, isMainTitle = false) => {
      checkAndAddPage(lineHeight * 3);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(isMainTitle ? 16 : 14);
      doc.text(title, margin, yPos);
      yPos += lineHeight * 1.5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      
      if (isList && Array.isArray(content)) {
        addBulletPoints(content);
      } else if (typeof content === 'string') {
        addWrappedText(content);
      }
      
      yPos += lineHeight;
    };

    // Title
    addSection(`Strategic Roadmap for ${businessName}`, '', false, true);

    // Summary
    addSection('Executive Summary', roadmapData.summary);

    // Key Focus Areas
    addSection('Key Focus Areas', roadmapData.key_focus_areas, true);

    // Timeline
    addSection('Implementation Timeline', '');
    roadmapData.milestones.forEach((milestone) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(`Month ${milestone.month} - ${milestone.category}`, margin, yPos);
      yPos += lineHeight;

      doc.setFont("helvetica", "bold");
      doc.text(milestone.title, margin, yPos);
      yPos += lineHeight;

      doc.setFont("helvetica", "normal");
      addWrappedText(milestone.description);

      doc.setFont("helvetica", "bold");
      doc.text('Action Steps:', margin, yPos);
      yPos += lineHeight;
      doc.setFont("helvetica", "normal");
      addBulletPoints(milestone.action_steps);

      doc.setFont("helvetica", "bold");
      doc.text('KPIs:', margin, yPos);
      yPos += lineHeight;
      doc.setFont("helvetica", "normal");
      addBulletPoints(milestone.kpis);

      doc.setFont("helvetica", "bold");
      doc.text('Expected Outcome:', margin, yPos);
      yPos += lineHeight;
      doc.setFont("helvetica", "normal");
      addWrappedText(milestone.expected_outcome);
      yPos += lineHeight;
    });

    // Success Metrics
    addSection('Success Metrics', '');
    
    doc.setFont("helvetica", "bold");
    doc.text('Revenue Metrics:', margin, yPos);
    yPos += lineHeight;
    doc.setFont("helvetica", "normal");
    addBulletPoints(roadmapData.success_metrics.revenue);

    doc.setFont("helvetica", "bold");
    doc.text('Customer Metrics:', margin, yPos);
    yPos += lineHeight;
    doc.setFont("helvetica", "normal");
    addBulletPoints(roadmapData.success_metrics.customer);

    doc.setFont("helvetica", "bold");
    doc.text('Product Metrics:', margin, yPos);
    yPos += lineHeight;
    doc.setFont("helvetica", "normal");
    addBulletPoints(roadmapData.success_metrics.product);

    doc.setFont("helvetica", "bold");
    doc.text('Market Metrics:', margin, yPos);
    yPos += lineHeight;
    doc.setFont("helvetica", "normal");
    addBulletPoints(roadmapData.success_metrics.market);

    // Resource Requirements
    addSection('Resource Requirements', '');
    
    doc.setFont("helvetica", "bold");
    doc.text('Team:', margin, yPos);
    yPos += lineHeight;
    doc.setFont("helvetica", "normal");
    addBulletPoints(roadmapData.resource_requirements.team);

    doc.setFont("helvetica", "bold");
    doc.text('Technology:', margin, yPos);
    yPos += lineHeight;
    doc.setFont("helvetica", "normal");
    addBulletPoints(roadmapData.resource_requirements.technology);

    doc.setFont("helvetica", "bold");
    doc.text('Budget:', margin, yPos);
    yPos += lineHeight;
    doc.setFont("helvetica", "normal");
    addBulletPoints(roadmapData.resource_requirements.budget);

    // Save the PDF
    doc.save(`${businessName.toLowerCase().replace(/\s+/g, '-')}-roadmap.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Generate Strategic Roadmap</h1>
        <div className="space-y-6">
          <div>
            <label htmlFor="timeHorizon" className="block text-sm font-medium text-gray-700 mb-2">
              Time Horizon (Months)
            </label>
            <select
              id="timeHorizon"
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(Number(e.target.value))}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {[1, 2, 3, 4, 5, 6].map((month) => (
                <option key={month} value={month}>
                  {month} {month === 1 ? 'Month' : 'Months'}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          )}

          <Button
            onClick={handleGenerateRoadmap}
            disabled={loading}
            className="w-full"
          >
            <Map className="w-4 h-4 mr-2" />
            {loading ? 'Generating...' : 'Generate Roadmap'}
          </Button>
        </div>
      </div>

      {/* Roadmap Modal */}
      {showRoadmapModal && roadmapData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 flex justify-between items-center border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Strategic Roadmap</h2>
                <p className="text-sm text-gray-500 mt-1">{businessName} - Next {roadmapData.duration_months} Months</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowRoadmapModal(false)}
                  className="p-1.5 hover:bg-gray-100"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </Button>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div id="roadmap-content" className="prose max-w-none space-y-8">
                {/* Summary */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">Executive Summary</h3>
                  <p className="text-blue-800">{roadmapData.summary}</p>
                </div>

                {/* Key Focus Areas */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Key Focus Areas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roadmapData.key_focus_areas.map((area, index) => (
                      <div key={index} className="bg-purple-50 rounded-lg p-4">
                        <p className="text-purple-900">{area}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Implementation Timeline</h3>
                  <div className="space-y-6">
                    {roadmapData.milestones.map((milestone, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 text-sm font-medium">
                            Month {milestone.month}
                          </div>
                          <div className="bg-gray-100 text-gray-800 rounded-full px-4 py-1 text-sm font-medium">
                            {milestone.category}
                          </div>
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">{milestone.title}</h4>
                        <p className="text-gray-600 mb-4">{milestone.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Action Steps</h5>
                            <ul className="list-disc list-inside space-y-1">
                              {milestone.action_steps.map((step, i) => (
                                <li key={i} className="text-gray-600">{step}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">KPIs</h5>
                            <ul className="list-disc list-inside space-y-1">
                              {milestone.kpis.map((kpi, i) => (
                                <li key={i} className="text-gray-600">{kpi}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h5 className="font-medium text-gray-900 mb-2">Expected Outcome</h5>
                          <p className="text-gray-600">{milestone.expected_outcome}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Success Metrics */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Success Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-medium text-green-900 mb-2">Revenue Metrics</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {roadmapData.success_metrics.revenue.map((metric, i) => (
                          <li key={i} className="text-green-800">{metric}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Customer Metrics</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {roadmapData.success_metrics.customer.map((metric, i) => (
                          <li key={i} className="text-blue-800">{metric}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-medium text-purple-900 mb-2">Product Metrics</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {roadmapData.success_metrics.product.map((metric, i) => (
                          <li key={i} className="text-purple-800">{metric}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <h4 className="font-medium text-indigo-900 mb-2">Market Metrics</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {roadmapData.success_metrics.market.map((metric, i) => (
                          <li key={i} className="text-indigo-800">{metric}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Resource Requirements */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Resource Requirements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-amber-50 rounded-lg p-4">
                      <h4 className="font-medium text-amber-900 mb-2">Team</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {roadmapData.resource_requirements.team.map((req, i) => (
                          <li key={i} className="text-amber-800">{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-4">
                      <h4 className="font-medium text-cyan-900 mb-2">Technology</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {roadmapData.resource_requirements.technology.map((req, i) => (
                          <li key={i} className="text-cyan-800">{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-rose-50 rounded-lg p-4">
                      <h4 className="font-medium text-rose-900 mb-2">Budget</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {roadmapData.resource_requirements.budget.map((req, i) => (
                          <li key={i} className="text-rose-800">{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowRoadmapModal(false)}>
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
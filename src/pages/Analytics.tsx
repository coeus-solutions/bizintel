import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Loader2, AlertCircle, Ban } from 'lucide-react';
import { apiRequest } from '../utils/api';
import { toast } from '../components/ui/Toast';

interface SentimentOverview {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

interface ProductCategory {
  category: string;
  count: number;
  sentiment_distribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

interface Topic {
  topic: string;
  frequency: number;
  sentiment: string;
}

interface CompetitorDistribution {
  [key: string]: number;
}

interface Statistics {
  total_businesses: number;
  total_feedback: number;
  sentiment_overview: SentimentOverview;
  product_categories: ProductCategory[];
  common_topics: Topic[];
  competitor_distribution: CompetitorDistribution;
}

const COLORS = ['#10B981', '#EF4444', '#6B7280', '#6366F1', '#8B5CF6', '#EC4899'];

const SkeletonLoader = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-gray-500">
    <Ban className="w-12 h-12 mb-2 opacity-50" />
    <p className="text-sm">{message}</p>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-gray-500">
    <AlertCircle className="w-12 h-12 mb-2 text-red-500 opacity-80" />
    <p className="text-sm">{message}</p>
  </div>
);

export const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Statistics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiRequest<Statistics>('/statistics');
        if (!response) {
          throw new Error('No data received');
        }
        setStats(response);
        setError(null);
      } catch (err) {
        const errorMessage = 'Failed to load analytics data. Please try again later.';
        setError(errorMessage);
        toast({
          type: 'error',
          title: 'Error',
          message: errorMessage
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const renderOverviewCard = (title: string, value: number | undefined, color: string) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      {loading ? (
        <SkeletonLoader className="h-10 w-20" />
      ) : error ? (
        <p className="text-red-500 text-sm">Error loading data</p>
      ) : value === undefined || value === 0 ? (
        <p className="text-gray-500 text-sm">No data available</p>
      ) : (
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      )}
    </div>
  );

  const sentimentData = stats?.sentiment_overview ? [
    { name: 'Positive', value: stats.sentiment_overview.positive },
    { name: 'Negative', value: stats.sentiment_overview.negative },
    { name: 'Neutral', value: stats.sentiment_overview.neutral },
  ].filter(item => item.value > 0) : [];

  const topTopics = stats?.common_topics
    ? stats.common_topics
        .slice(0, 10)
        .map(topic => ({ name: topic.topic, value: topic.frequency }))
        .filter(topic => topic.value > 0)
    : [];

  const renderChart = (
    title: string,
    isEmpty: boolean,
    emptyMessage: string,
    chart: React.ReactNode
  ) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="h-[300px] relative">
        {loading ? (
          <SkeletonLoader className="absolute inset-0 rounded-lg" />
        ) : error ? (
          <ErrorState message={error} />
        ) : isEmpty ? (
          <EmptyState message={emptyMessage} />
        ) : (
          chart
        )}
      </div>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {renderOverviewCard("Total Businesses", stats?.total_businesses, "text-blue-600")}
        {renderOverviewCard("Total Feedback", stats?.total_feedback, "text-green-600")}
        {renderOverviewCard("Product Categories", stats?.product_categories?.length, "text-purple-600")}
      </div>

      {/* Sentiment Overview and Top Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {renderChart(
          "Sentiment Distribution",
          !sentimentData.length,
          "No sentiment data available",
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}

        {renderChart(
          "Top Topics",
          !topTopics.length,
          "No topics data available",
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topTopics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Product Categories */}
      {renderChart(
        "Product Categories",
        !stats?.product_categories?.length,
        "No product categories available",
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats?.product_categories || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Competitor Distribution */}
      {renderChart(
        "Competitor Distribution",
        !stats?.competitor_distribution || !Object.keys(stats.competitor_distribution).length,
        "No competitor data available",
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={Object.entries(stats?.competitor_distribution || {}).map(([name, value]) => ({
                name,
                value,
              }))}
              cx="50%"
              cy="50%"
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {Object.keys(stats?.competitor_distribution || {}).map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}; 
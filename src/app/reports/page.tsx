'use client';

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  ArrowTrendingUpIcon,
  DocumentChartBarIcon,
  ClipboardDocumentCheckIcon,
  BuildingOfficeIcon,
  ServerIcon,
} from '@heroicons/react/24/outline';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ReportTemplates from '@/components/reports/ReportTemplates';

// Mock data for demonstration
const overviewMetrics = {
  vatCollected: {
    current: 15750000,
    previous: 12500000,
    percentageChange: 26,
  },
  invoiceVolume: {
    current: 45678,
    previous: 38900,
    percentageChange: 17.4,
  },
  complianceRate: {
    current: 87,
    previous: 82,
    percentageChange: 6.1,
  },
  revenueGrowth: [
    { month: 'Jan', value: 12500 },
    { month: 'Feb', value: 13200 },
    { month: 'Mar', value: 14100 },
    { month: 'Apr', value: 13800 },
    { month: 'May', value: 15200 },
    { month: 'Jun', value: 15750 },
  ],
};

const sectorData = [
  { name: 'Retail', value: 35 },
  { name: 'Manufacturing', value: 25 },
  { name: 'Services', value: 20 },
  { name: 'Technology', value: 15 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('month');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    // Implement template selection logic
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Reports Dashboard</h1>
          <div className="flex items-center gap-4">
            <select
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-4 gap-6">
          <div className="rounded-lg border border-gray-100 bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">Total VAT Collected</h3>
              <span className={`text-sm font-medium ${overviewMetrics.vatCollected.percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {overviewMetrics.vatCollected.percentageChange}%
              </span>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {formatCurrency(overviewMetrics.vatCollected.current)}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              vs {formatCurrency(overviewMetrics.vatCollected.previous)} last period
            </p>
          </div>

          <div className="rounded-lg border border-gray-100 bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">Invoice Volume</h3>
              <span className={`text-sm font-medium ${overviewMetrics.invoiceVolume.percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {overviewMetrics.invoiceVolume.percentageChange}%
              </span>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {overviewMetrics.invoiceVolume.current.toLocaleString()}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              vs {overviewMetrics.invoiceVolume.previous.toLocaleString()} last period
            </p>
          </div>

          <div className="rounded-lg border border-gray-100 bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">Compliance Rate</h3>
              <span className={`text-sm font-medium ${overviewMetrics.complianceRate.percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {overviewMetrics.complianceRate.percentageChange}%
              </span>
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {overviewMetrics.complianceRate.current}%
            </p>
            <p className="mt-1 text-sm text-gray-500">
              vs {overviewMetrics.complianceRate.previous}% last period
            </p>
          </div>

          <div className="rounded-lg border border-gray-100 bg-white p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">Revenue Growth</h3>
              <span className="text-sm font-medium text-green-600">Trending Up</span>
            </div>
            <div className="h-16 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={overviewMetrics.revenueGrowth}>
                  <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-2 gap-6">
          {/* Tax Collection Reports */}
          <div className="rounded-lg border border-gray-100 bg-white p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Tax Collection Reports</h2>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                VAT Collection Summary
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                Payment Method Analysis
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                Collection Efficiency
              </button>
            </div>
          </div>

          {/* Compliance Reports */}
          <div className="rounded-lg border border-gray-100 bg-white p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Compliance Reports</h2>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'On-time', value: 75 },
                  { name: 'Late', value: 15 },
                  { name: 'Non-compliant', value: 10 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                Filing Compliance Rates
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                Non-Compliance Hotspots
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                Risk Assessment Matrix
              </button>
            </div>
          </div>

          {/* Business Intelligence */}
          <div className="rounded-lg border border-gray-100 bg-white p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Business Intelligence</h2>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { month: 'Jan', retail: 65, manufacturing: 45, services: 55 },
                  { month: 'Feb', retail: 70, manufacturing: 48, services: 58 },
                  { month: 'Mar', retail: 68, manufacturing: 52, services: 60 },
                  { month: 'Apr', retail: 75, manufacturing: 55, services: 62 },
                  { month: 'May', retail: 78, manufacturing: 58, services: 65 },
                  { month: 'Jun', retail: 82, manufacturing: 60, services: 68 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="retail" stroke="#0088FE" />
                  <Line type="monotone" dataKey="manufacturing" stroke="#00C49F" />
                  <Line type="monotone" dataKey="services" stroke="#FFBB28" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                Sector Performance
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                Seasonal Trends
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                New Business Registration
              </button>
            </div>
          </div>

          {/* System Performance */}
          <div className="rounded-lg border border-gray-100 bg-white p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">System Performance</h2>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { hour: '00:00', desktop: 20, mobile: 10 },
                  { hour: '06:00', desktop: 40, mobile: 30 },
                  { hour: '12:00', desktop: 100, mobile: 80 },
                  { hour: '18:00', desktop: 60, mobile: 50 },
                  { hour: '23:59', desktop: 30, mobile: 20 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="desktop" stackId="a" fill="#8884d8" />
                  <Bar dataKey="mobile" stackId="a" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                Platform Usage
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                Invoice Processing Times
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                Error Rates
              </button>
            </div>
          </div>
        </div>

        {/* Report Templates */}
        <div className="mt-8">
          <ReportTemplates onSelectTemplate={handleSelectTemplate} />
        </div>
      </div>
    </DashboardLayout>
  );
} 
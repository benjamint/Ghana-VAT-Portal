'use client';

import React from 'react';
import {
  DocumentTextIcon,
  CalendarIcon,
  ChartBarIcon,
  MapPinIcon,
  ExclamationTriangleIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ForwardRefExoticComponent<any>;
  frequency: string;
  lastGenerated?: string;
}

const templates: ReportTemplate[] = [
  {
    id: 'daily-summary',
    name: 'Daily Collection Summary',
    description: "Previous day's collection totals with key metrics",
    icon: DocumentTextIcon,
    frequency: 'Daily',
    lastGenerated: 'Today, 6:00 AM',
  },
  {
    id: 'monthly-vat',
    name: 'Monthly VAT Revenue Report',
    description: 'Comprehensive month-end tax collection analysis',
    icon: ChartBarIcon,
    frequency: 'Monthly',
    lastGenerated: 'Feb 1, 2024',
  },
  {
    id: 'compliance-status',
    name: 'Compliance Status Report',
    description: 'Overview of filing compliance across all businesses',
    icon: CalendarIcon,
    frequency: 'Weekly',
    lastGenerated: 'Feb 26, 2024',
  },
  {
    id: 'top-contributors',
    name: 'Top Contributors Report',
    description: 'Highlighting businesses with highest tax contributions',
    icon: TrophyIcon,
    frequency: 'Monthly',
    lastGenerated: 'Feb 1, 2024',
  },
  {
    id: 'risk-assessment',
    name: 'Risk Assessment Report',
    description: 'Identifying potential audit candidates',
    icon: ExclamationTriangleIcon,
    frequency: 'Weekly',
    lastGenerated: 'Feb 26, 2024',
  },
  {
    id: 'regional-performance',
    name: 'Regional Performance Comparison',
    description: 'Geographic analysis of tax collection',
    icon: MapPinIcon,
    frequency: 'Monthly',
    lastGenerated: 'Feb 1, 2024',
  },
];

interface ReportTemplatesProps {
  onSelectTemplate: (templateId: string) => void;
}

export default function ReportTemplates({ onSelectTemplate }: ReportTemplatesProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Report Templates</h2>
      <div className="grid grid-cols-2 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="group relative rounded-lg border border-gray-100 bg-white p-6 hover:border-blue-100 hover:shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-blue-50 p-3">
                <template.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{template.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{template.description}</p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {template.frequency}
                  </span>
                  {template.lastGenerated && (
                    <span className="text-xs text-gray-500">
                      Last generated: {template.lastGenerated}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              className="absolute inset-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => onSelectTemplate(template.id)}
            >
              <span className="sr-only">View {template.name}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 
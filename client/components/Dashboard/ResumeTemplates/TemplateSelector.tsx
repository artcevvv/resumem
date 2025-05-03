'use client';

import { useState, Suspense } from 'react';
import ModernTemplate from './ModernTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import CreativeTemplate from './CreativeTemplate';
import PDFPreview from './PDFPreview';
import PDFDownloadButton from './PDFDownloadButton';

interface ResumeData {
  fullname: string;
  email: string;
  phone_number: string;
  summary: string;
  skills: Array<{ type: string; level: string }>;
  educations: Array<{
    school: string;
    degree: string;
    start_date: string;
    end_date: string;
    city: string;
    description: string;
  }>;
  careers: Array<{
    job_title: string;
    employer: string;
    start_date: string;
    end_date: string;
    city: string;
    description: string;
  }>;
  courses: Array<{
    name: string;
    url: string;
    start_date: string;
    end_date: string;
  }>;
}

interface TemplateSelectorProps {
  resume: ResumeData;
  onClose: () => void;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional design with a modern layout',
    component: ModernTemplate,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional two-column layout with a focus on experience',
    component: ProfessionalTemplate,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern asymmetrical design with a dark sidebar',
    component: CreativeTemplate,
  },
];

export default function TemplateSelector({ resume, onClose }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  if (!resume) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-background rounded-lg p-6">
          <p className="text-white">No resume data available</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 border border-gray-600 rounded-md text-white hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const TemplateComponent = selectedTemplate.component;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Select Resume Template</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Template Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Available Templates</h3>
            {templates.map((template) => (
              <div
                key={template.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedTemplate.id === template.id
                    ? 'border-indigo-500 bg-indigo-500 bg-opacity-10'
                    : 'border-gray-700 hover:border-indigo-500'
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
                <p className="text-gray-400 text-sm">{template.description}</p>
              </div>
            ))}
          </div>

          {/* PDF Preview */}
          <div className="h-[600px] border border-gray-700 rounded-lg overflow-hidden">
            <Suspense fallback={
              <div className="h-full flex items-center justify-center bg-gray-800">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
            }>
              <PDFPreview
                pdfDocument={<TemplateComponent resume={resume} />}
                templateId={selectedTemplate.id}
              />
            </Suspense>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 rounded-md text-white hover:bg-gray-700"
          >
            Cancel
          </button>
          <PDFDownloadButton
            pdfDocument={<TemplateComponent resume={resume} />}
            fileName={`${resume.fullname.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`}
          />
        </div>
      </div>
    </div>
  );
} 
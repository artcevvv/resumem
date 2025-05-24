"use client";

import React, { useState } from 'react';
import Container from '@/components/Global/Container';
import { CheckCircle2, X, Info } from 'lucide-react';
import PDFPreview from './PDFPreview';
import { getTemplateDocument } from './TemplateDocuments';
import TemplateCard from './TemplateCard';

const templates = [
    {
        id: 'professional',
        name: 'Professional',
        description: 'A clean and traditional design perfect for corporate roles and formal industries.',
        features: [
            'Classic layout with clear hierarchy',
            'Professional typography',
            'Balanced white space',
            'Ideal for corporate roles'
        ],
        preview: '/templates/proftempl.png'
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'A contemporary design with a fresh look, great for creative and tech industries.',
        features: [
            'Modern color scheme',
            'Dynamic layout',
            'Visual elements integration',
            'Perfect for tech and creative roles'
        ],
        preview: '/templates/moderntempl.png'
    },
    {
        id: 'creative',
        name: 'Creative',
        description: 'A bold and unique design that helps you stand out in creative industries.',
        features: [
            'Unique visual elements',
            'Custom color schemes',
            'Creative typography',
            'Ideal for design and creative roles'
        ],
        preview: '/templates/creativetempl.png'
    }
];

const templateGuide = {
    title: "How to Choose the Right Template",
    sections: [
        {
            title: "Professional Template",
            description: "Best for corporate and traditional industries",
            whenToUse: [
                "Corporate jobs",
                "Finance and banking",
                "Legal professions",
                "Government positions",
                "Traditional industries"
            ],
            tips: [
                "Emphasizes experience and qualifications",
                "Uses traditional formatting",
                "Focuses on achievements and responsibilities",
                "Maintains a clean, formal appearance"
            ]
        },
        {
            title: "Modern Template",
            description: "Perfect for tech and creative industries",
            whenToUse: [
                "Technology companies",
                "Startups",
                "Digital marketing",
                "Project management",
                "Consulting roles"
            ],
            tips: [
                "Highlights skills and projects",
                "Uses contemporary design elements",
                "Emphasizes technical abilities",
                "Balances professionalism with creativity"
            ]
        },
        {
            title: "Creative Template",
            description: "Ideal for design and creative fields",
            whenToUse: [
                "Design positions",
                "Creative agencies",
                "Art and media",
                "Marketing roles",
                "Content creation"
            ],
            tips: [
                "Showcases creativity and style",
                "Allows for unique presentation",
                "Emphasizes portfolio and projects",
                "Demonstrates design sensibility"
            ]
        }
    ],
    generalTips: [
        "Consider your industry and role",
        "Match the template to your experience level",
        "Ensure readability and professionalism",
        "Highlight your most relevant achievements",
        "Keep the design consistent with your personal brand"
    ]
};

export default function TemplatesPage() {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [showGuide, setShowGuide] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100">
            <Container>
                <div className="py-12">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-4">
                            Choose Your Resume Template
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Select from our professionally designed templates to create a resume that stands out
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {templates.map((template) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                onPreview={setSelectedTemplate}
                            />
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-600 mb-4">
                            Need help choosing the right template?
                        </p>
                        <button
                            onClick={() => setShowGuide(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            <Info className="w-5 h-5 mr-2" />
                            View Template Guide
                        </button>
                    </div>
                </div>
            </Container>

            {/* PDF Preview Modal */}
            {selectedTemplate && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {templates.find(t => t.id === selectedTemplate)?.name} Template Preview
                            </h3>
                            <button
                                onClick={() => setSelectedTemplate(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <PDFPreview
                                pdfDocument={getTemplateDocument(selectedTemplate)}
                                templateId={selectedTemplate}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Template Guide Modal */}
            {showGuide && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h3 className="text-2xl font-semibold text-gray-900">
                                {templateGuide.title}
                            </h3>
                            <button
                                onClick={() => setShowGuide(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-8">
                                {templateGuide.sections.map((section, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-6">
                                        <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                            {section.title}
                                        </h4>
                                        <p className="text-gray-600 mb-4">
                                            {section.description}
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <h5 className="font-medium text-gray-900 mb-2">
                                                    When to Use
                                                </h5>
                                                <ul className="space-y-2">
                                                    {section.whenToUse.map((item, i) => (
                                                        <li key={i} className="flex items-center text-gray-600">
                                                            <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-2" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-gray-900 mb-2">
                                                    Tips
                                                </h5>
                                                <ul className="space-y-2">
                                                    {section.tips.map((tip, i) => (
                                                        <li key={i} className="flex items-center text-gray-600">
                                                            <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-2" />
                                                            {tip}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="bg-indigo-50 rounded-xl p-6">
                                    <h4 className="text-xl font-semibold text-indigo-900 mb-4">
                                        General Tips for All Templates
                                    </h4>
                                    <ul className="space-y-2">
                                        {templateGuide.generalTips.map((tip, index) => (
                                            <li key={index} className="flex items-center text-indigo-700">
                                                <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-2" />
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 
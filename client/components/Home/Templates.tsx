'use client'

import React, { useState } from "react";
import Container from "../Global/Container";
import TemplateCard from "../Dashboard/ResumeTemplates/TemplateCard";
import { X } from "lucide-react";
import PDFPreview from "../Dashboard/ResumeTemplates/PDFPreview";
import { getTemplateDocument } from "../Dashboard/ResumeTemplates/TemplateDocuments";

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

function Templates() {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    return (
        <section className="py-8 md:py-16">
            <Container>
                <div className="bg-background w-full max-w-3xl mx-auto text-center py-6 px-4 md:px-20 rounded-3xl mb-8 md:mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Choose from a variety of top-tier templates and create your resume
                        in just minutes
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            onPreview={setSelectedTemplate}
                        />
                    ))}
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
        </section>
    );
}

export default Templates;

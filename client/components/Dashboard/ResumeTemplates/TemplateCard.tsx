import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Download } from 'lucide-react';

interface Template {
    id: string;
    name: string;
    description: string;
    features: string[];
    preview: string;
}

interface TemplateCardProps {
    template: Template;
    onPreview: (templateId: string) => void;
}

export default function TemplateCard({ template, onPreview }: TemplateCardProps) {
    const handlePreviewClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onPreview(template.id);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="aspect-[4/3] relative bg-gray-100 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={template.preview}
                        alt={`${template.name} template preview`}
                        fill
                        className="object-contain object-top"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                    />
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {template.name}
                </h3>
                <p className="text-gray-600 mb-4">
                    {template.description}
                </p>
                <ul className="space-y-2 mb-6">
                    {template.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                            <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-2" />
                            {feature}
                        </li>
                    ))}
                </ul>
                <div className="flex gap-4">
                    <Link
                        href={`/dashboard/new?template=${template.id}`}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Use Template
                    </Link>
                    <button
                        onClick={handlePreviewClick}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        type="button"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Preview
                    </button>
                </div>
            </div>
        </div>
    );
} 
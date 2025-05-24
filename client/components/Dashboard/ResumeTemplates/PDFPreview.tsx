'use client';

import { ReactElement, useState, useEffect } from 'react';
import { DocumentProps, pdf } from '@react-pdf/renderer';

interface PDFPreviewProps {
  pdfDocument: ReactElement<DocumentProps>;
  templateId: string;
}

export default function PDFPreview({ pdfDocument, templateId }: PDFPreviewProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generatePreview = async () => {
      try {
        setLoading(true);
        setError(null);
        const blob = await pdf(pdfDocument).toBlob();
        const previewUrl = URL.createObjectURL(blob);
        setUrl(previewUrl);
      } catch (err) {
        console.error('Error generating PDF preview:', err);
        setError('Failed to generate PDF preview');
      } finally {
        setLoading(false);
      }
    };

    generatePreview();

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [pdfDocument, templateId, url]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800">
        <p className="text-white">{error}</p>
      </div>
    );
  }

  if (!url) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800">
        <p className="text-white">No preview available</p>
      </div>
    );
  }

  return (
    <iframe
      src={url}
      className="w-full h-full border-0"
      title="PDF Preview"
    />
  );
} 
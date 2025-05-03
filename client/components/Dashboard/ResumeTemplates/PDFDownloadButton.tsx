'use client';

import { ReactElement, useState } from 'react';
import { DocumentProps, pdf } from '@react-pdf/renderer';

interface PDFDownloadButtonProps {
  pdfDocument: ReactElement<DocumentProps>;
  fileName: string;
}

export default function PDFDownloadButton({ pdfDocument, fileName }: PDFDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const blob = await pdf(pdfDocument).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a') as HTMLAnchorElement;
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Generating PDF...' : 'Download PDF'}
    </button>
  );
} 
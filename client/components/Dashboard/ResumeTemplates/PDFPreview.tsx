'use client';

import { ReactElement, useState, useEffect, useRef } from 'react';
import { DocumentProps, pdf, Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ],
});

interface PDFPreviewProps {
  pdfDocument: ReactElement<DocumentProps>;
  templateId: string;
}

export default function PDFPreview({ pdfDocument, templateId }: PDFPreviewProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const blobRef = useRef<Blob | null>(null);

  useEffect(() => {
    let isMounted = true;
    let previewUrl: string | null = null;

    const generatePreview = async () => {
      try {
        setLoading(true);
        setError(null);

        // Initialize PDF renderer
        const pdfInstance = pdf(pdfDocument);
        
        // Create blob with explicit MIME type
        const blob = await pdfInstance.toBlob();
        blobRef.current = blob;
        
        // Create object URL with explicit MIME type
        previewUrl = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

        if (isMounted) {
          setUrl(previewUrl);
        }
      } catch (err) {
        console.error('Error generating PDF preview:', err);
        if (isMounted) {
          setError('Failed to generate PDF preview. Please try refreshing the page.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Wait for fonts to load before generating preview
    const fontLoadPromise = new Promise((resolve) => {
      const checkFonts = () => {
        if (document.fonts.check('12px Roboto')) {
          resolve(true);
        } else {
          setTimeout(checkFonts, 100);
        }
      };
      checkFonts();
    });

    fontLoadPromise.then(() => {
      generatePreview();
    });

    return () => {
      isMounted = false;
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      if (blobRef.current) {
        blobRef.current = null;
      }
    };
  }, [pdfDocument, templateId]);

  // Handle iframe load event
  const handleIframeLoad = () => {
    if (iframeRef.current) {
      try {
        const iframe = iframeRef.current;
        if (iframe.contentWindow) {
          // Force iframe to show content
          iframe.style.height = '100%';
          iframe.style.width = '100%';
        }
      } catch (err) {
        console.error('Error handling iframe load:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-gray-800">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-white">Generating preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-gray-800">
        <div className="text-center p-4">
          <p className="text-white mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (!url) {
    return (
      <div className="w-full h-full min-h-[500px] flex items-center justify-center bg-gray-800">
        <p className="text-white">No preview available</p>
      </div>
    );
  }

  // Create a data URL for the PDF
  const pdfDataUrl = url.startsWith('blob:') ? url : `data:application/pdf;base64,${url}`;

  return (
    <div className="w-full h-full min-h-[500px] bg-gray-800">
      <object
        data={pdfDataUrl}
        type="application/pdf"
        className="w-full h-full"
      >
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-full border-0"
          title="PDF Preview"
          sandbox="allow-same-origin allow-scripts"
          onLoad={handleIframeLoad}
        />
      </object>
    </div>
  );
} 
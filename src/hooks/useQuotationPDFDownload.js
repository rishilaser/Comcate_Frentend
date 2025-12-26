import { useState } from 'react';
import toast from 'react-hot-toast';

/**
 * Custom hook for viewing and downloading quotation PDFs
 * 
 * @returns {Object} - { viewPDF, downloadPDF, downloading, viewing }
 */
const useQuotationPDFDownload = () => {
  const [downloading, setDownloading] = useState(false);
  const [viewing, setViewing] = useState(false);

  const downloadPDF = async (quotationId, quotation) => {
    if (downloading) {
      return;
    }

    setDownloading(true);
    
    try {
      console.log('📄 ===== FRONTEND: PDF DOWNLOAD START =====');
      console.log('📋 Quotation Details:');
      console.log('   - Quotation ID:', quotation?._id || quotationId);
      console.log('   - Quotation Number:', quotation?.quotationNumber);
      
      const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');
      const id = quotation?._id || quotationId;
      const apiPdfUrl = `${apiBaseUrl}/quotation/${id}/pdf?download=true`;
      
      console.log('🌐 Request URL:', apiPdfUrl);
      
      const response = await fetch(apiPdfUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('📥 Response Status:', response.status);
      console.log('📥 Response Headers:', {
        'Content-Type': response.headers.get('Content-Type'),
        'Content-Length': response.headers.get('Content-Length')
      });
      
      if (response.ok) {
        const blob = await response.blob();
        
        console.log('📦 Blob Details:');
        console.log('   - Blob Size:', blob.size, 'bytes');
        console.log('   - Blob Type:', blob.type);
        
        // Validate blob
        if (blob.size === 0) {
          console.error('❌ Blob is empty!');
          toast.error('Downloaded PDF is empty. Please try again.');
          return;
        }
        
        if (blob.type !== 'application/pdf' && !blob.type.includes('pdf')) {
          console.warn('⚠️  Blob type is not PDF:', blob.type);
          const text = await blob.text();
          console.error('Response text:', text);
          try {
            const errorData = JSON.parse(text);
            toast.error(errorData.message || 'Failed to download PDF');
          } catch (e) {
            toast.error('Invalid PDF format received');
          }
          return;
        }
        
        // Validate PDF header
        const arrayBuffer = await blob.slice(0, 4).arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const pdfHeader = String.fromCharCode(...uint8Array);
        console.log('📄 PDF Header:', pdfHeader);
        
        if (pdfHeader !== '%PDF') {
          console.error('❌ Invalid PDF header:', pdfHeader);
          toast.error('Downloaded file is not a valid PDF. Please try again.');
          return;
        }
        
        console.log('✅ PDF is valid, creating download...');
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = quotation?.quotationPdf || `quotation-${quotation?.quotationNumber || id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        console.log('✅ PDF downloaded successfully');
        toast.success('PDF downloaded successfully');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ PDF download error:', errorData);
        toast.error(errorData.message || 'Failed to download PDF');
      }
    } catch (error) {
      console.error('❌ Error downloading PDF:', error);
      toast.error('Failed to download PDF: ' + error.message);
    } finally {
      setDownloading(false);
    }
  };

  const viewPDF = async (quotationId, quotation) => {
    if (viewing) {
      return;
    }

    setViewing(true);
    
    try {
      const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');
      const id = quotation?._id || quotationId;
      const apiPdfUrl = `${apiBaseUrl}/quotation/${id}/pdf`;
      
      const response = await fetch(apiPdfUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        // Clean up the URL after a delay to allow the window to open
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 100);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('PDF view error:', errorData);
        toast.error(errorData.message || 'Failed to view PDF. Please try downloading instead.');
      }
    } catch (error) {
      console.error('Error viewing PDF:', error);
      toast.error('Failed to view PDF. Please try downloading instead.');
    } finally {
      setViewing(false);
    }
  };

  return { viewPDF, downloadPDF, downloading, viewing };
};

export default useQuotationPDFDownload;


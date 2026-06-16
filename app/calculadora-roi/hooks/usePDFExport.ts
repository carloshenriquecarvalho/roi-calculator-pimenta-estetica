import { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

export function usePDFExport() {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const generatePDF = async (clientName: string, equipmentName: string) => {
    if (!reportRef.current) return;
    setIsGenerating(true);
    try {
      // Small delay to ensure any layout shifts are settled
      await new Promise(resolve => setTimeout(resolve, 300));

      const imgData = await htmlToImage.toPng(reportRef.current, {
        quality: 1.0,
        pixelRatio: 2, // High resolution
        backgroundColor: '#121212',
      });
      
      const elementHeight = reportRef.current.offsetHeight;
      const pdfHeight = Math.max(elementHeight, 1123); // At least A4

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [794, pdfHeight]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, 794, elementHeight);
      const fileName = `Proposta-${clientName || 'Cliente'}-${equipmentName || 'Equipamento'}.pdf`;
      pdf.save(fileName.replace(/\s+/g, '-'));
    } catch (error) {
      console.error("Erro ao gerar PDF", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    reportRef,
    generatePDF
  };
}

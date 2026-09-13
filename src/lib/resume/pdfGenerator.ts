import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface PDFExportOptions {
  fileName?: string;
  onProgress?: (percent: number) => void;
}

export async function exportResumeToPDF(
  elementId: string,
  options?: PDFExportOptions
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id '${elementId}' not found`);
  }

  // Set default filename
  const fileName = options?.fileName || "Resume.pdf";
  options?.onProgress?.(15);

  // Temporarily store original styles to ensure pristine rendering
  const originalTransform = element.style.transform;
  const originalTransformOrigin = element.style.transformOrigin;

  try {
    element.style.transform = "none";
    element.style.transformOrigin = "top left";

    options?.onProgress?.(30);

    const canvas = await html2canvas(element, {
      scale: 2.5, // High DPI for crisp vector-like text
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 1200,
    });

    options?.onProgress?.(70);

    const imgData = canvas.toDataURL("image/jpeg", 0.98);

    // A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // If content exceeds 1 page (297mm), split or fit gracefully
    if (pdfHeight <= 297) {
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    } else {
      let position = 0;
      let heightLeft = pdfHeight;

      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= 297;

      while (heightLeft > 0) {
        position = position - 297;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= 297;
      }
    }

    options?.onProgress?.(95);
    pdf.save(fileName);
    options?.onProgress?.(100);
  } finally {
    // Restore element style
    element.style.transform = originalTransform;
    element.style.transformOrigin = originalTransformOrigin;
  }
}

export function printResume(): void {
  window.print();
}

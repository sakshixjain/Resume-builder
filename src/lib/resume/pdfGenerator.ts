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

  const fileName = options?.fileName || "Resume.pdf";
  options?.onProgress?.(15);

  const transformWrapper = document.getElementById("resume-transform-wrapper");
  const originalTransform = transformWrapper?.style.transform || "";
  const originalMargin = transformWrapper?.style.marginBottom || "";

  try {
    // Reset zoom scale temporarily for pixel-perfect 1:1 render
    if (transformWrapper) {
      transformWrapper.style.transform = "none";
      transformWrapper.style.marginBottom = "0px";
    }

    // Wait 100ms for browser layout recalculation
    await new Promise((resolve) => setTimeout(resolve, 100));

    options?.onProgress?.(35);

    const canvas = await html2canvas(element, {
      scale: 2, // 2x DPI for crisp text and graphics
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      windowWidth: 1200,
    });

    options?.onProgress?.(70);

    const imgData = canvas.toDataURL("image/jpeg", 0.98);

    // Standard A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

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
  } catch (err) {
    console.warn("Direct PDF generation error, executing browser print fallback", err);
    window.print();
  } finally {
    if (transformWrapper) {
      transformWrapper.style.transform = originalTransform;
      transformWrapper.style.marginBottom = originalMargin;
    }
  }
}

export function printResume(): void {
  window.print();
}



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
      scale: 2, // 2x scale for sharp output without memory issues
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      windowWidth: 1200,
      ignoreElements: (el) => {
        return (
          el.classList?.contains("no-print") ||
          el.classList?.contains("page-boundary-marker") ||
          el.classList?.contains("page-count-badge")
        );
      },
      onclone: (clonedDoc, clonedElement) => {
        // Sanitize all style tags in the cloned document to prevent oklch color parser crashes in html2canvas
        const styleElements = clonedDoc.querySelectorAll("style");
        styleElements.forEach((styleTag) => {
          try {
            if (styleTag.textContent && /oklch|color-mix|lab\(|lch\(/i.test(styleTag.textContent)) {
              styleTag.textContent = styleTag.textContent
                .replace(/oklch\([^)]+\)/gi, "#1e293b")
                .replace(/color-mix\([^)]+\)/gi, "#64748b")
                .replace(/lab\([^)]+\)/gi, "#0f172a")
                .replace(/lch\([^)]+\)/gi, "#334155");
            }
          } catch {}
        });

        // Ensure cloned element is clean and properly sized
        if (clonedElement) {
          clonedElement.style.transform = "none";
          clonedElement.style.margin = "0 auto";
          clonedElement.style.boxShadow = "none";
          clonedElement.style.display = "block";
          clonedElement.style.position = "static";
        }
      },
    });

    options?.onProgress?.(70);

    // Standard A4 aspect ratio: 297mm / 210mm = 1.4142857
    const a4Ratio = 297 / 210;
    const pageHeightInCanvasPx = Math.floor(canvas.width * a4Ratio);
    const totalPages = Math.max(1, Math.ceil((canvas.height - 5) / pageHeightInCanvasPx));

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    for (let pageIdx = 0; pageIdx < totalPages; pageIdx++) {
      if (pageIdx > 0) {
        pdf.addPage();
      }

      // Create an exact A4 slice canvas for each page
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = pageHeightInCanvasPx;

      const pageCtx = pageCanvas.getContext("2d");
      if (pageCtx) {
        // Pure white background
        pageCtx.fillStyle = "#ffffff";
        pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

        const sourceY = pageIdx * pageHeightInCanvasPx;
        const sourceHeight = Math.min(pageHeightInCanvasPx, canvas.height - sourceY);

        pageCtx.drawImage(
          canvas,
          0,
          sourceY,
          canvas.width,
          sourceHeight,
          0,
          0,
          pageCanvas.width,
          sourceHeight
        );

        const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.98);
        pdf.addImage(pageImgData, "JPEG", 0, 0, 210, 297);
      }
    }

    options?.onProgress?.(95);
    pdf.save(fileName);
    options?.onProgress?.(100);
  } catch (err) {
    console.warn("Direct PDF generation error, executing browser print fallback:", err);
    throw err;
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



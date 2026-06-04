import jsPDF from "jspdf";
import { formatPDFData } from "../hooks/useFormat";

export function downloadSearchPDF({ result, type }) {
  if (!result) return;

  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const marginX = 15;
  const maxWidth = pageWidth - marginX * 2;

  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("MV SEARCH", marginX, y);

  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Resultado da consulta: ${type?.toUpperCase()}`, marginX, y);

  y += 10;

  doc.setDrawColor(16, 185, 129);
  doc.line(marginX, y, pageWidth - marginX, y);

  y += 10;

  const lines = formatPDFData(result);

  lines.forEach((line) => {
    const isTitle = line.trim().endsWith(":") && !line.includes(": ");

    if (isTitle) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      y += 3;
    } else {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
    }

    const wrappedLines = doc.splitTextToSize(line, maxWidth);

    wrappedLines.forEach((wrappedLine) => {
      if (y > pageHeight - 15) {
        doc.addPage();
        y = 20;
      }

      doc.text(wrappedLine, marginX, y);
      y += isTitle ? 7 : 5.5;
    });
  });

  doc.save(`resultado-${type}.pdf`);
}
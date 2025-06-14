// components/NoPrintPdfViewer.tsx
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// point to the worker file
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface NoPrintPdfViewerProps {
  url: string;
}

export default function NoPrintPdfViewer({ url }: NoPrintPdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // disable right-click and print shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // block Ctrl+P (print)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      style={{ userSelect: "none" }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, i) => (
          <Page key={i} pageNumber={i + 1} />
        ))}
      </Document>
    </div>
  );
}

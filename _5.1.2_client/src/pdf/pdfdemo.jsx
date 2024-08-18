import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from "./invoice";
import PdfCard from "./pdfcard";
// Some invoice templates
// https://www.invoicesimple.com/invoice-template

// how to create pdf from react js
// https://dev.to/jaymeeu/how-to-generate-custom-pdf-using-react-and-react-pdf-6d4

function PdfDemo1() {
  return (
    <div>
      <PDFViewer width="1800" height="1000" className="app">
        <Invoice />
      </PDFViewer>
    </div>
  );
}

function PdfDemo() {
  const cards = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gap: "1rem",
    padding: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  };
  return (
    <div>
      <h2 style={{ marginTop: 60, textAlign: "center" }}>List of invoices</h2>
      <div style={cards}>
        <PdfCard title="Oasic ltd Invoice" />
        <PdfCard title="Libra ltd Invoice" />
        <PdfCard title="Xpress ltd Invoice" />
        <PdfCard title="Cardic ltd Invoice" />
      </div>
    </div>
  );
}

export default PdfDemo;

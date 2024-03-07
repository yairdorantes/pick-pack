import { Viewer } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles

const pdfjs = await import("pdfjs-dist/build/pdf");
const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const NewTest = () => {
  return (
    <div>
      zzzkx
      <div>
        <div style={{ width: "100%", height: "800px" }}>
          {/* <Viewer fileUrl={`data:application/pdf;base64,${""}`} /> */}
        </div>
      </div>
    </div>
  );
};

export default NewTest;

// Script.tsx
import { useState, useEffect, useCallback } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import axios from "axios";

// Updated type declarations
interface ScriptData {
    total_scene_groups: number;
    scene_groups: Record<string, Record<string, number[]>>;
    character_scenes?: Record<string, number[]>;
}

const PARASITE_PDF_URL =
  "https://greattakes.s3.us-east-2.amazonaws.com/sk/Parasite.pdf";

const Script = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [outputData, setOutputData] = useState<ScriptData | null>(null);

    // extracted file‐upload logic so we can reuse it
const uploadFile = useCallback(
async (file: File) => {
    setSelectedFile(file);
    const formData = new FormData();
    formData.append("file", file);

    try {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/upload`,
        formData,
        {
        headers: { "Content-Type": "multipart/form-data" },
        }
    );
    setOutputData(response.data);
    } catch (error) {
    console.error("Error uploading file:", error);
    alert("Something went wrong uploading the file.");
    }
},
[setSelectedFile, setOutputData]
);

  // handler for local file chooser
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      uploadFile(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // handler to fetch the remote PDF and process it
  const handleProcessParasitePDF = async () => {
    try {
      // use axios to grab the PDF as a Blob
      const response = await axios.get(PARASITE_PDF_URL, {
        responseType: "blob",
      });
      const blob = response.data as Blob;
  
      // wrap in a File so uploadFile can handle it
      const file = new File([blob], "Parasite.pdf", {
        type: "application/pdf",
      });
  
      await uploadFile(file);
    } catch (error) {
      console.error("Error fetching remote PDF:", error);
      alert(
        "Could not fetch or process remote PDF. " +
          "Make sure the URL is reachable and CORS is enabled on the bucket."
      );
    }
  };

  // handler to open the remote PDF in its own popup window
  const handleViewPDF = () => {
    const newWindow = window.open(
      "",
      "_blank",
      "width=800,height=600,toolbar=0,location=0"
    );
    if (!newWindow) {
      alert("Popup blocked! Please allow popups for this site.");
      return;
    }
    newWindow.document.write(`
      <html>
        <head><title>View PDF</title></head>
        <body style="margin:0">
          <embed
            src="${PARASITE_PDF_URL}"
            type="application/pdf"
            width="100%"
            height="100%"
          />
        </body>
      </html>
    `);
  };

    return (
        <div className="flex flex-col items-center justify-center px-4 py-10">
        <div className="text-lg font-semibold mb-4 text-blue">
          Upload your script as a PDF
        </div>
  
        <label htmlFor="pdfUpload" className="cursor-pointer mb-4">
          <IoCloudUploadOutline size={100} />
        </label>
        <input
          id="pdfUpload"
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />


<div className=" border-t border-gray-300 pt-4">
    <p>See how it works with already existing scripts:</p>
   
    <p className="mt-6 font-[600]">Parasite</p>
    <p className="text-[10px]">Copyright ⓒ Barunson Entertainment & Arts Corp. All Rights Reserved.</p>
<div className="flex space-x-4 p-2 text-xs">
          <button onClick={handleViewPDF} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
            View Script
          </button>

          <button onClick={handleProcessParasitePDF} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500">
            Process Script
          </button>
        </div>
</div>

  
        {selectedFile && (
          <p className="text-sm text-white mb-4">Selected: {selectedFile.name}</p>
        )}
  
        {outputData && <NewTabContent data={outputData} />}
      </div>
    );
  };
const NewTabContent = ({ data }: { data: ScriptData }) => {
    useEffect(() => {
        const newTab = window.open("", "_blank");
        if (!newTab) {
            alert("Popup blocked! Please allow popups for this site.");
            return;
        }

        const doc = newTab.document;
        const style = doc.createElement("style");
        style.innerHTML = `
            body { font-family: Arial, sans-serif; color: #333; padding: 20px; }
            .script-analysis h3 { color: #ff6600; }
            .script-analysis ul { list-style-type: square; padding-left: 1em; }
            .script-analysis li { margin-bottom: 6px; }
            details { margin-bottom: 12px; cursor: pointer; }
        `;
        doc.head.appendChild(style);

        const root = doc.createElement("div");
        root.className = "script-analysis";
        doc.body.appendChild(root);

        root.innerHTML = `
            <h3>Total Scene Locations: ${data.total_scene_groups ?? "N/A"}</h3>
            <details open>
                <summary>Scenes</summary>
                <ul>
                    ${
                        data.scene_groups
                            ? Object.entries(data.scene_groups)
                                  .map(
                                      ([base, timeMap]) =>
                                          `<li><strong>${base}</strong><ul>` +
                                          Object.entries(timeMap)
                                              .map(
                                                  ([time, nums]) =>
                                                      `<li>${time}: ${nums.join(", ")}</li>`
                                              )
                                              .join("") +
                                          `</ul></li>`
                                  )
                                  .join("")
                            : "<li>No scenes found.</li>"
                    }
                </ul>
            </details>
            <details open>
                <summary>Characters</summary>
                <ul>
                    ${
                        data.character_scenes
                            ? Object.entries(data.character_scenes)
                                  .map(
                                      ([character, scenes]) =>
                                          `<li><strong>${character}</strong>: Appears in scenes ${scenes.join(", ")}</li>`
                                  )
                                  .join("")
                            : "<li>No character scenes found.</li>"
                    }
                </ul>
            </details>
        `;
    }, [data]);

    return null;
};

export default Script;

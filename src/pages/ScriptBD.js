import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import ReactDOM from "react-dom";
import axios from "axios";

//style
// import '../components/styleSheets/sk.css';

const ScriptBD = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [outputData, setOutputData] = useState(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);

            // Prepare FormData to send file to backend
            const formData = new FormData();
            formData.append("file", file);

            try {
                // Send file to Python backend
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                // Store response data
                setOutputData(response.data);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    return (
        <div className="content">
            <div style={{ paddingBottom: '2em' }}>
                <label htmlFor="pdfUpload">
                    <IoCloudUploadOutline size={100} className="test" />
                </label>
                <input
                    id="pdfUpload"
                    type="file"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                {selectedFile && <span>{selectedFile.name}</span>}
            </div>

            <div className="txt-gradient-aqua-orange-pink" style={{ fontSize: '1.5em', textTransform: 'uppercase', letterSpacing: '.9px' }}>
                Upload PDF of script
            </div>
            {outputData && <NewTabContent data={outputData} />}
        </div>
    );
};

const NewTabContent = ({ data }) => {
    const newTab = window.open("", "_blank");
    if (newTab) {
        const newTabDocument = newTab.document;

        // Inject CSS directly
        const style = newTabDocument.createElement("style");
        style.innerHTML = `
            body { font-family: Arial, sans-serif; color: #333; padding: 20px; }
            .script-analysis h2 { color: #ff6600; }
            .script-analysis ul { list-style-type: square; }
            .script-analysis li { margin-bottom: 5px; }
            details { margin-bottom: 10px; cursor: pointer; }
        `;
        newTabDocument.head.appendChild(style);

        // Create root div
        const newTabRoot = newTabDocument.createElement("div");
        newTabRoot.className = "script-analysis";
        newTabDocument.body.appendChild(newTabRoot);

        ReactDOM.render(
            <div>
                <h3>Total Scenes: {data.total_scenes}</h3>
                <details open>
                    <summary>Scenes</summary>
                    <ul>
                        {Object.entries(data.scenes).map(([scene, numbers]) => (
                            <li key={scene}><strong>{scene}</strong>: {numbers.join(", ")}</li>
                        ))}
                    </ul>
                </details>
                <details open>
                    <summary>Characters</summary>
                    <ul>
                        {Object.entries(data.character_scenes).map(([character, scenes]) => (
                            <li key={character}><strong>{character}</strong>: Appears in scenes {scenes.join(", ")}</li>
                        ))}
                    </ul>
                </details>
            </div>,
            newTabRoot
        );
    } else {
        alert("Popup blocked! Please allow popups for this site.");
    }
    return null;
};

export default ScriptBD;

import { useState } from "react";

function MultipleCloud() {
  const [files, setFiles] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files);
    } else {
      setFiles([]);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      console.error("No files selected.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }
    console.log(formData);
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/multiple/cloud", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Upload successful", data);

      const previewURLs = data.images.map((file) => file.url);
      setPreviewURLs(previewURLs);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h4>Multiple Cloud</h4>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      <div className="preview-container">
        {previewURLs.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Uploaded ${index}`}
            style={{ width: "200px", margin: "10px" }}
          />
        ))}
      </div>
    </div>
  );
}

export default MultipleCloud;

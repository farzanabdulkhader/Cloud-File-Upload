import { useState } from "react";

function SingleCloud() {
  const [file, setFile] = useState([]);
  const [previewURL, setPreviewURL] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No files selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/api/single/cloud", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Upload successful", data);

      const previewURL = data.image;
      setPreviewURL(previewURL);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h4>Single Cloud</h4>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      <div className="preview-container">
        <img src={previewURL} style={{ width: "200px", margin: "10px" }} />
      </div>
    </div>
  );
}

export default SingleCloud;

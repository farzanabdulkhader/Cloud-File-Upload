import { useState } from "react";

function SingleLocal() {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]); // Use files[0] to get the first file
    } else {
      setFile(null); // Clear file if no file is selected
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

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/single/local`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Upload successful", data);

      const previewURL = data.image;
      setPreviewURL(previewURL);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h4>Single Local</h4>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      <div className="preview-container">
        {previewURL && (
          <img
            src={`http://localhost:3000/${previewURL}`}
            style={{ width: "200px", margin: "10px" }}
          />
        )}
      </div>
    </div>
  );
}

export default SingleLocal;

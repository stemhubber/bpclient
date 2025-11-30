// components/Gallery/UploadForm.js
import React, { useRef } from "react";

export default function UploadForm({ onUpload }) {
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onUpload(files);
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    onUpload(files);
  };

  return (
    <div
      className="upload-drop"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
    >
      <p>Drag & Drop or Click to Upload</p>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFiles}
      />
    </div>
  );
}

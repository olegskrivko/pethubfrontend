import React, { useState } from 'react';

/**
 * Upload Test Component
 * A simple file upload component for testing purposes
 * 
 * @param {Function} onFileSelected - Callback function called when a file is selected
 */
const UploadTest = ({ onFileSelected }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  /**
   * Handles file selection from input
   * @param {Event} event - File input change event
   */
  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file && onFileSelected) {
      onFileSelected(file);
    }
  };

  /**
   * Renders file details or upload instruction
   * @returns {JSX.Element} - File details or instruction message
   */
  const renderFileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate?.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      {renderFileData()}
    </div>
  );
};

export default UploadTest;

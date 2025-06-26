import React, { useState } from 'react';

const UploadTest = ({ onFileSelected }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const onFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file && onFileSelected) {
      onFileSelected(file);
    }
  };
  const fileData = () => {
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
      {fileData()}
    </div>
  );
};

export default UploadTest;

import React, { useRef, useEffect } from 'react';
import '../css/App.css';

function App() {
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.addEventListener('change', handleFileSelect);
    }

    return () => {
      if (fileInputRef.current) {
        fileInputRef.current.removeEventListener('change', handleFileSelect);
      }
    };
  }, []);

  const handleTextClick = () => {
    alert("Text clicked");
  }

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleLinkClick = () => {
    alert("Link clicked");
  }

  // TODO implement more robust checking
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      let filename = selectedFile.name;
      try {
        const ext = filename.split('.').pop().toLowerCase();
        if (!['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(ext)) {
          throw new Error('File is not an image (invalid extension)');
        }

        alert(filename);

      // TODO beautify error
      } catch (error) {
        console.error(error.message);
        return false;
      }
    } else {
      console.log('No file selected');
    }
  }

  const uploadFile = async () => {

  }

  return (
    <div id="sidebar">
      <button id="text" onClick={handleTextClick}>Text</button>
      <form id="uploadFile">
        <input type="file" id="fileInput" ref={fileInputRef} hidden />
      </form>
      <button id="image" onClick={handleImageClick}>Image</button>
      <button id="link" onClick={handleLinkClick}>Link</button>
    </div>
  );
}

export default App;
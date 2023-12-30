import React, { useRef, useEffect, useState } from 'react';
import Image from './Image';
import apiRequest from '../api/clientrequest';
import '../css/App.css';

function Sidebar({ user }) {

    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);

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

    const handleLinkClick = async () => {
        // TODO
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
                } else {
                    uploadImage(selectedFile);
                }

                // TODO beautify error
            } catch (error) {
                console.error(error.message);
                return false;
            }
        } else {
            console.log('No file selected');
        }
    }

    const uploadImage = (newImage) => {
        setImages([...images, newImage]);
        uploadFile(newImage);
    }

    const uploadFile = async (file) => {
        // TODO upload user content
        await apiRequest('POST', '/content/:user', { src: file });
    }

    return (
        <div id="sidebar">
            <button id="text" onClick={handleTextClick}>blah blah boo boo</button>
            <div className="image-list">
                {images.map((image, index) => (
                    <Image key={index} src={image} />
                ))}
            </div>
            <form id="uploadFile">
                <input type="file" id="fileInput" ref={fileInputRef} hidden />
            </form>
            <button id="image" onClick={handleImageClick}>Image</button>
            <button id="link" onClick={handleLinkClick}>Link</button>
        </div>
    );
}

export default Sidebar;
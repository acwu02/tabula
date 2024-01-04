import React, { useRef, useEffect, useState } from 'react';
import apiRequest from '../api/clientrequest';
import Board from './Board';
import Image from './Image';
import '../css/App.css';

const HOST = 'http://localhost:8080/uploads/';

function Content({ user }) {

    const fileInputRef = useRef(null);
    const [elements, setElement] = useState([]);

    useEffect(() => {

        if (fileInputRef.current) {
            fileInputRef.current.addEventListener('change', handleFileSelect);
        }

        if (user) {
            fetchContent(user);
        }

        return () => {
            if (fileInputRef.current) {
                fileInputRef.current.removeEventListener('change', handleFileSelect);
            }
        };

    }, [user]);

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
            uploadImage(selectedFile);
        } else {
            console.error('No file selected');
        }
    }

    const uploadImage = async (newImage) => {
        // const fileData = await loadImageData(newImage);

        // TODO move functionality to board
        const metadata = new FormData();
        metadata.append("file", newImage);
        await apiRequest('POST', `/content/${user.id}/upload/image`, metadata);
        fetchContent();
    }

    const fetchContent = async () => {
        const updatedContent = await apiRequest('GET', `/content/${user.id}`);
        const newElements = updatedContent.response.map(element => ({
            x: element.x,
            y: element.y,
            filename: element.filename
        }));
        setElement(newElements);
    }

    const onSet = async (coords, filename) => {
        await apiRequest('PUT', `/content/${user.id}/update/${filename}`, { newCoords: coords });
    }

    return (
        <div>
            <div id="sidebar">
                <button id="text" onClick={handleTextClick}>blah blah</button>
                <form id="uploadFile" encType="multipart/form-data">
                    <input type="file" name="file" id="fileInput" ref={fileInputRef} hidden />
                </form>
                <button id="image" onClick={handleImageClick}>Image</button>
                <button id="link" onClick={handleLinkClick}>Link</button>
            </div>
            <div id="content">
                <Board elements={elements} onSet={onSet} />
            </div>
        </div>
    );
}

export default Content;
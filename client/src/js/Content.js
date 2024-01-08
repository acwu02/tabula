import React, { useRef, useEffect, useState } from 'react';
import apiRequest from '../api/clientrequest';
import Board from './Board';
import Image from './Image';
import '../css/App.css';

const HOST = 'http://localhost:8080/uploads/';

function Content({ user }) {

    const fileInputRef = useRef(null);
    const [images, setImage] = useState([]);
    const [texts, setText] = useState([]);
    const [imageHeight, setImageHeight] = useState(0);
    const [imageWidth, setImageWidth] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {

        if (fileInputRef.current) {
            fileInputRef.current.addEventListener('change', handleFileSelect);
        }

        if (user) {
            fetchContent(user);
        }

        uploadImage(selectedFile);

        return () => {
            if (fileInputRef.current) {
                fileInputRef.current.removeEventListener('change', handleFileSelect);
            }
        };

    }, [user, imageHeight, imageWidth]);

    const handleTextClick = () => {
        const newText = "";
        uploadText(newText);
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
    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setSelectedFile(selectedFile);
            readFile(e, selectedFile);
            // uploadImage(selectedFile);
        } else {
            console.error('No file selected');
        }
    }

    const readFile = (e, selectedFile, setDimensions) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataURL = e.target.result;
            getImageDimensions(dataURL);
        }
        reader.readAsDataURL(selectedFile);
    }

    const getImageDimensions = (dataURL) => {
        const img = new window.Image();
        img.onload = () => {
            const height = img.naturalHeight;
            const width = img.naturalWidth;
            setImageHeight(height);
            setImageWidth(width);
        };
        img.src = dataURL;
    }

    const uploadImage = async (newImage) => {
        console.log(imageHeight, imageWidth);
        const metadata = new FormData();
        metadata.append("file", newImage);
        metadata.append("height", imageHeight);
        metadata.append("width", imageWidth);
        await apiRequest('POST', `/content/${user.id}/upload/image`, metadata);
        fetchContent();
    }

    const updateText = async (newText) => {
        // await apiRequest('PUT', `/content/${user.id}/update/text`, newText);
    }

    const uploadText = async (text) => {
        await apiRequest('POST', `/content/${user.id}/upload/text`, { text: text });
        fetchContent();
    }

    const fetchContent = async () => {
        // TODO separate retrieval of images and text
        // TODO update fetchContent to include text
        const updatedContent = await apiRequest('GET', `/content/${user.id}`);
        const newImages = updatedContent.response.images.map(image => ({
            x: image.x,
            y: image.y,
            filename: image.filename,
            id: image.image_id,
            height: image.height,
            width: image.width
        }));
        setImage(newImages);
        const newTexts = updatedContent.response.texts.map(text => ({
            x: text.x,
            y: text.y,
            content: text.content,
            id: text.text_id,
            height: text.height,
            width: text.width
        }));
        setText(newTexts);
    }

    const onSetImage = async (coords, filename) => {
        // TODO use id instead of filename?
        await apiRequest('PUT', `/content/${user.id}/image/update-position/${filename}`, { newCoords: coords });
    }

    const onSetText = async (coords, textID) => {
        await apiRequest('PUT', `/content/${user.id}/text/update-position/${textID}`, { newCoords: coords });
    }

    const updateTextContent = async (newText, textID) => {
        await apiRequest('PUT', `/content/${user.id}/text/update-content/${textID}`, { newText: newText });
    }

    const onResizeImage = async (newSize, filename) => {
        await apiRequest('PUT', `/content/${user.id}/image/update-size/${filename}`, { newSize: newSize });
    }

    const onResizeText = async (newSize, textID) => {
        await apiRequest('PUT', `/content/${user.id}/text/update-size/${textID}`, { newSize: newSize });
    }

    return (
        <div>
            <div id="sidebar">
                <button id="text" onClick={handleTextClick}>Text</button>
                <form id="uploadFile" encType="multipart/form-data">
                    <input type="file" name="file" id="fileInput" ref={fileInputRef} hidden />
                </form>
                <button id="image" onClick={handleImageClick}>Image</button>
                <button id="link" onClick={handleLinkClick}>Link</button>
            </div>
            <div id="content">
                <Board
                    images={images}
                    texts={texts}
                    onSetImage={onSetImage}
                    onSetText={onSetText}
                    updateTextContent={updateTextContent}
                    onResizeImage={onResizeImage}
                    onResizeText={onResizeText} />
            </div>
        </div>
    );
}

export default Content;
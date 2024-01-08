import React, { useRef, useEffect, useState } from 'react';
import Image from './Image';
import Text from './Text';
import apiRequest from '../api/clientrequest';
import ResizableComponent from './ResizableComponent';

const HOST = 'http://localhost:8080/uploads/';

function Board({ images, texts, onSetImage, updateTextContent, onSetText, onResizeImage, onResizeText }) {

    return (
        <div id="board">
            <div className="image-list">
                {images.map((image, index) => (
                    <Image
                    key={index}
                    id={image.id}
                    x={image.x}
                    y={image.y}
                    height={image.height}
                    width={image.width}
                    source={`${HOST}${image.filename}`}
                    onSet={onSetImage}
                    onResize={onResizeImage} />
                ))}
            </div>
            <div className="text-list">
                {texts.map((text, index) => (
                    <Text
                    key={index}
                    id={text.id}
                    textContent={text.content}
                    x={text.x}
                    y={text.y}
                    height={text.height}
                    width={text.width}
                    updateTextContent={updateTextContent}
                    onSet={onSetText}
                    onResize={onResizeText} />
                ))}
            </div>
        </div>
    );
}

export default Board;
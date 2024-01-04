import React, { useRef, useEffect, useState } from 'react';
import Image from './Image';
import apiRequest from '../api/clientrequest';

const HOST = 'http://localhost:8080/uploads/';

function Board({ elements, onSet }) {

    return (
        <div className="image-list">
            {elements.map((element, index) => (
                <Image key={index} x={element.x} y={element.y} source={`${HOST}${element.filename}`} onSet={onSet} />
            ))}
        </div>
    );
}

export default Board;
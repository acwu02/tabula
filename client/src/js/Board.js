import React, { useRef, useEffect, useState } from 'react';
import Image from './Image';
import apiRequest from '../api/clientrequest';

function Board({ user, displayContent }) {
    const [content, setContent] = useState([]);

    const addElement = (elem) => {
        setContent([...content, elem]);
    }

    const fetchContent = async () => {
        let content = await apiRequest('GET', '/content/' + user.id);
        displayContent();
    }

    return (
        <div id="content">

        </div>
    );
}

export default Board;
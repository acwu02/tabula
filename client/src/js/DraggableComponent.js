import React, { useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const DraggableComponent = ({ children, onSet, filename, x, y }) => {
    const [position, setPosition] = useState({ x: x, y: y }); // Initialize with initial position (0, 0)
    const nodeRef = useRef(null);

    const handleDrag = (e, ui) => {
        const { x, y } = ui;
        setPosition({ x, y });
    };

    const handleStop = () => {
        onSet(position, filename);
    }

    return (
        <Draggable nodeRef={nodeRef} onDrag={handleDrag} onStop={handleStop} position={position}>
            <div ref={nodeRef}>
                {children}
            </div>
        </Draggable>
    );
};

export default DraggableComponent;
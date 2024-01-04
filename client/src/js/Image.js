import React, { useRef } from 'react';
import DraggableComponent from './DraggableComponent';

const Image = ({ source, onSet, x, y }) => {
  const nodeRef = useRef(null);
  const url = new URL(source);
  const pathname = url.pathname;
  const filename = pathname.split('/').pop();

  return (
    <div>
      <DraggableComponent onSet={onSet} filename={filename} x={x} y={y}>
        <img ref={nodeRef} className="image" src={source} alt="Image" draggable="false" />
      </DraggableComponent>
    </div>
  );
};

export default Image;
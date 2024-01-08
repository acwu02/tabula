import React, { useRef, useState } from 'react';
import DraggableComponent from './DraggableComponent';
import ResizableComponent from './ResizableComponent';

const Image = ({ source, onSet, x, y, height, width, onResize }) => {
  const [imgSize, setImgSize] = useState({ height: height, width: width });
  const nodeRef = useRef(null);

  const url = new URL(source);
  const pathname = url.pathname;
  const filename = pathname.split('/').pop();
  console.log(filename);

  const updateImgSize = (newSize) => {
    setImgSize(newSize);
    onResize(newSize, filename);
  };

  return (
      <DraggableComponent
        onSet={onSet}
        id={filename}
        x={x}
        y={y}
        height={imgSize.height}
        width={imgSize.width}
        style={{
          height: imgSize.height,
          width: imgSize.width
        }}
        >
        <ResizableComponent
          componentSize={imgSize}
          style={{
            height: imgSize.height,
            width: imgSize.width
          }}
          updateImgSize={updateImgSize}>
          <img
            ref={nodeRef}
            className="image"
            src={source}
            alt="Image"
            draggable="false"
            style={{
              height: imgSize.height,
              width: imgSize.width
            }}
          />
        </ResizableComponent>
      </DraggableComponent>
  );
};

export default Image;

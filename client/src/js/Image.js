import React, { useRef, useEffect } from 'react';

const Image = ({ src }) => {
    const handleClick = () => {
        // TODO
        alert("hello");
    }

    return (
        <div>
          <img className="image" onClick={handleClick} src={URL.createObjectURL(src)} />
        </div>
      );
};

export default Image;
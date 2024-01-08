import { useState } from 'react';
import DraggableComponent from './DraggableComponent';

function Link({ text, outgoing, onSet, id, x, y }) {

    // TODO Parse outgoing URL to check https://


    return (
        <DraggableComponent onSet={onSet} id={id} x={x} y={y}>
            <a href={outgoing}>{text}</a>
        </DraggableComponent>
    )
}

export default Link;
import React from 'react';

const ResizingElements = props => {

    const resizer = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
    return (
        <>
            {resizer.map(direction => <li
                key={direction}
                className={`direction ${direction}`}
                onMouseDown={props.resize.bind(this)}
                direction={direction}>
            </li>)}
        </>
    )
}

export default ResizingElements
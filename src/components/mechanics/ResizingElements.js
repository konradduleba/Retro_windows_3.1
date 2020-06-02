import React from 'react';

export default function ResizingElements({ resize }) {

    const resizer = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

    return (
        <>
            {resizer.map(direction => <li
                key={direction}
                className={`direction ${direction}`}
                onMouseDown={resize.bind(this)}
                direction={direction}>
            </li>)}
        </>
    )
}
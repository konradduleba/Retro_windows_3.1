import React from 'react';

const RenderFontList = props => {
    return (
        props.fontList.map(font =>
            <li
                key={font.family}
                onClick={(event) => props.setFontOnClick(event)}
                data-key={font.family}
                data-url={font.files.regular}
            >{font.family}</li>)
    )
}

export default RenderFontList
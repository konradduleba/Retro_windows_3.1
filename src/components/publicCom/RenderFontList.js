import React from 'react';

export default function RenderFontList({ fontList, setFontOnClick }) {
    return (
        fontList.map(font =>
            <li
                key={font.family}
                onClick={event => setFontOnClick(event)}
                data-key={font.family}
                data-url={font.files.regular}
            >{font.family}</li>
        )
    )
}
import React from 'react';

export default function RenderAppIcon({ programList, addToActiveProgram, showOptionsWindow, handleActiveAppOptionWindow }) {
    return (
        programList.map(program => (
            <div
                className="appIcon"
                key={program.name}
                onClick={() => { addToActiveProgram(program.name, program.icon) }}
                onContextMenu={(event) => {
                    showOptionsWindow(event);
                    handleActiveAppOptionWindow(program.name, program.icon);
                }}>
                <img src={program.icon} alt={program.name} />
                <p>{program.name}</p>
            </div>))
    )
}
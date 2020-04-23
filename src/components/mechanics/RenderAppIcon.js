import React from 'react';

const RenderAppIcon = props => {
    return (
        props.programList.map(program => (
            <div onClick={() => { props.addToActiveProgram(program.name, program.icon) }} onContextMenu={(event) => {
                props.showOptionsWindow(event);
                props.handleActiveAppOptionWindow(program.name, program.icon);
            }}
                className="appIcon"
                key={program.name}
            >
                <img src={program.icon} alt={program.name}></img>
                <p>{program.name}</p>
            </div>))
    )
}

export default RenderAppIcon

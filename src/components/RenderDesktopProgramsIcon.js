import React from 'react';

const RenderDesktopProgramsIcon = props => {
    return (
        props.programList.map(program => (<div onClick={() => { props.handlePrograms(`${program.name}`) }}
            className="appIcon"
            key={program.name}
        >
            <img src={program.icon} alt={program.name}></img>
            <p>{program.name}</p>
        </div>))
    )
}

export default RenderDesktopProgramsIcon

import React from 'react';
import ProgramWindow from './ProgramWindow';

const RenderProgramsWindow = props => {
    return (
        <ProgramWindow
            activeProgram={props.activeProgram}
            logo={props.logo}
            handleCloseWindow={props.handleCloseWindow}
            handleMinimalizeApp={props.handleMinimalizeApp} />
    )
}

export default RenderProgramsWindow


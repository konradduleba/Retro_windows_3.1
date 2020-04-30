import RenderAppWindow from './RenderAppWindow';
import React from 'react'

const RenderActiveApp = (props) => {

    const activeApps = props.activeApps

    return (
        activeApps.map(App => <RenderAppWindow
            key={App.name}
            activeProgram={App.name}
            icon={App.icon}
            handleCloseWindow={props.handleCloseWindow}
            handleMinimalizeApp={props.handleMinimalizeApp}
            closeWindow={props.closeWindow}
            addToActiveProgram={props.addToActiveProgram}
            closeOptionsWindow={props.closeOptionsWindow}
            showOptionsWindow={props.showOptionsWindow}
            handleActiveAppOptionWindow={props.handleActiveAppOptionWindow}
            changeFont={props.changeFont}
            actualFont={props.actualFont}
            actualURL={props.actualURL}
        />)
    )
}

export default RenderActiveApp
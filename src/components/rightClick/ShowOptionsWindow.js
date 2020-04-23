import React from 'react'
import BarOptionsWindow from './BarOptionsWindow'
import AppOptionsWindow from './AppOptionsWindow'

import '../../styles/ShowOptionsWindow.scss'

const ShowOptionsWindow = props => {
    const { optionsType } = props.properties;
    if (optionsType === 'bar') {
        return (
            <BarOptionsWindow
                properties={props.properties}
                closeOptionsWindow={props.closeOptionsWindow}
                handleCloseWindow={props.handleCloseWindow}
                handleMinimalizeApp={props.handleMinimalizeApp}
                maximize={props.maximize}
                closeWindow={props.closeWindow}
            />
        )
    }
    else if (optionsType === 'app') {
        return (
            <AppOptionsWindow
                properties={props.properties}
                closeOptionsWindow={props.closeOptionsWindow}
                addToActiveProgram={props.addToActiveProgram}
                activeAppOptionWindow={props.activeAppOptionWindow}
                handleCloseWindow={props.handleCloseWindow}
            />
        )
    }
}

export default ShowOptionsWindow
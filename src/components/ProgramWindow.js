import React from 'react';
import '../styles/ProgramWindow.scss'
import ProgramManager from './ProgramManager'
import NavBar from './NavBar'

const ProgramWindow = props => {
    return (
        <section className="programWindow">
            <div className="container">
                <NavBar
                    name={props.activeProgram}
                    logo={props.logo}
                    handleCloseWindow={props.handleCloseWindow}
                    handleMinimalizeWindow={props.handleMinimalizeApp} />
                {props.activeProgram === "Program Manager" ? <ProgramManager
                    handleMinimalizeApp={props.handleMinimalizeApp} /> : null}
            </div>
        </section>
    )
}

export default ProgramWindow
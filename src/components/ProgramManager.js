import React from 'react';
import '../styles/ProgramManager.scss'
import RenderDesktopProgramsIcon from './RenderDesktopProgramsIcon'
import RenderProgramsWindow from './RenderProgramsWindow'
import LogoClock from '../img/clock.png';
import LogoCalculator from '../img/calculator.png';
import LogoControlPanel from '../img/controlPanel.png';
import LogoDate from '../img/date.png';
import LogoInternet from '../img/internet.jpg';

class ProgramManager extends React.Component {

    state = {
        PMListProgram: [{
            name: 'Clock',
            icon: LogoClock,
        },
        {
            name: 'Calculator',
            icon: LogoCalculator,
        },
        {
            name: 'Control Panel',
            icon: LogoControlPanel,
        },
        {
            name: 'Date',
            icon: LogoDate,
        },
        {
            name: 'Internet',
            icon: LogoInternet,
        }],
        activeProgram: ""
    }

    handlePrograms = (name) => {
        this.setState({
            activeProgram: name
        })
    }

    handleCloseWindow = () => {
        this.setState({
            activeProgram: ""
        })
    }

    checkLogo = () => {
        if (this.state.activeProgram === 'Clock') return LogoClock
        if (this.state.activeProgram === 'Calculator') return LogoCalculator
        if (this.state.activeProgram === 'Control Panel') return LogoControlPanel
        if (this.state.activeProgram === 'Date') return LogoDate
        if (this.state.activeProgram === 'Internet') return LogoInternet
    }

    render() {
        return (
            <>
                <div className="appList">
                    <RenderDesktopProgramsIcon programList={this.state.PMListProgram} handlePrograms={(value) => {
                        this.handlePrograms(value)
                    }} />
                </div>
                {this.state.activeProgram === "" ? null :
                    <RenderProgramsWindow
                        activeProgram={this.state.activeProgram}
                        handleCloseWindow={(value) => {
                            this.handleCloseWindow(value)
                        }}
                        logo={this.checkLogo()}
                        handleMinimalizeApp={this.props.handleMinimalizeApp} />}
            </>
        )
    }
}

export default ProgramManager
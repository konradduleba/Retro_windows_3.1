import React from 'react';
import '../styles/ProgramManager.scss'
import RenderAppIcon from './RenderAppIcon'

import IconClock from '../img/clock.png';
import IconCalculator from '../img/calculator.png';
import IconControlPanel from '../img/controlPanel.png';
import IconDate from '../img/date.png';
import IconInternet from '../img/internet.jpg';

class ProgramManager extends React.Component {

    state = {
        PMAppList: [{
            name: 'Clock',
            icon: IconClock,
        },
        {
            name: 'Calculator',
            icon: IconCalculator,
        },
        {
            name: 'Control Panel',
            icon: IconControlPanel,
        },
        {
            name: 'Date',
            icon: IconDate,
        },
        {
            name: 'Internet',
            icon: IconInternet,
        }],
    }

    checkIcon = () => {
        if (this.state.activeProgram === 'Clock') return IconClock
        if (this.state.activeProgram === 'Calculator') return IconCalculator
        if (this.state.activeProgram === 'Control Panel') return IconControlPanel
        if (this.state.activeProgram === 'Date') return IconDate
        if (this.state.activeProgram === 'Internet') return IconInternet
    }

    render() {
        return (
            <>
                <div className="appList">
                    <RenderAppIcon
                        programList={this.state.PMAppList}
                        addToActiveProgram={this.props.addToActiveProgram}
                        closeOptionsWindow={this.props.closeOptionsWindow}
                        showOptionsWindow={this.props.showOptionsWindow}
                        handleActiveAppOptionWindow={this.props.handleActiveAppOptionWindow}
                        handleCloseWindow={this.props.handleCloseWindow}
                    />
                </div>
            </>
        )
    }
}

export default ProgramManager
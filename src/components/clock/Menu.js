import React from 'react';

class Menu extends React.Component {

    state = {
        analogTic: false,
        digitalTic: true,
        secondsTic: true,
        dateTic: true,
    }

    componentDidMount() {
        const { analogTic, digitalTic, secondsTic, dateTic } = this.props.properties
        this.setState({
            analogTic,
            digitalTic,
            secondsTic,
            dateTic
        })
    }

    render() {
        return (

            <div className="clockMenu">
                <ul>
                    <li onClick={() => {
                        this.props.handleTic('analog');
                        this.props.changeClockType('analog');
                        this.props.handleMenu();
                        if (this.props.properties.dateTic) {
                            this.props.showAnalogTime();
                        }
                        else this.props.closeAnalogTime();

                        this.props.handleActiveClockType('analog')
                    }}>
                        <i className={this.state.analogTic ? "icon-check" : null}></i>
                        <p>Analog</p>
                    </li>
                    <li className="line" onClick={() => {
                        this.props.handleTic('digital');
                        this.props.changeClockType('digital')
                        this.props.handleMenu();
                        this.props.closeAnalogTime();
                        this.props.handleActiveClockType('digital')
                    }}>
                        <i className={this.state.digitalTic ? "icon-check" : null}></i>
                        <p>Digital</p>
                    </li>
                    <li className="line" onClick={() => {
                        this.props.toggleShowSetFont();
                        this.props.handleMenu();
                    }}>
                        <i className=""></i>
                        <p>Set Font...</p>
                    </li>
                    <li className="line" onClick={() => {
                        this.props.handleNoTitle();
                        this.props.handleMenu();
                        this.props.toggleShowTitle();
                    }}>
                        <i className=""></i>
                        <p>No Title</p>
                    </li>
                    <li onClick={() => {
                        this.props.handleTic('seconds');
                        this.props.handleMenu();
                    }}>
                        <i className={this.state.secondsTic ? "icon-check" : null}></i>
                        <p>Seconds</p>
                    </li>
                    <li className="line" onClick={() => {
                        this.props.handleTic('date');
                        this.props.handleMenu();
                        this.props.handleAnalogTime('analog');
                    }}>
                        <i className={this.state.dateTic ? "icon-check" : null}></i>
                        <p>Date</p>
                    </li>
                    <li onClick={() => {
                        this.props.toggleShowAboutProgram();
                        this.props.handleMenu();
                    }}>
                        <i className=""></i>
                        <p>About Clock...</p>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Menu
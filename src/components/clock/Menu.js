import React from 'react';
import ClockIcon from '../../img/clock.png'
import { CheckOutlined } from '@ant-design/icons';

class Menu extends React.Component {

    state = {
        analogTic: false,
        digitalTic: true,
        secondsTic: true,
        dateTic: true,
    }

    componentDidMount() {
        const { analogTic, digitalTic, secondsTic, dateTic } = this.props.properties;
        this.setState({ analogTic, digitalTic, secondsTic, dateTic })
    }

    render() {

        const { properties, handleAnalogTime, handleTic, handleNoTitle, changeClockType, handleMenu, showAnalogTime, closeAnalogTime, handleActiveClockType, addToActiveProgram, toggleShowTitle } = this.props;
        const { analogTic, digitalTic, secondsTic, dateTic } = this.state;
        return (

            <div className="clockMenu">
                <ul>
                    <li onClick={() => {
                        handleTic('analog');
                        changeClockType('analog');
                        handleMenu();
                        if (properties.dateTic) {
                            showAnalogTime();
                        }
                        else closeAnalogTime();

                        handleActiveClockType('analog')
                    }}>
                        {analogTic ? <CheckOutlined /> : <i className=""></i>}
                        <p>Analog</p>
                    </li>
                    <li className="line" onClick={() => {
                        handleTic('digital');
                        changeClockType('digital')
                        handleMenu();
                        closeAnalogTime();
                        handleActiveClockType('digital')
                    }}>
                        {digitalTic ? <CheckOutlined /> : <i className=""></i>}
                        <p>Digital</p>
                    </li>
                    <li className="line" onClick={() => {
                        addToActiveProgram('SetFont', ClockIcon);
                        handleMenu();
                    }}>
                        <i className=""></i>
                        <p>Set Font...</p>
                    </li>
                    <li className="line" onClick={() => {
                        handleNoTitle();
                        handleMenu();
                        toggleShowTitle();
                    }}>
                        <i className=""></i>
                        <p>No Title</p>
                    </li>
                    <li onClick={() => {
                        handleTic('seconds');
                        handleMenu();
                    }}>
                        {secondsTic ? <CheckOutlined /> : <i className=""></i>}
                        <p>Seconds</p>
                    </li>
                    <li className="line" onClick={() => {
                        handleTic('date');
                        handleMenu();
                        handleAnalogTime('analog');
                    }}>
                        {dateTic ? <CheckOutlined /> : <i className=""></i>}
                        <p>Date</p>
                    </li>
                    <li onClick={() => {
                        addToActiveProgram('About Clock', ClockIcon)
                        handleMenu();
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
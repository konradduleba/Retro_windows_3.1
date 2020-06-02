import React from 'react';

class AnalogClock extends React.Component {

    state = {
        hour: '',
        minute: '',
        second: '',
    }

    checkTime = () => {
        const date = new Date();
        this.setState({
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        })
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.checkTime();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    moveArrow = value => {
        const { hour, minute, second } = this.state
        if (value === 'h') return { transform: `translate(-50%, 0) rotate(${hour * 30}deg)` }
        else if (value === 'm') return { transform: `translate(-50%, 0) rotate(${minute}deg)` }
        else if (value === 's') return { transform: `translate(-50%, 0) rotate(${second * 6}deg)` }
    }

    render() {

        const { secondsTic } = this.props.properties
        return (
            <>
                <article className="clock">
                    <div className="hours-container">
                        <div className="hours" style={this.moveArrow('h')}></div>
                    </div>
                    <div className="minutes-container">
                        <div className="minutes" style={this.moveArrow('m')}></div>
                    </div>
                    {secondsTic && <div className="seconds-container">
                        <div className="seconds" style={this.moveArrow('s')}></div>
                    </div>}
                </article>
            </>
        )
    }
}

export default AnalogClock
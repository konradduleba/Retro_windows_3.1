import React from 'react';

class DigitalClock extends React.Component {

    state = {
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
        second: '',
    }

    checkTime = () => {
        const date = new Date();
        this.setState({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
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

    checkSeconds = value => {
        const { secondsTic, dateTic } = this.props.properties;
        const { year, month, day, second } = this.state;

        if (value === 'second')
            if (secondsTic)
                return (
                    <>
                        <span>:</span>
                        {second < 10 ? `0${second}` : second}
                    </>
                )
            else return null
        else if (value === 'date')
            if (dateTic)
                return (
                    <>
                        {day}
                        <span>/</span>
                        {month}
                        <span>/</span>
                        {year}
                    </>
                )
            else return null
    }



    render() {
        const { hour, minute } = this.state;
        return (
            <>
                <p>
                    {hour % 12 ? hour % 12 : '12'}
                    <span>:</span>
                    {minute < 10 ? `0${minute}` : minute}
                    {this.checkSeconds('second')}
                    <span></span>
                    {hour < 13 ? "AM" : "PM"}
                </p>
                <p>
                    {this.checkSeconds('date')}
                </p>
            </>
        )
    }
}

export default DigitalClock
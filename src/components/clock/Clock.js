import React from 'react';
import Menu from './Menu';
import DigitalClock from './DigitalClock';
import AnalogClock from './AnalogClock';
import AboutProgram from '../publicCom/AboutProgram'
import SetFont from '../publicCom/SetFont'

import '../../styles/Clock.scss';

class Clock extends React.Component {

    state = {
        menu: false,
        visibility: false,
        clockType: 'digital',
        analogTic: false,
        digitalTic: true,
        secondsTic: true,
        dateTic: true,
        noTitle: false,
        aboutProgram: false,
        setFont: false,
        fontFamily: null,
        fontURL: null
    }

    handleMenu = () => {
        this.setState({
            menu: !this.state.menu,
            visibility: !this.state.visibility
        })
    }

    changeClockType = type => this.setState({ clockType: type })

    handleTic = value => {
        if (value === 'analog') this.setState({ analogTic: true, digitalTic: false })
        if (value === 'digital') this.setState({ analogTic: false, digitalTic: true })
        if (value === 'seconds') this.setState({ secondsTic: !this.state.secondsTic })
        if (value === 'date') this.setState({ dateTic: !this.state.dateTic })
    }

    toggleShowTitle = () => this.setState({ noTitle: !this.state.noTitle })
    toggleShowAboutProgram = () => this.setState({ aboutProgram: !this.state.aboutProgram })
    toggleShowSetFont = () => this.setState({ setFont: !this.state.setFont })
    changeFontFamily = (fontName, fontURL) => {
        this.setState({ fontFamily: `${fontName}`, fontURL })
    }

    render() {

        const style = {
            top: 1,
            height: `calc(100% - 1px)`
        }

        const { menu, clockType, noTitle, aboutProgram, setFont } = this.state;
        return (
            <>
                <section className='clockContainer' onDoubleClick={() => {
                    this.props.handleNoTitle();
                    this.toggleShowTitle();
                }}
                    style={noTitle ? style : null}
                >

                    {!noTitle ? (
                        <nav className='clockNavigation'>
                            <p onClick={this.handleMenu}>Settings</p>
                        </nav>
                    )
                        : null
                    }


                    <div>
                        {menu ?
                            <Menu
                                changeClockType={type => this.changeClockType(type)}
                                handleMenu={this.handleMenu}
                                handleTic={value => this.handleTic(value)}
                                toggleShowTitle={this.toggleShowTitle}
                                properties={this.state}
                                handleNoTitle={this.props.handleNoTitle}
                                showAnalogTime={this.props.showAnalogTime}
                                closeAnalogTime={this.props.closeAnalogTime}
                                handleAnalogTime={this.props.handleAnalogTime}
                                handleActiveClockType={this.props.handleActiveClockType}
                                toggleShowAboutProgram={this.toggleShowAboutProgram}
                                toggleShowSetFont={this.toggleShowSetFont}
                            />
                            : null}
                        <aside onClick={this.handleMenu} style={{ visibility: `${this.state.visibility ? 'visible' : 'hidden'}` }}></aside>
                    </div>

                    <div className='datePlace'
                        style={noTitle ? { height: `${style.height}`, fontFamily: `${this.state.fontFamily}` } :
                            { fontFamily: `${this.state.fontFamily}` }}>
                        {clockType === 'digital' ?
                            <DigitalClock
                                properties={this.state}
                            />
                            :
                            <AnalogClock
                                properties={this.state}
                            />
                        }
                    </div>
                </section>
                {aboutProgram ?
                    <AboutProgram
                        properties={this.props.properties}
                        type={this.state.clockType}
                        toggleShowAboutProgram={this.toggleShowAboutProgram}
                    /> : null}

                {setFont ?
                    <SetFont
                        properties={this.props.properties}
                        actualFont={this.state.fontFamily}
                        actualURL={this.state.fontURL}
                        toggleShowSetFont={this.toggleShowSetFont}
                        changeFontFamily={(fontName, fontURL) => this.changeFontFamily(fontName, fontURL)}
                    /> : null}
            </>
        )
    }
}

export default Clock;
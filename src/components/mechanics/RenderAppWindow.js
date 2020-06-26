import React from 'react';
import NavBar from '../visual/NavBar'
import ResizingElements from './ResizingElements'
import Clock from '../clock/Clock'
import Calculator from '../calculator/Calculator'
import SetFont from '../publicCom/SetFont'
import Help from '../publicCom/Help'
import RenderIconsInWindow from '../mechanics/RenderIconsInWindow'
import New from '../program manager/New'
import ProgramGroupProperties from '../program manager/ProgramGroupProperties'
import ProgramItemsProperties from '../program manager/ProgramItemsProperties'
import InvalidPath from '../program manager/InvalidPath'
import ProgramItemsBrowse from '../program manager/Browse'
import ChangeIconPM from '../program manager/ChangeIcon'
import Open from '../program manager/Open'

import '../../styles/RenderAppWindow.scss'
import '../../styles/PMessentials.scss'
import AboutProgram from '../publicCom/AboutProgram';


class RenderAppWindow extends React.Component {

    state = {
        left: 10,
        top: 10,
        width: "",
        height: "",
        noTitle: false,
        analogTime: false,
        activeClockType: 'digital',
    }

    isResizing = false;
    element;

    mousedown = e => {
        const screen = document.querySelector('.wrapper')
        const parametres = screen.getBoundingClientRect()

        let prevX = e.clientX;
        let prevY = e.clientY;

        let top = this.element.top;
        let left = this.element.left;

        const mousemove = (e) => {
            if (!this.isResizing) {
                let newX = prevX - e.clientX + parametres.left;
                let newY = prevY - e.clientY + parametres.top;

                let newValueLeft = left - newX + "px";
                let newValueTop = top - newY + "px";

                this.setState({
                    left: newValueLeft,
                    top: newValueTop,
                    borderRadius: 1
                })
            }
        }

        const mouseup = () => {
            screen.removeEventListener("mousemove", mousemove);
            screen.removeEventListener("mouseup", mouseup);
        }

        screen.addEventListener("mousemove", mousemove);
        screen.addEventListener("mouseup", mouseup);

    }

    mousedownResize = e => {
        let direction = e.target.attributes.getNamedItem('direction').value

        const screen = document.querySelector('.wrapper')
        // const window = document.querySelector('.programWindow')
        const screenValues = screen.getBoundingClientRect()
        // const windowValues = window.getBoundingClientRect()
        const windowValues = this.element
        // console.log(this.element.y, windowValues.top)

        const mousemove = (e) => {
            const data = { direction, screenValues, windowValues, e }

            this.resizeWindow(data);
        }

        function mouseup() {
            screen.removeEventListener("mousemove", mousemove);
            screen.removeEventListener("mouseup", mouseup);
            this.isResizing = false;
        }

        screen.addEventListener("mousemove", mousemove);
        screen.addEventListener("mouseup", mouseup);
    }

    resizeWindow = data => {

        const { windowValues, screenValues, e, direction } = data;

        const windowTopPosition = windowValues.y - screenValues.top;
        const windowLeftPosition = windowValues.x - screenValues.left;
        const cursorTopPosition = e.clientY - screenValues.top;
        const cursorLeftPosition = e.clientX - screenValues.left;

        const northHeight = windowValues.height + (windowTopPosition - cursorTopPosition);
        const southHeight = cursorTopPosition - windowTopPosition;
        const eastWidth = cursorLeftPosition - windowLeftPosition;
        const westWidth = windowValues.width + (windowLeftPosition - cursorLeftPosition)

        if (direction === 'n') {
            if (this.checkCanResize(northHeight, 251)) this.setState({ height: northHeight, top: cursorTopPosition, borderRadius: 1 })
        }
        else if (direction === 'ne') {
            if (this.checkCanResize(northHeight, eastWidth)) this.setState({ height: northHeight, width: eastWidth, top: cursorTopPosition, borderRadius: 1 })
        }
        else if (direction === 'e') {
            if (this.checkCanResize(251, eastWidth)) this.setState({ width: eastWidth, borderRadius: 1 })
        }
        else if (direction === 'se') {
            if (this.checkCanResize(southHeight, eastWidth)) this.setState({ height: southHeight, width: eastWidth, borderRadius: 1 })
        }
        else if (direction === 's') {
            if (this.checkCanResize(southHeight, 251)) { this.setState({ height: southHeight, borderRadius: 1 }) }
        }
        else if (direction === 'sw') {
            if (this.checkCanResize(southHeight, westWidth)) { this.setState({ height: southHeight, width: westWidth, left: cursorLeftPosition, borderRadius: 1 }) }
        }
        else if (direction === 'w') {
            if (this.checkCanResize(251, westWidth)) this.setState({ width: westWidth, left: cursorLeftPosition, borderRadius: 1 })
        }
        else if (direction === 'nw') {
            if (this.checkCanResize(northHeight, westWidth)) {
                this.setState({ height: northHeight, width: westWidth, left: cursorLeftPosition, top: cursorTopPosition, borderRadius: 1 })
            }
        }

    }

    checkCanResize = (height, width) => {
        if (width > 250 && height > 250)
            return true;
        else return false
    }

    showCurrentApp = name => {
        const clickedApps = document.querySelectorAll('.programWindow');
        for (let app of clickedApps) {
            app.style.zIndex = 2;
        }
        name = name.replace(/ /g, '');
        const activeApp = document.querySelector(`.programWindow.${name}`)
        activeApp.style.zIndex = 5;
    }

    maximize = () => {
        this.setState({
            left: 3,
            top: 3,
            width: 'calc(100% - 6px)',
            height: 'calc(100% - 6px)',
            borderRadius: 0
        })
    }
    handleNoTitle = () => this.setState({ noTitle: !this.state.noTitle })
    showAnalogTime = () => this.setState({ analogTime: true })
    handleAnalogTime = () => this.setState({ analogTime: !this.state.analogTime })
    closeAnalogTime = () => this.setState({ analogTime: false })
    handleActiveClockType = value => this.setState({ activeClockType: `${value}` })

    runProgram = ProgramName => {
        const { activeProgram: name, icon, addedPrograms } = this.props;
        if (ProgramName === 'Clock') return <Clock
            {...this.props}
            handleNoTitle={() => this.handleNoTitle()}
            showAnalogTime={() => this.showAnalogTime()}
            closeAnalogTime={() => this.closeAnalogTime()}
            handleAnalogTime={() => this.handleAnalogTime()}
            handleActiveClockType={value => this.handleActiveClockType(value)}
            properties={{ name: name, icon: icon }}
        />
        else if (ProgramName === 'Calculator') return <Calculator
            {...this.props}
            properties={{ name, icon }}
        />
        else if (ProgramName === 'Calculator Help') return <Help />
        else if (ProgramName === 'About Clock') return <AboutProgram
            {...this.props}
            properties={{ name: 'Clock', icon }}
        />
        else if (ProgramName === 'About Calculator') return <AboutProgram
            {...this.props}
            properties={{ name: 'Calculator', icon }}
        />
        else if (ProgramName === 'SetFont') return <SetFont {...this.props} />
        else if (ProgramName === 'Accessories') return <RenderIconsInWindow
            {...this.props}
            type="accessories"
        />
        else if (ProgramName === 'Games') return <RenderIconsInWindow
            {...this.props}
            type="games"
        />
        else if (ProgramName === 'StartUp') return <RenderIconsInWindow
            {...this.props}
            type="startup"
        />
        else if (ProgramName === 'About Program Manager') return <AboutProgram
            {...this.props}
            properties={{ name: 'Program Manager', icon }}
        />
        else if (ProgramName === 'Microsoft Visual Basic') return <RenderIconsInWindow
            {...this.props}
            type="microsoft visual basic"
        />
        else if (ProgramName === 'Main') return <RenderIconsInWindow
            {...this.props}
            type="main"
        />
        else if (ProgramName === 'Program Manager') return <RenderIconsInWindow
            {...this.props}
            type="programManager"
        />
        else if (ProgramName === 'Control Panel') return <RenderIconsInWindow
            {...this.props}
            type="controlPanel"
        />
        else if (ProgramName === 'New Program Object') return <New
            {...this.props}
        />
        else if (ProgramName === 'Program Group Properties') return <ProgramGroupProperties
            {...this.props}
        />
        else if (ProgramName === 'Program Items Properties') return <ProgramItemsProperties
            {...this.props}
        />
        else if (ProgramName === 'Invalid Path') return <InvalidPath
            {...this.props}
            type='invalidPath'
        />
        else if (ProgramName === 'Program Items Browse') return <ProgramItemsBrowse
            {...this.props}
        />
        else if (ProgramName === 'Change Icon') return <ChangeIconPM
            {...this.props}
        />
        else if (ProgramName === 'Run') return <Open
            {...this.props}
            type='run'
        />
        else if (ProgramName === 'Delete') return <Open
            {...this.props}
            type='delete'
        />
        else if (ProgramName === 'Move') return <Open
            {...this.props}
            type='move'
            program='move'
        />
        else if (ProgramName === 'Copy') return <Open
            {...this.props}
            type='move'
            program='copy'
        />
        else if (ProgramName === 'Wrong Program Name') return <InvalidPath
            {...this.props}
            type="programName"
        />
        else if (ProgramName === 'Wrong Directory Name') return <InvalidPath
            {...this.props}
            type="dirName"
        />
        else if (addedPrograms.filter(program => program.name === ProgramName)) return <RenderIconsInWindow
            {...this.props}
            type={ProgramName}
        />

    }

    render() {
        const { activeProgram: name, icon } = this.props;
        const { top, left, analogTime, activeClockType } = this.state;
        const navBarProperties = { name, icon, top, left, analogTime, activeClockType }

        return (
            <section className={`programWindow ${name.replace(/ /g, '')}`} ref={el => {
                if (el !== null) this.element = el.getBoundingClientRect()
            }}
                style={this.state}
                onClick={() => this.showCurrentApp(name)}>
                <ul className="resizingElements">
                    <ResizingElements resize={event => this.mousedownResize(event)} />
                </ul>
                <div className="container">
                    {!this.state.noTitle &&
                        <NavBar
                            {...this.props}
                            properties={navBarProperties}
                            moveWindow={value => { this.mousedown(value) }}
                            showCurrentApp={name => { this.showCurrentApp(name) }}
                            maximize={this.maximize}
                        />
                    }

                    {this.runProgram(name)}
                </div>
            </section>
        )
    }
}

export default RenderAppWindow
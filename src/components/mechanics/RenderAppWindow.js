import React from 'react';
import ProgramManager from '../ProgramManager';
import NavBar from '../visual/NavBar'
import ResizingElements from './ResizingElements'
import Clock from '../clock/Clock'

import '../../styles/RenderAppWindow.scss'

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
    handleActiveClockType = value => {
        this.setState({ activeClockType: `${value}` })
    }

    runProgram = name => {
        if (name === 'Clock') return <Clock
            handleNoTitle={() => this.handleNoTitle()}
            showAnalogTime={() => this.showAnalogTime()}
            closeAnalogTime={() => this.closeAnalogTime()}
            handleAnalogTime={() => this.handleAnalogTime()}
            handleActiveClockType={value => this.handleActiveClockType(value)}
            properties={{ name: this.props.activeProgram, icon: this.props.icon }}
        />
    }

    render() {
        const navBarProperties = {
            name: this.props.activeProgram,
            icon: this.props.icon,
            top: this.state.top,
            left: this.state.left,
            analogTime: this.state.analogTime,
            activeClockType: this.state.activeClockType
        }
        return (
            <section className={`programWindow ${this.props.activeProgram.replace(/ /g, '')}`} ref={(el) => {
                if (el !== null) this.element = el.getBoundingClientRect()
            }}
                style={this.state} onClick={(name) => this.showCurrentApp(this.props.activeProgram)}>
                <ul className="resizingElements">
                    <ResizingElements resize={(event) => this.mousedownResize(event)} />
                </ul>
                <div className="container">
                    {!this.state.noTitle ?
                        <NavBar
                            properties={navBarProperties}
                            handleCloseWindow={this.props.handleCloseWindow}
                            handleMinimalizeApp={this.props.handleMinimalizeApp}
                            closeWindow={this.props.closeWindow}
                            addToActiveProgram={this.props.addToActiveProgram}
                            showOptionsWindow={this.props.showOptionsWindow}
                            handleActiveAppOptionWindow={this.props.handleActiveAppOptionWindow}
                            moveWindow={value => { this.mousedown(value) }}
                            showCurrentApp={name => { this.showCurrentApp(name) }}
                            maximize={this.maximize}
                        />
                        : null
                    }


                    {this.runProgram(this.props.activeProgram)}

                    {this.props.activeProgram === "Program Manager" ?
                        <ProgramManager
                            handleMinimalizeApp={this.props.handleMinimalizeApp}
                            addToActiveProgram={this.props.addToActiveProgram}
                            closeOptionsWindow={this.props.closeOptionsWindow}
                            showOptionsWindow={this.props.showOptionsWindow}
                            handleActiveAppOptionWindow={this.props.handleActiveAppOptionWindow}
                            handleCloseWindow={this.props.handleCloseWindow}
                        /> : null}
                </div>
            </section>
        )
    }
}

export default RenderAppWindow
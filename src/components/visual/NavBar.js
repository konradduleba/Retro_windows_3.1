import React from 'react';
import { CloseOutlined, MinusOutlined } from '@ant-design/icons';
import ShowOptionsWindow from '../rightClick/ShowOptionsWindow';
import { ProgramsWithoutExit } from '../utils/navBarSettings'

class NavBar extends React.Component {

    state = {
        visible: 'hidden',
        top: 0,
        left: 0
    }

    showOptionsWindow = e => {
        const screen = document.querySelector('.wrapper');
        const parametres = screen.getBoundingClientRect()

        if (e.type === 'contextmenu') {
            e.preventDefault();
            const top = e.clientY - (parseInt(this.props.properties.top.toString().replace('px', '')) + parametres.top);
            const left = e.pageX - (parseInt(this.props.properties.left.toString().replace('px', '')) + parametres.left);
            this.setState({
                visible: 'visible',
                top,
                left
            })
        }
    }

    closeOptionsWindow = () => {
        this.setState({
            visible: 'hidden'
        })
    }

    checkTime = () => {
        const date = new Date();
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    checkProgramVisibility = name => ProgramsWithoutExit.includes(name)

    render() {
        const { moveWindow, showCurrentApp, properties, closeDesktopProgram, minimalizeApp, closeActiveProgram } = this.props;
        const { name, icon, analogTime, activeClockType } = properties;
        const { top, left, visible } = this.state;
        const showOptionsProperties = { name, icon, top, left, optionsType: 'bar' }
        return (
            <div className="navBar" onMouseDown={moveWindow.bind(this)}>
                {visible !== 'hidden' && <ShowOptionsWindow
                    {...this.props}
                    properties={showOptionsProperties}
                    closeOptionsWindow={this.closeOptionsWindow}
                />}
                {this.checkProgramVisibility(name) ?
                    <>
                        <button onClick={() => closeActiveProgram(name)}>
                            <MinusOutlined />
                        </button>
                        <p
                            onMouseDown={() => {
                                showCurrentApp(name);
                                this.closeOptionsWindow()
                            }}
                            onClick={() => this.closeOptionsWindow()}>{name}{(analogTime && activeClockType === 'analog') && ` - ${this.checkTime()}`}
                        </p>
                    </>
                    :
                    <>
                        <button onClick={() => {
                            minimalizeApp(name, icon);
                            closeActiveProgram(name)
                        }}>
                            <MinusOutlined />
                        </button>
                        <p
                            onMouseDown={() => {
                                showCurrentApp(name);
                                this.closeOptionsWindow()
                            }}
                            onContextMenu={this.showOptionsWindow}
                            onClick={() => this.closeOptionsWindow()}>{name}{(analogTime && activeClockType === 'analog') ? ` - ${this.checkTime()}` : null}
                        </p>
                        <button onClick={() => {
                            closeActiveProgram(name)
                            closeDesktopProgram(name)
                        }}><CloseOutlined /></button>
                    </>
                }
            </div>
        )

    }
}

export default NavBar
import React from 'react';
import OptionsWindow from './OptionsWindow'
import SettingsWindow from './SettingsWindow'

class AppOptionsWindow extends React.Component {

    state = {
        settings: 'hidden',
        top: 50,
        left: 50,
    }

    isResizing = false;
    element;

    showSettingsWindow = () => {
        this.setState({
            settings: 'visible'
        })
    }

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

                let newValueLeft = left - newX;
                let newValueTop = top - newY;

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

    programNameChange = (e) => {
        console.log(e.target.value)
    }

    render() {

        const styles = {
            top: `${this.state.top}px`,
            left: `${this.state.left}px`
        }

        return (
            <>
                {this.state.settings !== 'visible' ?
                    <OptionsWindow
                        properties={this.props.properties}
                        showSettingsWindow={this.showSettingsWindow}
                        addToActiveProgram={this.props.addToActiveProgram}
                        closeOptionsWindow={this.props.closeOptionsWindow}
                        handleCloseWindow={this.props.handleCloseWindow}
                    />
                    :
                    <div className='settingsWindow' ref={(el) => {
                        if (el !== null) this.element = el.getBoundingClientRect()
                    }}
                        style={styles}
                    >
                        <SettingsWindow
                            properties={this.props.properties}
                            mousedown={this.mousedown}
                            closeOptionsWindow={this.props.closeOptionsWindow}
                            programNameChange={this.programNameChange}
                        />
                    </div>
                }
            </>
        )

    }
}

export default AppOptionsWindow
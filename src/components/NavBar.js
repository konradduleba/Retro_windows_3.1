import React from 'react';
import '../styles/NavBar.scss';
import ShowOptionsWindow from './ShowOptionsWindow';

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
    render() {
        const { name, icon } = this.props.properties;
        const showOptionsProperties = {
            name,
            icon,
            top: this.state.top,
            left: this.state.left,
            optionsType: 'bar'
        }
        return (
            <div className="navBar" onMouseDown={this.props.moveWindow.bind(this)}>
                {this.state.visible !== 'hidden' ? <ShowOptionsWindow
                    properties={showOptionsProperties}
                    handleCloseWindow={this.props.handleCloseWindow}
                    handleMinimalizeApp={this.props.handleMinimalizeApp}
                    closeWindow={this.props.closeWindow}
                    addToActiveProgram={this.props.addToActiveProgram}
                    showOptionsWindow={this.props.showOptionsWindow}
                    handleActiveAppOptionWindow={this.props.handleActiveAppOptionWindow}
                    closeOptionsWindow={this.closeOptionsWindow}
                    maximize={this.props.maximize}
                /> : null}
                <button onClick={() => {
                    this.props.handleMinimalizeApp(name, icon);
                    this.props.closeWindow(name)
                }}>
                    <i className="icon-minus-1"></i>
                </button>
                <p
                    onMouseDown={() => {
                        this.props.showCurrentApp(name);
                        this.closeOptionsWindow()
                    }}
                    onContextMenu={this.showOptionsWindow}
                    onClick={() => this.closeOptionsWindow()}>{name}</p>
                <button onClick={() => { this.props.handleCloseWindow(name) }}><i className="icon-cancel-1"></i></button>
            </div>
        )

    }
}

export default NavBar
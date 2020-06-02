import React from 'react'
import CalculatorHelpIcon from '../../img/help.png'
import CalculatorIcon from '../../img/calculator.png'
class Menu extends React.Component {

    state = {
        edit: false,
        view: false,
        help: false,
        activePaste: `off`
    }

    activePaste = () => this.setState({ activePaste: 'on' })

    extendMenuOptions = value => {
        if (value === 'e') this.setState({
            edit: !this.state.edit,
            view: false,
            help: false
        })
        if (value === 'v') this.setState({
            view: !this.state.view,
            edit: false,
            help: false,
        })
        if (value === 'h') this.setState({
            help: !this.state.help,
            edit: false,
            view: false,
        })
    }

    hideMenu = () => {
        this.setState({
            help: false,
            edit: false,
            view: false,
        })
    }
    render() {
        const { edit, view, help, activePaste } = this.state;
        const { copyValue, pasteValue, addToActiveProgram } = this.props;
        return (
            <>
                <p onClick={() => this.extendMenuOptions('e')} className={`${edit}`}>Edit</p>
                <p onClick={() => this.extendMenuOptions('v')} className={`${view}`}>View</p>
                <p onClick={() => this.extendMenuOptions('h')} className={`${help}`}>Help</p>
                {edit ? <ul className='edit'>
                    <li onClick={() => {
                        this.hideMenu();
                        copyValue();
                        this.activePaste();
                    }}>Copy Ctrl+C</li>
                    <li onClick={() => {
                        this.hideMenu();
                        pasteValue();
                    }} className={`${activePaste}`}>Paste Ctrl+V</li>
                </ul>
                    : null}
                {view ? <ul className='view'>
                    <li className='viewType' onClick={() => {
                        this.hideMenu();
                    }}><i></i>Scientific</li>
                    <li className='viewType' onClick={() => {
                        this.hideMenu();
                    }}><i className='icon-check'></i>Standard</li>
                </ul>
                    : null}
                {help && <ul className='help'>
                    <li onClick={() => {
                        addToActiveProgram('Calculator Help', CalculatorHelpIcon);
                        this.hideMenu();
                    }}>Contents</li>
                    <li onClick={() => {
                        addToActiveProgram('Calculator Help', CalculatorHelpIcon);
                        this.hideMenu();
                    }}>Search for Help On..</li>
                    <li onClick={() => {
                        addToActiveProgram('Calculator Help', CalculatorHelpIcon);
                        this.hideMenu();
                    }}>How to Use Help</li>
                    <li onClick={() => {
                        addToActiveProgram('About Calculator', CalculatorIcon);
                        this.hideMenu();
                    }}>About Calculator</li>
                </ul>
                }
                {(edit || view || help) ? <div className='hideMenu' onClick={() => this.hideMenu()}></div> : null}

            </>
        )
    }
}

export default Menu
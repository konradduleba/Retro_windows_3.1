import React from 'react';
import '../../styles/AboutProgram.scss'

class AboutProgram extends React.Component {
    state = {
        top: 50,
        left: 100,
    }

    isResizing = false;
    element;

    mousedown = e => {
        const screen = document.querySelector('.wrapper')
        const program = document.querySelector(`.programWindow.${this.props.properties.name}`);
        const programParametres = program.getBoundingClientRect()
        const parametres = screen.getBoundingClientRect()

        let prevX = e.clientX;
        let prevY = e.clientY;

        let top = this.element.top;
        let left = this.element.left;

        const mousemove = (e) => {
            if (!this.isResizing) {
                let newX = prevX - e.clientX + parametres.left + (programParametres.left - parametres.left);
                let newY = prevY - e.clientY + parametres.top + (programParametres.top - parametres.top);

                let newValueLeft = left - newX;
                let newValueTop = top - newY;

                this.setState({
                    left: newValueLeft,
                    top: newValueTop
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


    render() {

        const styles = {
            top: `${this.state.top}px`,
            left: `${this.state.left}px`
        }

        const { name, icon } = this.props.properties;

        return (
            <>
                <div className='aboutProgram' ref={(el) => {
                    if (el !== null) this.element = el.getBoundingClientRect()
                }}
                    style={styles}
                >
                    <nav className='navBar' onMouseDown={this.mousedown}>
                        <button onClick={() => this.props.toggleShowAboutProgram()}><i className='icon-minus-1'></i></button>
                        <p>{name}</p>
                    </nav>
                    <div className='aboutContainer'>
                        <img src={icon} alt={name}></img>
                        <div className='info'>
                            <div className="mainInfo">
                                <p>Based on Microsoft Windows {name}</p>
                                <p>Version 3.1</p>
                                <p>Copyright © 1985-1992 Microsoft Corp.</p>
                            </div>
                            <div className="licence">
                                <p>This product is licenced to:</p>
                                <p>DulconPC</p>
                            </div>
                            <div className="serialNumber">
                                <p>Do u know that, turtle are not "inside" their shells. They *are* their shells</p>
                            </div>
                            <div className="sysInfo">
                                <p>{this.props.type} Mode</p>
                            </div>
                        </div>
                        <button onClick={() => this.props.toggleShowAboutProgram()}>OK</button>
                    </div>
                </div>
            </>
        )
    }
}

export default AboutProgram
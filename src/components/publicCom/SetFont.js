import React from 'react';
import RenderFontList from './RenderFontList';
import '../../styles/SetFont.scss'

const fontAPI = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDOoqrrTHTA5VT1VDVNJkCo0Qgw6-R9d9E';

class SetFont extends React.Component {
    state = {
        top: 50,
        left: 100,
        fontFamily: '',
        fontURL: null,
        fontList: null,
        previousFont: null,
        previousURL: null,
    }

    isResizing = false;
    element;

    fonts = []

    handleDataFetch = () => {
        fetch(fontAPI)
            .then(response => {
                if (response.ok) {
                    return response
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => {
                this.fonts = data.items;
                this.setState({
                    fontList: this.fonts
                })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.handleDataFetch();
        this.setActualFont();
    }

    setActualFont = () => {
        this.setState({
            fontFamily: this.props.actualFont,
            previousFont: this.props.actualFont,
            previousURL: this.props.actualURL
        })
    }

    useFont = fontName => this.setState({ fontFamily: fontName })

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

    findFont = e => {
        const inputValue = e.target.value.toLowerCase();
        const fontList = this.fonts.filter(font => font.family.toLowerCase().includes(inputValue));
        this.setState({ fontList })
    }

    setFontOnClick = e => {
        const choosenFont = e.target.getAttribute('data-key');
        let fontURL = e.target.getAttribute('data-url');

        fontURL = fontURL.replace('http:', '');
        const checkStyle = document.querySelector('head style');
        checkStyle.innerHTML = `@font-face{font-family: ${choosenFont}; src: url(${fontURL})}
                                @font-face{font-family: ${this.state.previousFont}; src: url(${this.state.previousURL})}`;

        if (choosenFont !== this.state.fontFamily) {
            this.setState({
                fontFamily: choosenFont,
                fontURL
            })
        }
    }

    render() {

        const styles = {
            top: `${this.state.top}px`,
            left: `${this.state.left}px`
        }

        return (
            <>
                <div className='setFont' ref={(el) => {
                    if (el !== null) this.element = el.getBoundingClientRect()
                }}
                    style={styles}
                >
                    <nav className='navBar' onMouseDown={this.mousedown}>
                        <button onClick={() => this.props.toggleShowSetFont()}><i className='icon-minus-1'></i></button>
                        <p>Font</p>
                    </nav>
                    <div className='fontContainer'>
                        <div className="chooseFont">
                            <p>Font</p>
                            <input type="text" defaultValue={this.state.fontFamily} onChange={this.findFont}></input>
                            <ul className="fontList">
                                {this.state.fontList !== null ?
                                    <RenderFontList
                                        fontList={this.state.fontList}
                                        setFontOnClick={this.setFontOnClick}
                                    /> : null}
                            </ul>
                        </div>
                        <div className="fontButtons">
                            <button onClick={() => {
                                this.props.toggleShowSetFont();
                                this.props.changeFontFamily(this.state.fontFamily, this.state.fontURL)
                            }}>OK</button>
                            <button onClick={() => this.props.toggleShowSetFont()}>Cancel</button>
                        </div>
                        <div className="sample">
                            <div className="samplePlace">
                                <p className="sampleTitle">Sample</p>
                                <p className="sampleTxt" style={{ fontFamily: `${this.state.fontFamily}` }}>AaBbYyZz</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SetFont
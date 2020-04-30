import React from 'react';
import RenderFontList from './RenderFontList';
import '../../styles/SetFont.scss'

const fontAPI = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDOoqrrTHTA5VT1VDVNJkCo0Qgw6-R9d9E';

class SetFont extends React.Component {
    state = {
        fontFamily: '',
        fontURL: null,
        fontList: null,
        previousFont: null,
        previousURL: null,
    }

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

        return (
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
                        this.props.changeFont(this.state.fontFamily, this.state.fontURL);
                        this.props.closeWindow('SetFont');
                    }}>OK</button>
                    <button onClick={() => this.props.handleCloseWindow('SetFont')}>Cancel</button>
                </div>
                <div className="sample">
                    <div className="samplePlace">
                        <p className="sampleTitle">Sample</p>
                        <p className="sampleTxt" style={{ fontFamily: `${this.state.fontFamily}` }}>AaBbYyZz</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SetFont
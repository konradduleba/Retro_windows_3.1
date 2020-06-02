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
        const { actualFont, actualURL } = this.props;
        this.setState({
            fontFamily: actualFont,
            previousFont: actualFont,
            previousURL: actualURL
        })
    }

    useFont = fontName => this.setState({ fontFamily: fontName })

    findFont = e => {
        const inputValue = e.target.value.toLowerCase();
        const fontList = this.fonts.filter(font => font.family.toLowerCase().includes(inputValue));
        this.setState({ fontList })
    }

    setFontOnClick = e => {
        const { fontFamily, previousURL, previousFont } = this.state;
        const choosenFont = e.target.getAttribute('data-key');
        let fontURL = e.target.getAttribute('data-url');

        fontURL = fontURL.replace('http:', '');
        const checkStyle = document.querySelector('head style');
        checkStyle.innerHTML = `@font-face{font-family: ${choosenFont}; src: url(${fontURL})}
                                @font-face{font-family: ${previousFont}; src: url(${previousURL})}`;

        if (choosenFont !== fontFamily) {
            this.setState({
                fontFamily: choosenFont,
                fontURL
            })
        }
    }

    render() {

        const { fontFamily, fontList, fontURL } = this.state;
        const { changeFont, closeActiveProgram } = this.props;
        return (
            <div className='fontContainer'>
                <div className="chooseFont">
                    <p>Font</p>
                    <input type="text" defaultValue={fontFamily} onChange={this.findFont}></input>
                    <ul className="fontList">
                        {fontList !== null &&
                            <RenderFontList
                                fontList={fontList}
                                setFontOnClick={this.setFontOnClick}
                            />
                        }
                    </ul>
                </div>
                <div className="fontButtons">
                    <button onClick={() => {
                        changeFont(fontFamily, fontURL);
                        closeActiveProgram('SetFont');
                    }}>OK</button>
                    <button onClick={() => {
                        // closeDesktopProgram('SetFont');
                        closeActiveProgram('SetFont');
                    }}>Cancel</button>
                </div>
                <div className="sample">
                    <div className="samplePlace">
                        <p className="sampleTitle">Sample</p>
                        <p className="sampleTxt" style={{ fontFamily: `${fontFamily}` }}>AaBbYyZz</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SetFont
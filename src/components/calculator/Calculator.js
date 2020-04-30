import React from 'react'
import Menu from './Menu'
import Keys from './Keys';
import '../../styles/Calculator.scss'

class Calculator extends React.Component {

    keysChar = ['C', 'CE', 'Back', 'MC', '7', '8', '9', '/', 'sqrt', 'MR', '4', '5', '6', '*', '%', 'MS', '1', '2', '3', '-', '1/x', 'M+', '0', '+/-', '.', '+', '='];

    state = {
        aboutProgram: false,
        viewType: 'standard',
        result: null,
        number: null,
        operator: null,
        copiedValue: null
    }

    copyValue = () => this.setState({ copiedValue: this.state.result })
    pasteValue = () => this.setState({ result: this.state.copiedValue })

    toggleShowAboutProgram = () => this.setState({ aboutProgram: !this.state.aboutProgram })

    resetValues = () => this.setState({ result: null, number: null, operator: null })

    setOperatorValue = value => {
        if (this.state.number === null)
            this.setState({ operator: value, number: this.state.result, result: null, })
    }

    division = () => this.state.number / this.state.result
    multiplication = () => this.state.number * this.state.result
    subtraction = () => this.state.number - this.state.result
    addition = () => parseFloat(this.state.number) + parseFloat(this.state.result)
    modulo = () => this.state.number % this.state.result
    roots = () => Math.sqrt(this.state.result)
    oneDividedBy = () => 1 / this.state.result
    multiplyByMinusOne = () => this.state.result * (-1)
    back = () => this.state.result.slice(0, -1)

    setResult = () => {
        const { operator } = this.state;

        switch (operator) {
            case '/':
                this.setState({ result: `${this.division()}`, operator: null, number: null });
                break;
            case '*':
                this.setState({ result: `${this.multiplication()}`, operator: null, number: null });
                break;
            case '-':
                this.setState({ result: `${this.subtraction()}`, operator: null, number: null });
                break;
            case '+':
                this.setState({ result: `${this.addition()}`, operator: null, number: null });
                break;
            case '%':
                this.setState({ result: `${this.modulo()}`, operator: null, number: null });
                break;
            default:
                break;
        }
    }

    changeResult = value => {

        const { result } = this.state
        switch (value) {
            case 'C':
            case 'CE':
                this.resetValues();
                break;
            case 'MC':
            case 'MR':
            case 'MS':
            case 'M+':
                break;
            default: {
                if (result !== null) {
                    switch (value) {
                        case '/':
                            this.setOperatorValue(value);
                            break;
                        case '*':
                            this.setOperatorValue(value);
                            break;
                        case '-':
                            this.setOperatorValue(value);
                            break;
                        case '+':
                            this.setOperatorValue(value);
                            break;
                        case '=':
                            this.setResult();
                            break;
                        case '%':
                            this.setOperatorValue(value);
                            break;
                        case 'sqrt':
                            this.setOperatorValue(value);
                            this.setState({ result: `${this.roots()}`, operator: null, number: null })
                            break;
                        case 'Back':
                            this.setState({ result: `${this.back()}` })
                            break;
                        case '1/x':
                            this.setState({ result: `${this.oneDividedBy()}`, operator: null, number: null })
                            break;
                        case '+/-':
                            this.setState({ result: `${this.multiplyByMinusOne()}`, operator: null, number: null })
                            break;
                        default:
                            this.setState(prevState => {
                                return ({
                                    result: prevState.result + value
                                })
                            })
                    }
                }
                else {
                    switch (value) {
                        case '1/x':
                        case 'sqrt':
                        case '%':
                        case 'Back':
                        case '=':
                        case '+':
                        case '*':
                        case '/':
                        case '+/-':
                            break;
                        default:
                            this.setState({ result: value })

                    }
                }
            }
        }

    }

    showResult = () => {
        const { result, number, operator } = this.state;
        if (result === null && number === null) return '0.'
        else if (result === null && number !== null) return `${number} ${operator}`
        else if (result !== null && number !== null) return `${number} ${operator} ${result}`
        else return result
    }

    render() {
        return (
            <>
                <section className="calculatorContainer">
                    <div className="calculatorNavigation">
                        <Menu
                            addToActiveProgram={this.props.addToActiveProgram}
                            properties={this.props.properties}
                            toggleShowAboutProgram={this.toggleShowAboutProgram}
                            copyValue={this.copyValue}
                            pasteValue={this.pasteValue}
                        />
                    </div>
                    <div className='inputWindow'>
                        <p>{this.showResult()}</p>
                    </div>
                    <div className='keysContainer'>
                        <ul>
                            <Keys keysTable={this.keysChar} changeResult={value => this.changeResult(value)} />
                        </ul>
                    </div>
                </section>
            </>

        )
    }
}
export default Calculator


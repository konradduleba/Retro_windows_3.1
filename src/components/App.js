import React from 'react';
import '../styles/App.scss';
import RenderProgramsWindow from './RenderProgramsWindow';
import RenderDesktopProgramsIcon from './RenderDesktopProgramsIcon';
import "../fontello-7826f4c6/css/fontello.css";
import LogoPM from '../img/programManager.png';

class App extends React.Component {

  state = {
    desktopProgram: [{
      name: 'Program Manager',
      icon: LogoPM
    }],
    activeProgram: ""
  }

  initializedDesktopPrograms = [{
    name: 'Program Manager',
    icon: LogoPM
  }]

  addMinizalizedProgram = (name, icon) => {

    const newTable = this.initializedDesktopPrograms.filter(program => program.name === name)
    if (newTable.length === 0) {
      this.initializedDesktopPrograms.push({
        name,
        icon
      })
    }

  }

  closeMinimalizedProgram = (name) => {
    const newTable = this.initializedDesktopPrograms.filter(program => (program.name !== name || program.name === "Program Manager"))
    if (newTable.length !== 0) {
      this.initializedDesktopPrograms = newTable
    }
  }

  handleMinimalizeApp = (name, icon) => {
    this.addMinizalizedProgram(name, icon)

    this.setState({
      desktopProgram: this.initializedDesktopPrograms
    })
  }

  handlePrograms = (name) => {
    this.setState({
      activeProgram: name
    })
  }

  handleCloseWindow = (name) => {
    this.closeMinimalizedProgram(name);
    this.setState({
      activeProgram: "",
      desktopProgram: this.initializedDesktopPrograms
    })
  }


  render() {
    return (
      <section className="crt">
        <div className="wrapper">
          <RenderDesktopProgramsIcon programList={this.state.desktopProgram} handlePrograms={(value) => {
            this.handlePrograms(value)
          }} />
          {this.state.activeProgram === "" ? null :
            <RenderProgramsWindow
              activeProgram={this.state.activeProgram}
              logo={LogoPM}
              handleCloseWindow={(value) => {
                this.handleCloseWindow(value)
              }}
              handleMinimalizeApp={(name, icon) => {
                this.handleMinimalizeApp(name, icon)
              }} />}
        </div>
      </section>
    );
  }
}

export default App;
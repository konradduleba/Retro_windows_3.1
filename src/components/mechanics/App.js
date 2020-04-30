import React from 'react';
// import RenderAppWindow from './RenderAppWindow';
import RenderAppIcon from './RenderAppIcon';
import RenderActiveApp from './RenderActiveApp';
import ShowOptionsWindow from '../rightClick/ShowOptionsWindow';

import '../../styles/App.scss';

import iconProgramManager from '../../img/programManager.png';
import IconClock from '../../img/clock.png';
import IconCalculator from '../../img/calculator.png';

class App extends React.Component {

  state = {
    desktopProgram: [{
      name: 'Program Manager',
      icon: iconProgramManager
    }, {
      name: 'Clock',
      icon: IconClock
    }, {
      name: 'Calculator',
      icon: IconCalculator
    }],
    activeProgram: [],
    style: {
      visible: 'hidden',
      top: 0,
      left: 0,
    },
    activeAppOptionWindow: {
      name: '',
      icon: '',
    },
    fontFamily: '',
    fontURL: ''
  }

  initializedDesktopPrograms = [{
    name: 'Program Manager',
    icon: iconProgramManager
  }, {
    name: 'Clock',
    icon: IconClock
  }, {
    name: 'Calculator',
    icon: IconCalculator
  }]

  addMinimalizedProgram = (name, icon) => {
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
    this.closeWindow(name)
  }

  handleMinimalizeApp = (name, icon) => {
    this.addMinimalizedProgram(name, icon)

    this.setState({
      desktopProgram: this.initializedDesktopPrograms
    })
  }

  closeWindow = (name) => {
    const newTableOne = this.activeProgram.filter(program => (program.name !== name))
    this.activeProgram = newTableOne

    this.setState({
      activeProgram: this.activeProgram
    })
  }

  handleCloseWindow = (name) => {
    this.closeMinimalizedProgram(name);
    this.setState({
      activeProgram: this.activeProgram,
      desktopProgram: this.initializedDesktopPrograms
    })
  }

  activeProgram = [];

  addToActiveProgram = (name, icon) => {
    const newTableOne = this.activeProgram.filter(program => (program.name === name))
    if (newTableOne.length === 0)
      this.activeProgram.push({
        name: name,
        icon: icon
      })

    this.setState({
      activeProgram: this.activeProgram
    })
  }

  removeRightClick = e => {
    e.preventDefault();
  }

  showOptionsWindow = e => {
    const screen = document.querySelector('.wrapper');
    const parametres = screen.getBoundingClientRect()


    if (e.type === 'contextmenu') {
      e.preventDefault();
      const top = e.clientY - parametres.top;
      const left = e.pageX - parametres.left;
      this.setState({
        style: {
          visible: 'visible',
          top,
          left
        }
      })
    }
  }

  closeOptionsWindow = () => {
    this.setState({
      style: {
        visible: 'hidden',
        top: this.state.style.top,
        left: this.state.style.left
      }
    })
  }

  handleActiveAppOptionWindow = (name, icon) => {
    this.setState({
      activeAppOptionWindow: {
        name,
        icon
      }
    })
  }
  changeFont = (fontFamily, fontURL) => this.setState({ fontFamily, fontURL })

  render() {

    const showOptionsProperties = {
      top: this.state.style.top,
      left: this.state.style.left,
      name: this.state.activeAppOptionWindow.name,
      icon: this.state.activeAppOptionWindow.icon,
      optionsType: 'app'
    }

    return (
      <section className="crt">
        <div className="wrapper" onContextMenu={this.removeRightClick}>
          <RenderAppIcon
            programList={this.state.desktopProgram}
            addToActiveProgram={(name, icon) => this.addToActiveProgram(name, icon)}
            handleActiveAppOptionWindow={(name, icon) => this.handleActiveAppOptionWindow(name, icon)}
            closeOptionsWindow={this.closeOptionsWindow}
            showOptionsWindow={this.showOptionsWindow}
          />
          {this.state.style.visible !== 'hidden' ?
            <ShowOptionsWindow
              properties={showOptionsProperties}
              closeOptionsWindow={this.closeOptionsWindow}
              addToActiveProgram={(name, icon) => this.addToActiveProgram(name, icon)}
              handleCloseWindow={value => this.handleCloseWindow(value)}
            />
            : null}
          {this.state.activeProgram.length !== 0 ?
            <RenderActiveApp
              activeApps={this.state.activeProgram}
              handleCloseWindow={value => this.handleCloseWindow(value)}
              handleMinimalizeApp={(name, icon) => this.handleMinimalizeApp(name, icon)}
              closeWindow={name => this.closeWindow(name)}
              addToActiveProgram={(name, icon) => this.addToActiveProgram(name, icon)}
              closeOptionsWindow={this.closeOptionsWindow}
              showOptionsWindow={this.showOptionsWindow}
              handleActiveAppOptionWindow={(name, icon) => this.handleActiveAppOptionWindow(name, icon)}
              changeFont={(fontName, fontURL) => this.changeFont(fontName, fontURL)}
              actualFont={this.state.fontFamily}
              actualURL={this.state.fontURL}
            />
            : null}
        </div>
      </section>
    );
  }
}

export default App;
import React from 'react';
import RenderAppIcon from './RenderAppIcon';
import RenderActiveApp from './RenderActiveApp';
import ShowOptionsWindow from '../rightClick/ShowOptionsWindow';
import { AppIcons } from '../utils/images'

import pmicons from '../../img/pmicons.png';

import '../../styles/App.scss';
import '../../styles/SystemAppsSettings.scss';

class App extends React.Component {

  state = {
    desktopProgram: AppIcons,
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
    fontURL: '',
    addedPrograms: [],
    addedProgramsByUser: [],
    programItemsPath: '',
    programItemsData: null,
    iconData: null,
    browseParent: 'ProgramItemsProperties'
  }

  changeProgramProperties = (data, type) => {
    const newTable = this.state.addedProgramsByUser.filter(program => program.name !== data.name && program.dir !== data.oldDir);
    const changedProgram = newTable.concat({ name: data.name, dir: data.newDir.toLowerCase(), icon: data.icon });
    if (type === 'move') this.setState({
      addedProgramsByUser: changedProgram
    })
    else if (type === 'copy') this.setState({
      addedProgramsByUser: this.state.addedProgramsByUser.concat({ name: data.name, dir: data.newDir.toLowerCase(), icon: data.icon })
    })

  }

  deleteProgram = name => {
    const containsProgram = this.state.addedProgramsByUser.filter(program => program.name === name);
    const containsFolder = this.state.addedPrograms.filter(folder => folder.name === name)

    if (containsProgram) this.setState({
      addedProgramsByUser: this.state.addedProgramsByUser.filter(program => program.name !== name)
    })
    if (containsFolder) this.setState({
      addedPrograms: this.state.addedPrograms.filter(program => program.name !== name)
    })
  }

  minimalizeApp = (name, icon) => {
    const checkArray = this.state.desktopProgram.filter(program => program.name === name).length;
    if (checkArray === 0)
      this.setState(prevState => {
        return ({
          desktopProgram: prevState.desktopProgram.concat({ name, icon })
        })
      })
  }

  closeActiveProgram = name => this.setState({
    activeProgram: this.state.activeProgram.filter(program => (program.name !== name))
  })

  closeDesktopProgram = name => this.setState({
    desktopProgram: this.state.desktopProgram.filter(program => (program.name !== name || program.name === "Program Manager"))
  })

  addToActiveProgram = (name, icon) => {
    const checkArray = this.state.activeProgram.filter(program => (program.name === name)).length;
    if (checkArray === 0)
      this.setState(prevState => {
        return ({
          activeProgram: prevState.activeProgram.concat({ name, icon })
        })
      })
  }

  addGroupProgram = name => this.setState(prevState => {
    return {
      addedPrograms: prevState.addedPrograms.concat({ name, icon: pmicons })
    }
  })

  addUserProgram = (dir, name, icon) => this.setState(prevState => {
    return {
      addedProgramsByUser: prevState.addedProgramsByUser.concat({ dir, name, icon })
    }
  })
  changeBrowseParent = browseParent => this.setState({ browseParent })
  changeProgramItemsData = programItemsData => this.setState({ programItemsData })
  changeIconData = iconData => this.setState({ iconData })
  setProgramItemsPath = programItemsPath => this.setState({ programItemsPath })

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

    const { desktopProgram, activeProgram, style, fontFamily, fontURL, activeAppOptionWindow } = this.state;

    const showOptionsProperties = {
      top: style.top,
      left: style.left,
      name: activeAppOptionWindow.name,
      icon: activeAppOptionWindow.icon,
      optionsType: 'app'
    }

    return (
      <section className="crt">
        <div className="wrapper" onContextMenu={this.removeRightClick}>
          <RenderAppIcon
            programList={desktopProgram}
            addToActiveProgram={(name, icon) => this.addToActiveProgram(name, icon)}
            handleActiveAppOptionWindow={(name, icon) => this.handleActiveAppOptionWindow(name, icon)}
            closeOptionsWindow={this.closeOptionsWindow}
            showOptionsWindow={this.showOptionsWindow}
          />
          {style.visible !== 'hidden' &&
            <ShowOptionsWindow
              properties={showOptionsProperties}
              closeOptionsWindow={this.closeOptionsWindow}
              addToActiveProgram={(name, icon) => this.addToActiveProgram(name, icon)}
              closeDesktopProgram={value => this.closeDesktopProgram(value)}
              closeActiveProgram={name => this.closeActiveProgram(name)}
            />}
          {activeProgram.length !== 0 &&
            <RenderActiveApp
              activeApps={activeProgram}
              addedPrograms={this.state.addedPrograms}
              addToActiveProgram={(name, icon) => this.addToActiveProgram(name, icon)}
              closeActiveProgram={name => this.closeActiveProgram(name)}
              closeDesktopProgram={value => this.closeDesktopProgram(value)}
              minimalizeApp={(name, icon) => this.minimalizeApp(name, icon)}
              closeOptionsWindow={this.closeOptionsWindow}
              showOptionsWindow={this.showOptionsWindow}
              handleActiveAppOptionWindow={(name, icon) => this.handleActiveAppOptionWindow(name, icon)}
              changeFont={(fontName, fontURL) => this.changeFont(fontName, fontURL)}
              addGroupProgram={name => this.addGroupProgram(name)}
              addUserProgram={(dir, name, icon) => this.addUserProgram(dir, name, icon)}
              changeProgramItemsData={data => this.changeProgramItemsData(data)}
              changeIconData={data => this.changeIconData(data)}
              changeBrowseParent={parent => this.changeBrowseParent(parent)}
              addedProgramsByUser={this.state.addedProgramsByUser}
              browseParent={this.state.browseParent}
              programItemsData={this.state.programItemsData}
              iconData={this.state.iconData}
              actualFont={fontFamily}
              actualURL={fontURL}
              deleteProgram={name => this.deleteProgram(name)}
              changeProgramProperties={(data, type) => this.changeProgramProperties(data, type)}
            />}
        </div>
      </section>
    );
  }
}

export default App;
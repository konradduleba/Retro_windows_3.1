import React, { useState } from 'react';
import WindowsIcon from '../../img/windows.png'
import '../../styles/ProgramManagerMenu.scss'

export default function Menu({ menuList, addToActiveProgram }) {
    const [visibleFile, setFileVisible] = useState(false);
    const [visibleOption, setOptionsVisible] = useState(false);
    const [visibleWindow, setWindowVisible] = useState(false);
    const [visibleHelp, setHelpVisible] = useState(false);

    const showActiveMenu = name => {
        if (name === "File") {
            setFileVisible(!visibleFile);
            setOptionsVisible(false);
            setWindowVisible(false);
            setHelpVisible(false)
        }
        else if (name === "Options") {
            setFileVisible(false);
            setOptionsVisible(!visibleOption);
            setWindowVisible(false);
            setHelpVisible(false)
        }
        else if (name === "Window") {
            setFileVisible(false);
            setOptionsVisible(false);
            setWindowVisible(!visibleWindow);
            setHelpVisible(false)
        }
        else if (name === "Help") {
            setFileVisible(false);
            setOptionsVisible(false);
            setWindowVisible(false);
            setHelpVisible(!visibleHelp)
        }
        else {
            setFileVisible(false);
            setOptionsVisible(false);
            setWindowVisible(false);
            setHelpVisible(false);
        }
    }

    const handleClick = element => {
        showActiveMenu(element);
        if (element === 'About Program Manager...') addToActiveProgram('About Program Manager', WindowsIcon)
        else if (element === 'Search for Help on...') addToActiveProgram('Calculator Help')
        else if (element === 'Contents') addToActiveProgram('Calculator Help')
        else if (element === 'How to Use Help') addToActiveProgram('Calculator Help')
        else if (element === '1 Accessories') addToActiveProgram('Accessories')
        else if (element === '2 Games') addToActiveProgram('Games')
        else if (element === '3 StartUp') addToActiveProgram('StartUp')
        else if (element === '4 Main') addToActiveProgram('Main')
        else if (element === '5 Microsoft Visual Basic') addToActiveProgram('Microsoft Visual Basic')
        else if (element === 'New...') addToActiveProgram('New Program Object')
        else if (element === 'Run...') addToActiveProgram('Run')
        else if (element === 'Delete') addToActiveProgram('Delete')
        else if (element === 'Move...') addToActiveProgram('Move')
        else if (element === 'Copy...') addToActiveProgram('Copy')
    }

    const checkActive = activeE => {
        if (activeE === 'File') return `File ${visibleFile}`
        else if (activeE === 'Options') return `Options ${visibleOption}`
        else if (activeE === 'Help') return `Help ${visibleHelp}`
        else if (activeE === 'Window') return `Window ${visibleWindow}`
    }

    return (
        <>
            <div className="menu">
                {menuList.map(dataMenu => (
                    <div key={dataMenu.name}>
                        <p
                            onClick={() => handleClick(dataMenu.name)}
                            className={checkActive(dataMenu.name)}>
                            {dataMenu.name}
                        </p>
                        <ul className={checkActive(dataMenu.name)}>
                            {dataMenu.elements.map(element =>
                                <li
                                    key={element}
                                    onClick={() => handleClick(element)}>
                                    {element}
                                </li>
                            )}
                        </ul>
                    </div>
                ))}
            </div >
            <div className="hideMenu" onClick={() => showActiveMenu()}></div>
        </>
    )
}


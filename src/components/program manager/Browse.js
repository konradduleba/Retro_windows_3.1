import React, { useState } from 'react';

import { BrowsePrograms } from '../utils/images'

export default function Browse({ closeActiveProgram, addToActiveProgram, changeProgramItemsData, browseParent, changeIconData }) {
    const [directory, changeDirectory] = useState(`c:/windows`);
    const [programName, changeProgramName] = useState('.exe');
    const [programIcon, changeProgramIcon] = useState(null);

    function viewFileNameList() {
        const newFileList = BrowsePrograms.filter(app => app.name.toLowerCase().includes(programName.toLowerCase()))
        return (newFileList.map(program => <li key={program.name} onClick={() => {
            changeProgramName(program.name);
            changeProgramIcon(program.icon);
        }}>{program.name}</li>))
    }

    function sendButton() {
        const data = {
            dir: directory,
            name: programName,
            icon: programIcon
        }

        closeActiveProgram('Program Items Browse');
        if (browseParent === 'ProgramItemsProperties')
            changeProgramItemsData(data);
        else if (browseParent === "ChangeIcon")
            changeIconData(data);
    }

    return (
        <div className="main">
            <div className="file__name">
                <p>File Name:</p>
                <input onChange={e => changeProgramName(e.target.value)} value={programName}></input>
                <ul className="file__name__list">
                    {viewFileNameList()}
                </ul>
                <label htmlFor="types">List Files of Type:</label>
                <select name="types" id="types" onChange={e => { changeProgramName(e.target.value) }}>
                    <option value=".exe">Programs</option>
                    <option value="">All Files (*.*)</option>
                </select>
            </div>
            <div className="directories">
                <p>Directories:</p>
                <p className="dirPlace">{directory}</p>
                <div className="dirField">
                    <div className="dirC">
                        <p onClick={() => changeDirectory('c:')}>c:\</p>
                        <div className="dirWindows">
                            <p className="winTag" onClick={() => changeDirectory('c:/windows')}>windows</p>
                            <p onClick={() => changeDirectory('c:/windows/system')}>system</p>
                            <p onClick={() => changeDirectory('c:/windows/temp')}>temp</p>
                        </div>
                    </div>
                </div>
                <label htmlFor="drives">Drives:</label>
                <select name="drives" id="drives" defaultValue="c">
                    <option value="c">c:</option>
                </select>

            </div>
            <div className="buttons">
                <button onClick={sendButton}>OK</button>
                <button onClick={() => closeActiveProgram('Program Items Browse')}>Cancel</button>
                <button onClick={() => addToActiveProgram('Calculator Help')}>Help</button>
            </div>
        </div>
    )
}

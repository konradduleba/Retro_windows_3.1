import React, { useState } from 'react';

import { BrowsePrograms, ProgramManagerIcons } from '../utils/images';

export default function Open({ closeActiveProgram, addToActiveProgram, type, program, addedProgramsByUser, addedPrograms, deleteProgram, changeProgramProperties }) {
    const [programWorkGroup, changeWorkGroup] = useState('');
    const [programName, changeProgramName] = useState('');
    const [destinationWorkGroup, changeDestinationWorkGroup] = useState('');
    const [programIcon, changeIcon] = useState('');

    const deleteOptions = addedProgramsByUser.concat(addedPrograms);
    const concatedWorkGroup = ProgramManagerIcons.concat(addedPrograms);

    function sendData() {
        const data = {
            newDir: destinationWorkGroup,
            oldDir: programWorkGroup,
            name: programName,
            icon: programIcon
        }
        if (program === 'move') {
            changeProgramProperties(data, 'move')
            closeActiveProgram('Move');
        }
        else if (program === 'copy') {
            changeProgramProperties(data, 'copy');
            closeActiveProgram('Copy');
        }
    }

    const changeSettings = (name, type) => {
        const programData = addedProgramsByUser.filter(program => program.name === name);

        if (type === 'program') {
            changeWorkGroup(programData[0].dir);
            changeIcon(programData[0].icon);
            changeProgramName(name);
        }
        else if (type === 'group') {
            if (name !== destinationWorkGroup) {
                changeDestinationWorkGroup(name);
            }
            else return null
        }
    }

    function checkButton() {
        if (programWorkGroup.toLowerCase() !== destinationWorkGroup.toLowerCase() && destinationWorkGroup !== '') return false;
        else return true;
    }

    return (
        <div className='main'>
            {type === 'run' &&
                <>
                    <p>Wybierz program do uruchomienia</p>
                    <select name="types" id="types" onChange={e => { addToActiveProgram(e.target.value) }}>
                        <option value="selected">...</option>
                        {BrowsePrograms.map(program => <option value={program.withoutExe} key={program.withoutExe}>{program.withoutExe}</option>)}
                    </select>
                </>
            }
            {type === 'delete' &&
                <>
                    <p>Który folder/program chcesz usunąć?</p>
                    <select name="types" id="types" onChange={e => { deleteProgram(e.target.value) }}>
                        <option value="selected">...</option>
                        {deleteOptions.map(program => <option value={program.name} key={program.name}>{program.name}</option>)}
                    </select>
                </>
            }
            {type === 'move' &&
                <div className="moveWrapper">
                    <div className="moveDataWrapper">
                        <div className="moveMain">
                            <div className="moveFirstColumn">
                                {program === 'move' && <p>Move Program Item:</p>}
                                {program === 'copy' && <p>Copy Program Item:</p>}
                                <p>From Program Group:</p>
                            </div>
                            <div className="moveShowInfo">
                                <select name="types" id="types" onChange={e => { changeSettings(e.target.value, 'program') }}>
                                    <option value="selected">...</option>
                                    {addedProgramsByUser.map(program => <option value={program.name} key={program.name}>{program.name}</option>)}
                                </select>
                                <p>{programWorkGroup}</p>
                            </div>
                        </div>
                        <div className="moveToGroup">
                            <p>To Group:</p>
                            <select name="types" id="types" onChange={e => { changeSettings(e.target.value, 'group') }}>
                                <option value="selected">...</option>
                                {concatedWorkGroup.map(program => <option value={program.name} key={program.name}>{program.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="buttons">
                        <button onClick={sendData} disabled={checkButton()}>OK</button>
                        {program === 'move' &&
                            <button onClick={() => closeActiveProgram('Move')}>Cancel</button>
                        }
                        {program === 'copy' &&
                            <button onClick={() => closeActiveProgram('Copy')}>Cancel</button>
                        }
                        <button>Help</button>
                    </div>
                </div>
            }

        </div>
    )
}

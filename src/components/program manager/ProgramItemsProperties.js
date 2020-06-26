import React, { useState, useEffect } from 'react';
import { ProgramManagerIcons, BrowsePrograms } from '../utils/images';

export default function ProgramItemsProperties({ closeActiveProgram, addToActiveProgram, programItemsData, addedProgramsByUser, addedPrograms, changeBrowseParent, addUserProgram }) {
    const [isDisabled, handleDisabled] = useState(true);
    const [describe, changeDescribe] = useState('');
    const [comline, changeComline] = useState('');
    const [workdir, changeWorkdir] = useState('Games');
    const [shortkey, changeShortkey] = useState('None');
    const [icon, changeIcon] = useState(false);
    const [isCheckedBtn, handleCheckBtn] = useState(false);

    const handleChange = target => {
        if (target.name === 'description') changeDescribe(`${target.value}`)
        else if (target.name === 'comline') changeComline(`${target.value}`)
        else if (target.name === 'shorkey') changeShortkey(`${target.value}`)

        if (!(comline.length > 1)) handleDisabled(true)
        else handleDisabled(false)
    }

    const checkProgramName = () => {
        const allProgramList = BrowsePrograms.concat(addedProgramsByUser, addedPrograms);
        if (!(allProgramList.filter(program => program.name.toLowerCase() === describe.toLowerCase()).length)) return true;
        else return false
    }

    function handleSendButton() {

        if (checkProgramName())
            if (comline === '')
                addToActiveProgram('Invalid Path');
            else {
                const lowerWorkDir = workdir.toLowerCase()
                addUserProgram(lowerWorkDir, describe, icon);
                closeActiveProgram('Program Items Properties');
            }
        else return addToActiveProgram('Wrong Program Name');
    }

    useEffect(() => {
        if (programItemsData) {
            const { dir, name, icon } = programItemsData;
            changeComline(`${dir}/${name}`);
            changeIcon(icon);
        }
    }, [programItemsData])


    return (
        <div className="PGPcontent">
            <div className="firstline">
                <div className="main">
                    <div>
                        <p>Description:</p>
                        <p>Command Line:</p>
                        <p>Working Directory:</p>
                        <p>Shortcut Key:</p>

                    </div>
                    <div>
                        <input type="text" onChange={e => handleChange(e.target)} name="description" value={describe}></input>
                        <input type="text" onChange={e => handleChange(e.target)} name="comline" value={comline}></input>
                        <select name="workdir" id="workdir" onChange={e => changeWorkdir(e.target.value.toLowerCase())}>
                            {ProgramManagerIcons.map(program => (<option key={program.name} value={`${program.name}`}>{program.name}</option>))}
                            {addedPrograms.map(program => (<option key={program.name} value={`${program.name}`}>{program.name}</option>))}
                        </select>
                        <input type="text" onChange={e => handleChange(e.target)} name="shorkey" value={shortkey}></input>
                        <div className="minimized">
                            <input type="checkbox"
                                id="checkboxPI"
                                className="checkbox-round"
                                checked={isCheckedBtn}
                                onChange={event => handleCheckBtn(!isCheckedBtn)}
                            />
                            <label htmlFor="checkboxPI">Run Minimized</label>
                        </div>

                    </div>
                </div>
                <div className="buttons">
                    <button onClick={() => handleSendButton()} disabled={isDisabled}>OK</button>
                    <button onClick={() => closeActiveProgram('Program Items Properties')}>Cancel</button>
                    <button onClick={() => {
                        changeBrowseParent('ProgramItemsProperties');
                        addToActiveProgram('Program Items Browse')
                    }}>Browse</button>
                    <button onClick={() => {
                        changeBrowseParent('ChangeIcon');
                        addToActiveProgram('Change Icon')
                    }} disabled={isDisabled} >Change Icon...</button>
                    <button onClick={() => addToActiveProgram('Calculator Help')}>Help</button>
                </div>
            </div>
            <div className="secondline">
                {icon && <img src={icon} alt="icon" />}
            </div>
        </div>
    )
}

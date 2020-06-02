import React, { useState } from 'react'

export default function ProgramItemsProperties({ closeActiveProgram, addToActiveProgram, setProgramItemsPath }) {
    const [isDisabled, handleDisabled] = useState(true);
    const [describe, changeDescribe] = useState('');
    const [comline, changeComline] = useState('');
    const [workdir, changeWorkdir] = useState('');
    const [shortkey, changeShortkey] = useState('None');

    const handleChange = target => {
        if (target.name === 'description') changeDescribe(`${target.value}`)
        else if (target.name === 'comline') changeComline(`${target.value}`)
        else if (target.name === 'workdir') changeWorkdir(`${target.value}`)
        else if (target.name === 'shorkey') changeShortkey(`${target.value}`)

        if (!(comline.length > 1)) handleDisabled(true)
        else handleDisabled(false)
    }

    function handleSendButton() {
        addToActiveProgram('Invalid Path');
        setProgramItemsPath(`${comline}`)
    }



    return (
        <div className="PGPcontent">
            <div className="main">
                <div>
                    <p>Description:</p>
                    <p>Command Line:</p>
                    <p>Working Directory:</p>
                    <p>Shortcut Key:</p>

                </div>
                <div>
                    <input type="text" onChange={e => handleChange(e.target)} name="description"></input>
                    <input type="text" onChange={e => handleChange(e.target)} name="comline"></input>
                    <input type="text" onChange={e => handleChange(e.target)} name="workdir"></input>
                    <input type="text" onChange={e => handleChange(e.target)} name="shorkey" value={shortkey}></input>
                </div>
            </div>
            <div className="buttons">
                <button onClick={() => handleSendButton()} disabled={isDisabled}>OK</button>
                <button onClick={() => closeActiveProgram('Program Group Properties')}>Cancel</button>
                <button onClick={() => addToActiveProgram('Program Items Browse')}>Browse</button>
                <button onClick={() => closeActiveProgram('Program Items Change Icon')} disabled={isDisabled} >Change Icon...</button>
                <button onClick={() => addToActiveProgram('Calculator Help')}>Help</button>
            </div>
        </div>
    )
}

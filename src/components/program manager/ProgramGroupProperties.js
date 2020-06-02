import React, { useState } from 'react'

export default function ProgramGroupProperties({ addToActiveProgram, closeActiveProgram, addGroupProgram }) {
    const [isDisabled, handleDisabled] = useState(true);
    const [describe, changeDescribe] = useState('');
    const [groupFile, changeGroupFile] = useState('');

    function handleSendButton() {
        closeActiveProgram('Program Group Properties');
        addGroupProgram(`${describe}`);
    }

    const handleChange = target => {
        if (target.name === 'description') changeDescribe(`${target.value}`)
        else if (target.name === 'groupfile') changeGroupFile(`${target.value}`)

        if (!(describe.length > 1 || groupFile.length > 1)) handleDisabled(true)
        else handleDisabled(false)
    }

    return (
        <div className="PGPcontent">
            <div className="main">
                <div>
                    <p>Description:</p>
                    <p>Group File:</p>

                </div>
                <div>
                    <input type="text" onChange={e => handleChange(e.target)} name="description"></input>
                    <input type="text" onChange={e => handleChange(e.target)} name="groupfile"></input>
                </div>
            </div>
            <div className="buttons">
                <button onClick={() => handleSendButton()} disabled={isDisabled}>OK</button>
                <button onClick={() => closeActiveProgram('Program Group Properties')}>Cancel</button>
                <button onClick={() => addToActiveProgram('Calculator Help')}>Help</button>
            </div>
        </div>
    )
}

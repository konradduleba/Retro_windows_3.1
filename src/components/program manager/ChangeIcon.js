import React, { useState, useEffect } from 'react'

export default function ChangeIcon({ addToActiveProgram, closeActiveProgram, programItemsData, iconData, changeProgramItemsData }) {
    const [comline, changeComline] = useState('');
    const [icon, changeIcon] = useState(false);

    useEffect(() => {
        if (!iconData)
            if (programItemsData) {
                const { dir, name, icon } = programItemsData;
                changeComline(`${dir}/${name}`);
                changeIcon(icon);
            }
            else return null;
        else {
            const { dir, name, icon } = iconData;
            changeComline(`${dir}/${name}`);
            changeIcon(icon);
        }

    }, [programItemsData, iconData])

    function sendButton() {
        closeActiveProgram('Change Icon');
        changeProgramItemsData(iconData)
    }

    return (
        <div className="main">
            <div className="paragraphs">
                <p>File Name:</p>
                <p>Current Icon:</p>
            </div>
            <div className="inputFields">
                <input value={comline} onChange={e => changeComline(e.target.value)}></input>
                <div className="chooseIcon">
                    {icon && <img src={icon} alt={programItemsData.name} />}

                </div>
            </div>
            <div className="buttons">
                <button onClick={sendButton}>OK</button>
                <button onClick={() => closeActiveProgram('Change Icon')}>Cancel</button>
                <button onClick={() => addToActiveProgram('Program Items Browse')}>Browse...</button>
                <button onClick={() => addToActiveProgram('Calculator Help')}>Help</button>
            </div>
        </div>
    )
}

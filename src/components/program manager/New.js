import React, { useState } from 'react'

export default function New({ addToActiveProgram, closeActiveProgram }) {
    const [isCheckedBtnOne, handleCheckBtnOne] = useState(true);
    const [isCheckedBtnTwo, handleCheckBtnTwo] = useState(false);

    const handleChange = id => {
        if (id === 'checkboxPG') {
            handleCheckBtnOne(true);
            handleCheckBtnTwo(false);
        }
        else {
            handleCheckBtnOne(false);
            handleCheckBtnTwo(true);
        }
    }

    function handleSendButton() {
        closeActiveProgram('New Program Object');
        if (isCheckedBtnOne) return addToActiveProgram('Program Group Properties')
        else return addToActiveProgram('Program Items Properties')
    }

    return (
        <div className="newContent">
            <div className='main'>
                <p className="new">New</p>
                <div>
                    <input
                        type="checkbox"
                        id="checkboxPG"
                        className="checkbox-round"
                        checked={isCheckedBtnOne}
                        onChange={event => handleChange(event.target.id)}
                    />
                    <label htmlFor="checkboxPG">Program Group</label>
                </div>
                <div>
                    <input type="checkbox"
                        id="checkboxPI"
                        className="checkbox-round"
                        checked={isCheckedBtnTwo}
                        onChange={event => handleChange(event.target.id)}
                    />
                    <label htmlFor="checkboxPI">Program Item</label>
                </div>
            </div>
            <div className="buttons">
                <button onClick={() => handleSendButton()}>OK</button>
                <button onClick={() => closeActiveProgram('New Program Object')}>Cancel</button>
                <button onClick={() => addToActiveProgram('Calculator Help')}>Help</button>
            </div>
        </div>
    )
}

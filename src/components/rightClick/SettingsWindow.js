import React from 'react';

const SettingsWindow = props => {
    const { name, icon } = props.properties;
    return (
        <>
            <div className='navigation' onMouseDown={(event) => props.mousedown(event)}>
                <p>{name}</p>
                <p><i className="icon-cancel-1" onClick={() => props.closeOptionsWindow()}></i></p>
            </div>
            <div className='container'>
                <div className='icon_name'>
                    <img src={icon} alt={name}></img>
                    <input type="text" placeholder={name} maxLength="15" onChange={props.programNameChange}></input>
                </div>
                <div className="data">
                    <p>Opis:</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nam porta, magna quis consectetur molestie, ligula diam bibendum ex.</p>
                </div>
                <div className="endButtons">
                    <button onClick={() => props.closeOptionsWindow()}>Anuluj</button>
                    <button>Zastostuj</button>
                </div>
            </div>
        </>
    )
}

export default SettingsWindow
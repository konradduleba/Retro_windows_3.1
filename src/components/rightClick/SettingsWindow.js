import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

export default function SettingsWindow({ mousedown, closeOptionsWindow, programNameChange, properties }) {
    const { name, icon } = properties;
    return (
        <>
            <div className='navigation' onMouseDown={event => mousedown(event)}>
                <p>{name}</p>
                <p><CloseOutlined onClick={() => closeOptionsWindow()} /></p>
            </div>
            <div className='container'>
                <div className='icon_name'>
                    <img src={icon} alt={name}></img>
                    <input type="text" placeholder={name} maxLength="15" onChange={programNameChange}></input>
                </div>
                <div className="data">
                    <p>Opis:</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nam porta, magna quis consectetur molestie, ligula diam bibendum ex.</p>
                </div>
                <div className="endButtons">
                    <button onClick={() => closeOptionsWindow()}>Anuluj</button>
                    <button>Zastostuj</button>
                </div>
            </div>
        </>
    )
}
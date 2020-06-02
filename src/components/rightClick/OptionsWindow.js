import React from 'react';
import { CloseOutlined, UpOutlined, SettingOutlined } from '@ant-design/icons';

export default function OptionsWindow({ addToActiveProgram, closeOptionsWindow, closeDesktopProgram, closeActiveProgram, showSettingsWindow, properties }) {
    const { top, left, name, icon } = properties;
    return (
        <>
            <div className='optionsWindow' style={{ top: `${top}px`, left: `${left}px` }}>
                <ul>
                    <li onClick={() => {
                        addToActiveProgram(name, icon);
                        closeOptionsWindow();
                    }}>
                        <UpOutlined />
                        <p>Otwórz</p>
                    </li>
                    <li onClick={() => {
                        closeDesktopProgram(name);
                        closeActiveProgram(name);
                        closeOptionsWindow();
                    }}>
                        <CloseOutlined />
                        <p>Zamknij</p>
                    </li>
                    <li onClick={() => showSettingsWindow()}>
                        <SettingOutlined />
                        <p>Ustawienia</p>
                    </li>
                </ul>
            </div>
            <div className='optionCloseWindow' onClick={() => closeOptionsWindow()}></div>
        </>
    )
}
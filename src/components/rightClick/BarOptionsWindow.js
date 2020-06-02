import React from 'react';
import { CloseSquareOutlined, BorderOutlined, MinusOutlined } from '@ant-design/icons';

export default function BarOptionsWindow({ minimalizeApp, closeActiveProgram, maximize, closeOptionsWindow, closeDesktopProgram, properties }) {
    const { top, left, name, icon } = properties;
    return (
        <>
            <div className='optionsWindow' style={{ top: `${top}px`, left: `${left}px`, }}>
                <ul>
                    <li onClick={() => {
                        minimalizeApp(name, icon);
                        closeActiveProgram(name);
                    }}>
                        <MinusOutlined />
                        <p>Minimalizuj</p>
                    </li>
                    <li onClick={() => {
                        maximize();
                        closeOptionsWindow();
                    }}>
                        <BorderOutlined />
                        <p>Maksymalizuj</p>
                    </li>
                    <li onClick={() => {
                        closeActiveProgram(name);
                        closeDesktopProgram(name)
                    }}>
                        <CloseSquareOutlined />
                        <p>Zamknij</p>
                    </li>
                </ul>
            </div>
            <div className='optionCloseWindow' onClick={() => closeOptionsWindow()}></div>
        </>
    )
}
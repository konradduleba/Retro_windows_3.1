import React from 'react';

const OptionsWindow = props => {
    const { top, left, name, icon } = props.properties;
    const styles = {
        top: `${top}px`,
        left: `${left}px`
    }
    return (
        <>
            <div className='optionsWindow' style={styles}>
                <ul>
                    <li onClick={() => {
                        props.addToActiveProgram(name, icon);
                        props.closeOptionsWindow();
                    }}>
                        <i className='icon-up-open'></i><p>Otwórz</p>
                    </li>
                    <li onClick={() => {
                        props.handleCloseWindow(name);
                        props.closeOptionsWindow();
                    }}>
                        <i className="icon-window-close"></i>
                        <p>Zamknij</p>
                    </li>
                    <li onClick={() => props.showSettingsWindow()}>
                        <i className="icon-cog"></i>
                        <p>Ustawienia</p>
                    </li>
                </ul>
            </div>
            <div className='optionCloseWindow' onClick={() => props.closeOptionsWindow()}></div>
        </>
    )
}

export default OptionsWindow
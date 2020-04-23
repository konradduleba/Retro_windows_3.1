import React from 'react';

const BarOptionsWindow = props => {

    const { top, left, name, icon } = props.properties
    const styles = {
        top: `${top}px`,
        left: `${left}px`,
    }
    return (
        <>
            <div className='optionsWindow' style={styles}>
                <ul>
                    <li onClick={() => {
                        props.handleMinimalizeApp(name, icon);
                        props.closeWindow(name);
                    }}>
                        <i className="icon-window-minimize"></i><p>Minimalizuj</p>
                    </li>
                    <li onClick={() => {
                        props.maximize();
                        props.closeOptionsWindow();
                    }}>
                        <i className="icon-window-maximize"></i><p>Maksymalizuj</p>
                    </li>
                    <li onClick={() => props.handleCloseWindow(name)}>
                        <i className="icon-window-close"></i>
                        <p>Zamknij</p>
                    </li>
                </ul>
            </div>
            <div className='optionCloseWindow' onClick={() => props.closeOptionsWindow()}></div>
        </>
    )
}

export default BarOptionsWindow
import React from 'react';
import '../../styles/AboutProgram.scss';
// import AboutProgramIcon from '../../img/help.png';

export default function AboutProgram({ properties, type, closeActiveProgram, closeDesktopProgram }) {
    const { name, icon } = properties;
    return (
        <div className='aboutContainer'>
            <img src={icon} alt={name}></img>
            <div className='info'>
                <div className="mainInfo">
                    <p>Based on Microsoft Windows {name}</p>
                    <p>Version 3.1</p>
                    <p>Copyright © 1985-1992 Microsoft Corp.</p>
                </div>
                <div className="licence">
                    <p>This product is licenced to:</p>
                    <p>DulconPC</p>
                </div>
                <div className="serialNumber">
                    <p>Do u know that, turtle are not "inside" their shells. They *are* their shells</p>
                </div>
                <div className="sysInfo">
                    <p>{type} Mode</p>
                </div>
            </div>
            <button onClick={() => {
                closeActiveProgram(`About ${name}`)
                closeDesktopProgram(`About ${name}`)
            }}>OK</button>
        </div>
    )
}
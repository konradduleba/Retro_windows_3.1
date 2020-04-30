import React from 'react';
import '../../styles/AboutProgram.scss'
import AboutProgramIcon from '../../img/help.png'

class AboutProgram extends React.Component {

    render() {

        const { name, icon } = this.props.properties;

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
                        <p>{this.props.type} Mode</p>
                    </div>
                </div>
                <button onClick={() => this.props.handleCloseWindow(`About ${name}`, AboutProgramIcon)}>OK</button>
            </div>
        )
    }
}

export default AboutProgram
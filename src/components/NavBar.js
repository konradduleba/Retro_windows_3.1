import React from 'react';
import '../styles/NavBar.scss';

const NavBar = props => {
    return (
        <div className="navBar">
            <button onClick={() => {
                props.handleMinimalizeWindow(props.name, props.logo);
                props.handleCloseWindow()
            }}><i className="icon-minus-1"></i></button>
            <p>{props.name}</p>
            <button onClick={() => { props.handleCloseWindow(props.name) }}><i className="icon-cancel-1"></i></button>
        </div>
    )
}

export default NavBar
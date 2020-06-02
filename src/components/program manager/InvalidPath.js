import React from 'react'
import InvalidPathIcon from '../../img/invalidpath.png'

export default function InvalidPath({ path, closeActiveProgram }) {

    function closePrograms() {
        setTimeout(() => {
            closeActiveProgram('Program Items Properties');
        }, 200);
        closeActiveProgram('Invalid Path');
    }
    return (
        <div className="main">
            <div className="info">
                <img src={InvalidPathIcon} alt="invalidPath" />
                <p>The path {path} is invalid.</p>
            </div>
            <div className="buttons">
                <button onClick={closePrograms}>OK</button>
                <button onClick={() => closeActiveProgram('Invalid Path')}>Cancel</button>
            </div>
        </div>
    )
}

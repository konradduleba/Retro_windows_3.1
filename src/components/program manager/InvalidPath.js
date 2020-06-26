import React from 'react'
import InvalidPathIcon from '../../img/invalidpath.png'

export default function InvalidPath({ path, closeActiveProgram, type }) {

    function closePrograms() {
        setTimeout(() => {
            closeActiveProgram('Program Items Properties');
        }, 200);
        // closeActiveProgram('Program Items Properties');
        if (type === 'invalidPath')
            closeActiveProgram('Invalid Path');
        else if (type === 'programName')
            closeActiveProgram('Wrong Program Name');
        else if (type === 'dirName')
            closeActiveProgram('Wrong Directory Name');
    }
    return (
        <div className="main">
            <div className="info">
                <>
                    <img src={InvalidPathIcon} alt="invalidPath" />
                    {type === 'invalidPath' &&
                        <p>The path {path} is invalid.</p>
                    }
                    {type === 'programName' &&
                        <p>Program name is invalid. The name may already be taken.</p>
                    }
                    {type === 'dirName' &&
                        <p>Directory is invalid. The name may already be taken.</p>
                    }
                </>
            </div>
            <div className="buttons">
                <button onClick={closePrograms}>OK</button>
                {type === 'invalidPath' &&
                    <button onClick={() => closeActiveProgram('Invalid Path')}>Cancel</button>
                }
                {type === 'programName' &&
                    <button onClick={() => closeActiveProgram('Wrong Program Name')}>Cancel</button>
                }
                {type === 'dirName' &&
                    <button onClick={() => closeActiveProgram('Wrong Directory Name')}>Cancel</button>
                }
            </div>
        </div>
    )
}

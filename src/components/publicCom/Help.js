import React from 'react'
import '../../styles/Help.scss'

class Help extends React.Component {

    state = {}

    render() {
        return (
            <div className='helpContainer'>
                <nav className='helpNavigation'>
                    <ul>
                        <li>File</li>
                        <li>Edit</li>
                        <li>Bookmark</li>
                        <li>Help</li>
                    </ul>
                </nav>
                <div className='functionButtons'>
                    <button>Contents</button>
                    <button>Search</button>
                    <button>Back</button>
                    <button>History</button>
                    <button>Glossary</button>
                </div>
                <div className='mainContent'>
                    <div className='title'>
                        <h2>Contents for Calculator Help</h2>
                        <p>You can use Windows Calculator to perform simple calculations or solve scientific mathematical problems</p>
                        <p>To learn how to use Help, press F1</p>
                    </div>
                    <div className='HowTo'>
                        <h2>How To...</h2>
                        <p>Convert Values to Other Number Systems</p>
                        <p>Enter Calculations</p>
                        <p>Switch Calculations</p>
                        <p>Use Advanced Statistical Functions</p>
                        <p>Use Calculator with the Clipboard</p>
                        <p>Use Memory Functions</p>
                        <p>Use Number-Base Functions</p>
                        <p>Use Operators</p>
                        <p>Use Other Advanced Functions</p>
                        <p>Use Scientific Calculator's Statistical Functions</p>
                        <p>Use Standard Calculator Functions</p>
                    </div>
                    <div className='Commands'>
                        <h2>Commands</h2>
                        <p>Edit Menu Commands</p>
                        <p>View Menu Commands</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Help
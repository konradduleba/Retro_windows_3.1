import React from 'react';

import Clock from '../clock/Clock';
import Calculator from '../calculator/Calculator';
import SetFont from '../publicCom/SetFont';
import Help from '../publicCom/Help';
import RenderIconsInWindow from '../mechanics/RenderIconsInWindow';
import New from '../program manager/New';
import ProgramGroupProperties from '../program manager/ProgramGroupProperties';
import ProgramItemsProperties from '../program manager/ProgramItemsProperties';
import InvalidPath from '../program manager/InvalidPath';
import ProgramItemsBrowse from '../program manager/Browse';
import ChangeIconPM from '../program manager/ChangeIcon';
import Open from '../program manager/Open';
import AboutProgram from '../publicCom/AboutProgram';

export default function RunProgram(props) {

    const { activeProgram: name, icon, addedPrograms } = props;
    return (
        <>
            {name === 'Clock' &&
                <Clock
                    {...props}
                    properties={{ name, icon }}
                />
            }

            {name === 'Calculator' &&
                <Calculator
                    {...props}
                    properties={{ name, icon }}
                />
            }

            {name === 'Calculator Help' &&
                <Help
                    {...props}
                />
            }

            {name === 'About Clock' &&
                <AboutProgram
                    {...props}
                    properties={{ name: 'Clock', icon }}
                />
            }

            {name === 'About Calculator' &&
                <AboutProgram
                    {...props}
                    properties={{ name: 'Calculator', icon }}
                />
            }

            {name === 'SetFont' &&
                <SetFont
                    {...props}
                />
            }

            {addedPrograms.filter(program => program.name === name) &&
                <RenderIconsInWindow
                    {...props}
                    type={name.toLowerCase()}
                />
            }

            {name === 'About Program Manager' &&
                <AboutProgram
                    {...props}
                    properties={{ name: 'Program Manager', icon }}
                />
            }

            {name === 'New Program Object' &&
                <New
                    {...props}
                />
            }

            {name === 'Program Group Properties' &&
                <ProgramGroupProperties
                    {...props}
                />
            }

            {name === 'Program Items Properties' &&
                <ProgramItemsProperties
                    {...props}
                />
            }

            {name === 'Wrong Program Name' &&
                <InvalidPath
                    {...props}
                    type="programName"
                />
            }

            {name === 'Wrong Directory Name' &&
                <InvalidPath
                    {...props}
                    type="dirName"
                />
            }

            {name === 'Invalid Path' &&
                <InvalidPath
                    {...props}
                    type='invalidPath'
                />
            }

            {name === 'Program Items Browse' &&
                <ProgramItemsBrowse
                    {...props}
                />
            }

            {name === 'Change Icon' &&
                <ChangeIconPM
                    {...props}
                />
            }

            {name === 'Run' &&
                <Open
                    {...props}
                    type='run'
                />
            }

            {name === 'Delete' &&
                <Open
                    {...props}
                    type='delete'
                />
            }
            {name === 'Move' &&
                <Open
                    {...props}
                    type='move'
                    program='move'
                />
            }

            {name === 'Copy' &&
                <Open
                    {...props}
                    type='move'
                    program='copy'
                />
            }
        </>
    )
}

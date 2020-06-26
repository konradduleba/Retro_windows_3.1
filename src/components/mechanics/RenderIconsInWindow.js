import React from 'react';

import RenderAppIcon from './RenderAppIcon';
import RenderMenu from '../program manager/Menu';

import data from '../utils/menu.json';
import { ControlPanelIcons, GamesIcons, StartUpIcons, MVBIcons, MainIcons, AccessoriesIcons, ProgramManagerIcons } from '../utils/images';

export default function RenderIconsInWindow(props) {
    const { type, addedPrograms, addedProgramsByUser } = props;
    return (
        <div className="appList" style={{ zIndex: "40" }}>
            {type === 'programManager' &&
                <>
                    <RenderMenu
                        menuList={data}
                        {...props}
                    />
                    <RenderAppIcon
                        {...props}
                        programList={ProgramManagerIcons}
                    />

                    {addedPrograms && <RenderAppIcon
                        {...props}
                        programList={addedPrograms}
                    />}
                </>
            }
            {type === 'accessories' &&
                <RenderAppIcon
                    {...props}
                    programList={AccessoriesIcons}
                />
            }
            {type === 'games' &&
                <RenderAppIcon
                    {...props}
                    programList={GamesIcons}
                />
            }
            {type === 'startUp' &&
                <RenderAppIcon
                    {...props}
                    programList={StartUpIcons}
                />
            }
            {type === 'microsoft visual basic' &&
                <RenderAppIcon
                    {...props}
                    programList={MVBIcons}
                />
            }
            {type === 'main' &&
                <RenderAppIcon
                    {...props}
                    programList={MainIcons}
                />
            }
            {type === 'controlPanel' &&
                <RenderAppIcon
                    {...props}
                    programList={ControlPanelIcons}
                />
            }
            {addedPrograms.filter(program => program.name === type) &&
                <RenderAppIcon
                    {...props}
                    programList={addedProgramsByUser.filter(program => program.dir.toLowerCase() === type.toLowerCase())}
                />
            }
        </div>
    )
}

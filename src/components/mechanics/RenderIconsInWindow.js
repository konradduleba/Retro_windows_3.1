import React from 'react';
import { ControlPanelIcons, GamesIcons, StartUpIcons, MVBIcons, MainIcons, AccessoriesIcons, ProgramManagerIcons } from '../utils/images'
// import { MenuProgramManager } from '../utils/menu'
import RenderAppIcon from './RenderAppIcon';
import RenderMenu from '../program manager/Menu';
import data from '../utils/menu.json';

export default function RenderIconsInWindow(props) {
    const { type, addedPrograms } = props;
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
                    {console.log(addedPrograms)}
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
            {type === 'mvb' &&
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
        </div>
    )
}

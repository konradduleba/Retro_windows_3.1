import RenderAppWindow from './RenderAppWindow';
import React from 'react'

export default function RenderActiveApp(props) {
    return (
        props.activeApps.map(app =>
            <RenderAppWindow
                {...props}
                key={app.name}
                activeProgram={app.name}
                icon={app.icon}
            />)
    )
}
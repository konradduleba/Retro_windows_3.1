import React from 'react'

export default function Keys({ keysTable, changeResult }) {
    const checkStyle = index => {
        if (index < 3) return 'red'
        else if (index === 3 || index === 9 || index === 15 || index === 21) return 'pink'
        else if ((index > 3 && index < 7) || (index > 9 && index < 13) || (index > 15 && index < 19) || (index > 21 && index < 25)) return 'blue'
        else if (index === 7 || index === 13 || index === 19 || index === 25 || index === 26) return 'redAndBlack'
        else return 'green'
    }

    return (
        keysTable.map((key, index) => <li key={key} className={`key ${checkStyle(index)}`} onClick={() => changeResult(key)}>{key}</li>)
    )
}
import React from 'react'
import classes from './Loader.module.css'

export default function Loader() {
    return (
        <div className={classes.Container}>
            <div className={classes.LdsSpinner}><div></div><div></div><div></div><div>
            </div><div></div><div></div><div></div><div></div><div></div><div></div>
                <div></div><div></div></div>
        </div>
    )
}

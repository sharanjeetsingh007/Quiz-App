import React, { useEffect, useState } from 'react'
import './ProgressBar.css'
import LinearProgress from '@mui/material/LinearProgress';
import { useLocation } from 'react-router-dom';





function ProgressBar({ currentQuestion }) {

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (currentQuestion > 9) {
            setProgress(100)
        }
        else {
            setProgress(currentQuestion * 10)
        }

    }, [currentQuestion])

    return (
        <LinearProgress variant="determinate" value={progress} color="inherit"
            style={{ color: "#04c3a6" }}
        />
    )
}

export default ProgressBar
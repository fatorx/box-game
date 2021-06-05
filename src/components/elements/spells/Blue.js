
import React from 'react';

/**
 * Component for display Green spell
 */
const Blue = ({view, command}) => {

    return (
        <div className={`command command-${command} ${!view ? "hide" : ""}`} />
    );
}

export default Blue;

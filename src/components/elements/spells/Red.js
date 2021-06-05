
import React from 'react';

/**
 * Component for display Green spell
 */
const Red = ({view, command}) => {

    return (
        <div className={`command command-${command} ${!view ? "hide" : ""}`} />
    );
}

export default Red;

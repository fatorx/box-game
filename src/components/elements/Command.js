import React from "react";

import BlueSpell from "./spells/Blue";
import RedSpell from "./spells/Red";
import GreenSpell from "./spells/Green";

/**
 * Component for display select magic
 */
const Command = ({option, view, command, callbackStatus}) => {

    if (option === 1) {
        let element = '';

        switch (command) {
            case 'blue-magic' :
                element = <BlueSpell view={view} command={command} />;
                break;

            case 'red-magic' :
                element = <RedSpell view={view} command={command} />;
                break;

            case 'green-magic' :
                element = <GreenSpell view={view} command={command} />;
                break;

            default:
                element = <RedSpell view={view} command={command} />;
                break;
        }

        callbackStatus();
        return element;
    }
    return (
        <div className="command" />
    );
};

export default Command;

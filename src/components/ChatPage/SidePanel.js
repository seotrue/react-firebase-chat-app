import React from 'react';
import UserPanel from "./UserPanel";
import Favorited from "./Favorited";
import ChatRooms from "./ChatRooms";
import DireactMessages from "./DireactMessages";

const SidePanel = () => {
    return (
        <div>
            <UserPanel/>
            <Favorited/>
            <ChatRooms/>
            <DireactMessages/>
        </div>
    );
};

export default SidePanel;
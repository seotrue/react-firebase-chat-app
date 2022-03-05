import React from 'react';
import SidePanel from "./SidePanel";
import MainPanel from "./MainPanel";

const ChatPage = () => {
    return (
        <div style={{display:'flex'}}>
            <div style={{width:'300px'}}>
                <SidePanel
                    key={}
                />
            </div>
            <div style={{width: '100%'}}>
                <MainPanel />
            </div>
        </div>
    );
};

export default ChatPage;
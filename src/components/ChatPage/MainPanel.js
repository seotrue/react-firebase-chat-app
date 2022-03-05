import React, {Component} from 'react';
import MessageHeader from "./MessageHeader";
import Message from "./Message";
import MessageForm from "./MessageForm";

class MainPanel extends Component {
    render() {
        return (
            <div style={{padding: '2rem 2rem 0 2rem'}}>
                <MessageHeader/>
                <div style={{
                    width:'100%',
                    height:'450px',
                    overflowY:'auto'
                }}>
                    <Message/>
                </div>

                <MessageForm/>
            </div>
        );
    }
}

export default MainPanel;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaPlus } from 'react-icons/fa';
import { FaRegSmileWink } from 'react-icons/fa';

class ChatRooms extends Component {
    state ={
        show: false,
    }
    handleClose = () => this.setState({ show: false })
    handleShow = () => this.setState({ show: true })

    render() {
        return (
            <>
                <div style={{
                    position: 'relative', width: '100%',
                    display: 'flex', alignItems: 'center'
                }}>
                    <FaRegSmileWink style={{ marginRight: 3 }} />
                    CHAT ROOMS{" "} ({chatRooms.length})

                    <FaPlus
                        style={{
                            position: 'absolute',
                            right: 0, cursor: 'pointer'
                        }}
                        onClick={this.handleShow}
                    />
                </div>
                {/* only on click show */}
                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create a chat room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    onChange={(e) => this.setState({ name: e.target.value })}
                                    type="text"
                                    placeholder="Enter chat room name"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    onChange={(e) => this.setState({ description: e.target.value })}
                                    type="text"
                                    placeholder="Enter chat room description"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

ChatRooms.propTypes = {};

export default ChatRooms;
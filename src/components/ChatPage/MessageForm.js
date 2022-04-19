import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MessageForm = () => {
    const [content, setContent] = useState()
    const handleChange = (e) => {

    };
    // 메세지 보내기 버튼
    const handleSubmit = ()=> {

    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control
                        onKeyDown={handleKeyDown}
                        value={content}
                        onChange={handleChange}
                        as="textarea"
                        rows={3}
                    />
                </Form.Group>
            </Form>

            {!(percentage === 0 || percentage === 100) &&
            <ProgressBar
                variant="warning"
                label={`${percentage}%`}
                now={percentage} />
            }

            <br />
            <div>
                {errors.map(errorMsg => <p style={{ color: 'red' }} key={errorMsg}>{errorMsg}</p>)}
            </div>

            <Row>
                <Col>
                    <button onClick={handleSubmit}
                            type="submit"
                            style={{ width: '100%' }}
                            disabled={loading ? true : false}
                    >
                        SEND
                    </button>{' '}
                </Col>
                <Col>
                    <button onClick={handleOpenImageRef}
                            type="submit"
                            style={{ width: '100%' }}
                            disabled={loading ? true : false}
                    >
                        UPLOAD
                    </button>{' '}
                </Col>
            </Row>

            <input
                type="file"
                accept="image/jpeg, image/png"
                ref={inputOpenImageRef}
                style={{ display: "none" }}
                onChange={handleUploadImage}
            />

        </div>
    )
};

export default MessageForm;
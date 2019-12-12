import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"

const NewSightingsModal = (props) => {

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} className='modal'>
                <Modal.Header closeButton>
                  <Modal.Title>A New Sighting Appears!</Modal.Title>
                </Modal.Header>

                <Form>
                  <Modal.Body className='m-auto'>

                    <Form.Group controlId="flower">
                      <Form.Label className="form-label">Flower Sighted: </Form.Label>
                      <Form.Control type="text" placeholder="Large text" />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="person">
                      <Form.Label className="form-label">Member Name: </Form.Label>
                      <Form.Control type="text" placeholder="Large text" />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="location">
                      <Form.Label className="form-label">Location: </Form.Label>
                      <Form.Control type="text" placeholder="Large text" />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="date">
                      <Form.Label className="form-label">Date: </Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>

                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleSubmit}>
                        Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default NewSightingsModal;
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

                <Form onSubmit={props.handleSubmit}>
                  <Modal.Body className='m-auto'>

                    <Form.Group controlId="flower">
                      <Form.Label className="form-label">Flower Sighted: </Form.Label>
                      <Form.Control type="text" placeholder="Flower name" required={true} value={props.flower} onChange={event => props.setFlower(event.target.value)}/>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="person">
                      <Form.Label className="form-label">Member Name: </Form.Label>
                      <Form.Control type="text" placeholder="Member name" required={true} value={props.member} onChange={event => props.setMember(event.target.value)}/>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="location">
                      <Form.Label className="form-label">Location: </Form.Label>
                      <Form.Control type="text" placeholder="Location found" required={true} value={props.location} onChange={event => props.setLocation(event.target.value)}/>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="date">
                      <Form.Label className="form-label">Date: </Form.Label>
                      <Form.Control type="date" required={true} value={props.date} onChange={event => props.setDate(event.target.value)}/>
                    </Form.Group>

                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default NewSightingsModal;
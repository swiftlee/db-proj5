import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SightingsModal = (props) => {

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} className='modal'>
                <Modal.Header closeButton>
                    <Modal.Title>{props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center m-auto'>
                    <table>
                        <thead className='table-head'>
                        <tr>
                            <td>Sighter</td>
                            <td>Location</td>
                            <td>Date</td>
                        </tr>
                        </thead>
                        <tbody className='table-body'>
                        {props.flowers.map((flower) => {
                            return <tr>
                                <td>{flower.PERSON}</td>
                                <td>{flower.LOCATION}</td>
                                <td>{flower.SIGHTED}</td>
                            </tr>;
                        })}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer className="my-modal-footer">
                    <Form onSubmit={props.handleSubmit}>
                        <Form.Group controlId="date">
                            <Form.Label className="form-label">Genus: </Form.Label>
                            <Form.Control required={true} value={props.genus} onChange={event => props.setGenus(event.target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="date">
                            <Form.Label className="form-label">Species: </Form.Label>
                            <Form.Control required={true} value={props.species} onChange={event => props.setSpecies(event.target.value)}/>
                        </Form.Group>
                        <br/>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SightingsModal;

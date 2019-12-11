import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";

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
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SightingsModal;

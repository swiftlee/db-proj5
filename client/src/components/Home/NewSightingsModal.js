import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"

const NewSightingsModal = (props) => {
  const [flower, setFlower] = useState('');
  const [member, setMember] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const printValues = () => {
    console.log(flower + ' ' + member + ' ' + location + ' ' + date);
  }

  const handleSubmit = () => {
    console.log(flower + ' ' + member + ' ' + location + ' ' + date);
    // console.log(flower + ' ' + member + ' ' + location + ' ' + date);
    // axios.get(`/api/flowers/${name.replace(' ', '%20')}`).then((res) => {
    //     setSelection(res.data);
    // });
}
  return (
        <>
            <Modal show={props.show} onHide={props.handleClose} className='modal'>
                <Modal.Header closeButton>
                  <Modal.Title>A New Sighting Appears!</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit}>
                  <Modal.Body className='m-auto'>

                    <Form.Group controlId="flower">
                      <Form.Label className="form-label">Flower Sighted: </Form.Label>
                      <Form.Control type="text" placeholder="Large text" value={flower} onChange={event => setFlower(event.target.value)}/>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="person">
                      <Form.Label className="form-label">Member Name: </Form.Label>
                      <Form.Control type="text" placeholder="Large text" value={member} onChange={event => setMember(event.target.value)}/>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="location">
                      <Form.Label className="form-label">Location: </Form.Label>
                      <Form.Control type="text" placeholder="Large text" value={location} onChange={event => setLocation(event.target.value)}/>
                    </Form.Group>
                    <br />
                    <Form.Group controlId="date">
                      <Form.Label className="form-label">Date: </Form.Label>
                      <Form.Control type="date" value={date} onChange={event => setDate(event.target.value)}/>
                    </Form.Group>

                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default NewSightingsModal;
import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import axios from 'axios';

const NewSightingsModal = (props) => {
  const [flower, setFlower] = useState('');
  const [member, setMember] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // var formData = new FormData();
    // formData.append('name', flower);
    // formData.append('person', member);
    // formData.append('location', location);
    // formData.append('sighted', date);
    console.log(flower + ' ' + member + ' ' + location + ' ' + date);
    // axios({
    //   method: 'post',
    //   url: '/api/flowers/insert',
    //   data: {
    //     name: flower,
    //     person: member,
    //     location: location,
    //     date: date
    //   },
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //   },
    // });
    axios.post('/api/flowers/insert', {flower, member, location, date})
    .then((res) => {
      console.log("Heres the response: " + res.status);
    }).catch((err) => {
      console.log("Oops something not right boi\n");
      console.log(err);
    })
   
    // axios.post('/user', {
    //   firstName: 'Fred',
    //   lastName: 'Flintstone'
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
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
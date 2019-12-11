import axios from 'axios';
import Image from 'react-bootstrap/Image';
import React, {useState, useEffect} from 'react';
import SightingsModal from "../SightingsModal";
import Container from "react-bootstrap/Container";

const FlowerGrid = (props) => {

    const [flowers, setFlowers] = useState([]);
    const [selection, setSelection] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        axios.get('/api/flowers/').then((res) => {
            setFlowers(res.data);
        });
    }, [axios]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = name => {
        axios.get(`/api/flowers/${name.replace(' ', '%20')}`).then((res) => {
            setSelection(res.data);
        });
        setShow(true);
        setSelected(name);
    };

    return (
        <Container className='grid flower-card'>
            {
                flowers.map((img, index) => {
                    return <Flower name={img.COMNAME} src={props.imgs[index]} click={handleShow}/>;
                })
            }
        <SightingsModal show={show} flowers={selection} handleClose={handleClose} name={selected}/>
        </Container>
    )
};

const Flower = (props) => {
    return (
        <div style={{padding: '20px'}}>
            <h5>{props.name}</h5>
            <Image onClick={() => props.click(props.name)} className='flower-card' src={props.src} rounded style={{cursor: 'pointer', width: '200px', height: '200px'}}/>
        </div>
    );
};

export default FlowerGrid;

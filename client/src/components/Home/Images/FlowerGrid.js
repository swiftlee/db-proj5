import axios from 'axios';
import Image from 'react-bootstrap/Image';
import React, {useState, useEffect} from 'react';
import SightingsModal from "../SightingsModal";
import Container from "react-bootstrap/Container";

const FlowerGrid = (props) => {

    const [flowers, setFlowers] = useState([]);
    const [selection, setSelection] = useState([]);
    const [selected, setSelected] = useState('');
    const [genus, setGenus] = useState('');
    const [species, setSpecies] = useState('')
    const [image, setImage] = useState('');

    useEffect(() => {
        axios.get('/api/flowers/').then((res) => {
            setFlowers(res.data);
        });
    }, [axios]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (name, src) => {
        axios.get(`/api/flowers/${name.replace(' ', '%20')}`).then((res) => {
            setSelection(res.data);
            setGenus(res.data[0].GENUS);
            setSpecies(res.data[0].SPECIES);
        });
        setShow(true);
        setSelected(name);
        setImage(src);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(genus);
        console.log(species);
        console.log(selected);
        axios.post('/api/flowers/update', {genus, species, selected})
        .then((res) => {
            if(res.status === 200){
                console.log("flower created");
            }
        })
        handleClose();
    }

    return (
        <Container className='grid flower-container'>
            {
                flowers.filter(img => {
                    if (props.filter.trim() !== '') {
                        const regexp = new RegExp(props.filter.trim().toLowerCase().replace(/\\/g, '&#92;'), 'gi');
                        if (img.COMNAME) {
                            const result = img.COMNAME.trim().toLowerCase().match(regexp);
                            return result && result.length > 0;
                        }
                        return false;
                    } else
                        return true;
                }).map((img, index) => {
                    return <Flower name={img.COMNAME} src={props.imgs[flowers.indexOf(img)]} click={handleShow}/>;
                })
            }
            <SightingsModal show={show} flowers={selection} 
                            handleClose={handleClose} name={selected}
                            genus={genus} setGenus={setGenus}
                            species={species} setSpecies={setSpecies}
                            handleSubmit={handleSubmit}
                            />
            <SightingsModal show={show} flowers={selection} handleClose={handleClose} name={selected} img={image}/>
        </Container>
    )
};

const Flower = (props) => {
    return (
        <div style={{padding: '20px'}}>
            <h5>{props.name}</h5>
            <Image onClick={() => props.click(props.name, props.src)} className='flower-card' src={props.src} rounded
                   style={{cursor: 'pointer', width: '200px', height: '200px'}}/>
        </div>
    );
};

export default FlowerGrid;

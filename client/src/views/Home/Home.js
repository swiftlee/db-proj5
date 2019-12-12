import React, {useState} from 'react';
import imgs from '../../components/Home/Images/data/imgs';
import FlowerGrid from '../../components/Home/Images/FlowerGrid';
import ImageFilter from "../../components/Home/Images/ImageFilter";
import Button from "react-bootstrap/Button";
import NewSightingsModal from "../../components/Home/NewSightingsModal";


const Home = (props) => {

    const [input, setInput] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow2 = () => {
        setShow(true);
    };

    return (
        <div>
            <h2 className='header-text'>Select a flower!</h2>
            <Button variant="primary" onClick={handleShow2}>Hello!</Button>
            <NewSightingsModal show={show} handleClose={handleClose}/>
            <ImageFilter input={input} setInput={setInput}/>
            <FlowerGrid filter={input} imgs={imgs}/>
        </div>
    )
};

export default Home;

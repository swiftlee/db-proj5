import React, {useState} from 'react';
import imgs from '../../components/Home/Images/data/imgs';
import FlowerGrid from '../../components/Home/Images/FlowerGrid';
import ImageFilter from "../../components/Home/Images/ImageFilter";
import Button from "react-bootstrap/Button";
import NewSightingsModal from "../../components/Home/NewSightingsModal";
import axios from 'axios';


const Home = (props) => {

    const [input, setInput] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [flower, setFlower] = useState('');
    const [member, setMember] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(flower + ' ' + member + ' ' + location + ' ' + date);
        axios.post('/api/flowers/insert', {flower, member, location, date})
        .then((res) => {
          if(res.status == 200){
            alert("New Sighting Created :)");
          }
          setShow(false)
        })
    }
    

    return (
        <div>
            <h2 className='header-text'>Select a flower!</h2>
            <Button variant="secondary" onClick={handleShow}>Hello!</Button>
            <NewSightingsModal 
                show={show} 
                handleClose={handleClose} 
                handleSubmit={handleSubmit}
                flower={flower} setFlower={setFlower}
                member={member} setMember={setMember}
                location={location} setLocation={setLocation}
                date={date} setDate={setDate}
            />
            <ImageFilter input={input} setInput={setInput}/>
            <FlowerGrid filter={input} imgs={imgs}/>
        </div>
    )
};

export default Home;

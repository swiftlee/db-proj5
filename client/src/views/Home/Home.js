import React, {useState} from 'react';
import imgs from '../../components/Home/Images/data/imgs';
import FlowerGrid from '../../components/Home/Images/FlowerGrid';
import ImageFilter from "../../components/Home/Images/ImageFilter";
import Button from "react-bootstrap/Button";
import NewSightingsModal from "../../components/Home/NewSightingsModal";
import axios from 'axios';


const Home = (props) => {

    const [input, setInput] = useState('');
    const [showPost, setShowPost] = useState(false);
    const [flower, setFlower] = useState('');
    const [member, setMember] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');

    const resetModalValues = () => {
        setFlower('');
        setMember('');
        setLocation('');
        setDate('');
    };

    const handleClose = () => {
        resetModalValues();
        setShowPost(false)
    };

    const handlePost = (event) => {
        event.preventDefault();
        console.log(flower + ' ' + member + ' ' + location + ' ' + date);
        axios.post('/api/flowers/insert', {flower, member, location, date})
            .then((res) => {
                alert("New Sighting Created :)");
                handleClose();
            });
    };


        return (
            <div>
                <div className='header-text'>
                    <h2>Southern Sierra Wildflower Club (SSWC)</h2>
                    <Button className="sightings-button" variant="secondary" onClick={() => setShowPost(true)}>Add New
                        Sighting!</Button>
                </div>

                <NewSightingsModal
                    show={showPost}
                    handleClose={handleClose}
                    handleSubmit={handlePost}
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

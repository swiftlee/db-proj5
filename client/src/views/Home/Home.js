import React, {useState} from 'react';
import imgs from '../../components/Home/Images/data/imgs';
import FlowerGrid from '../../components/Home/Images/FlowerGrid';
import ImageFilter from "../../components/Home/Images/ImageFilter";

const Home = (props) => {

    const [input, setInput] = useState('');

    return (
        <div>
            <h2 className='header-text'>Select a flower!</h2>
            <ImageFilter input={input} setInput={setInput}/>
            <FlowerGrid filter={input} imgs={imgs}/>
        </div>
    )
};

export default Home;

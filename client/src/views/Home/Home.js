import React from 'react';
import imgs from '../../components/Home/Images/data/imgs';
import FlowerGrid from '../../components/Home/Images/FlowerGrid';

const Home = (props) => {
    return (
        <div>
            <h2>Choose a flower</h2>
            <FlowerGrid imgs={imgs}/>
        </div>
    )
};

export default Home;

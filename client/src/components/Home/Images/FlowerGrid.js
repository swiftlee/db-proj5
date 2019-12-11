import React, {useState, useEffect} from 'react';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";

const FlowerGrid = (props) => {

    const [rows, setRows] = useState([]);
    const initializeRows = () => {
        let temp = [];
        return props.imgs.map((img, index) => {
            temp.push({name: img.name, src: img.src});
            if (index !== 0 && index % 3 === 0) {
                setRows(...rows, temp);
                console.log(temp);
                temp = [];
            }
        });

        if (temp.length === 0) {
            setRows(...rows, temp);
            temp = [];
        }
    };

    useEffect(() => {
        initializeRows();
    }, []);

    return (
        <Container>
            {
                rows.length > 0 && rows.map((row) => {
                    return <Row>
                        <Flower name={row.name} src={row.src}/>
                    </Row>;
                })
            }
        </Container>
    )
};

const Flower = (props) => {
    return (
        <Col xs={6} md={4} style={{width: '200px', height: '200px', overflow: 'hidden'}}>
            <h5>{props.name}</h5>
            <Image src={props.src} rounded style={{width: '200px', height: '200px'}}/>
        </Col>
    );
};

export default FlowerGrid;
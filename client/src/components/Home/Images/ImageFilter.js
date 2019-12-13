import React, {useState} from 'react';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";

const ImageFilter = (props) => {

    return (
        <Container>
            <InputGroup className='mb-3 mt-3'>
                <InputGroup.Append>
                    <InputGroup.Text id='search'>Filter flowers...</InputGroup.Text>
                </InputGroup.Append>
                <FormControl
                    placeholder="Enter a flower name..."
                    aria-label="Flower"
                    aria-describedby="search"
                    value={props.input}
                    onChange={(e) => props.setInput(e.target.value)}
                />
            </InputGroup>
        </Container>
    )
};

export default ImageFilter;
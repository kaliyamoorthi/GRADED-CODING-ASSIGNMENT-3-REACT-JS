import { SetStateAction, useState } from 'react';
import {Form} from 'react-bootstrap';
import * as React from 'react'
const Searchbar =(props: { onChange: (arg0: string) => void; }) =>{
    const [query,setquery]= useState("");
    const queryChangeHandler =(event: { target: { value: SetStateAction<string>; }; }) =>{
        setquery(event.target.value);
        props.onChange(query);
    };
    const handleSubmit=(e: { preventDefault: () => void; })=>{
        e.preventDefault();
        props.onChange(query);
    };
    return(
        <>
            <Form className="d-flex" onSubmit={handleSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search a movie"
                            value={query}
                            onChange={queryChangeHandler}
                            className="me-2"
                            aria-label="Search"
                        />
                        
              </Form>
        </>
    )
}
export default Searchbar;



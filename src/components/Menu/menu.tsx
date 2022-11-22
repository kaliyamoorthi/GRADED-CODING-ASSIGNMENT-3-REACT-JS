import { useState } from 'react';
import {Navbar,Container,Nav, Form} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import Searchbar from './searchbar';

const Menu = ()=>{
    // const [query1,setquery]= useState("");

    // function getdata(query:any) {
    //      console.log(query);
    //      setquery(query);
    //  }
    return (
        <>
            <Navbar expand="lg" bg="light" variant="light">
                <Container>
                    {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link to="/movies-in-theaters" as={NavLink} >Movies in Theatres</Nav.Link>
                            <Nav.Link to="/movies-coming" as={NavLink}>Coming soon</Nav.Link>
                            <Nav.Link to="/top-rated-india" as={NavLink}>Top rated Indian</Nav.Link>
                            <Nav.Link to="/top-rated-movies" as={NavLink}>Top rated Movies</Nav.Link>
                            <Nav.Link to="/favourites" as={NavLink}>Favourites</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    {/* <Searchbar onChange={getdata}/> */}
                </Container>
            </Navbar>
        </>
    
    )   ;   
}
console.log(Menu);
export default Menu;
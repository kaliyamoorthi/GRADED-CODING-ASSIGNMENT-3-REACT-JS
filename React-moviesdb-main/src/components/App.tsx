import React, { useEffect } from 'react';
import Movies_in_theatre from './Individual Pages/Movies_in_theatre/movies_in_theatre'
import ComingSoon from './Individual Pages/Comingsoon/comingsoon';
import Favourites from './Individual Pages/Favourites/favourites';
import Indian_Movies from './Individual Pages/IndianMovies/indianMovies';
import Movies from './Individual Pages/Movies/movies';
import Menu from './Menu/menu'
import { Route, Routes } from 'react-router';
// import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovDetails from "./Individual Pages/MovieDetails"
import { Navbar, Container, Nav, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Searchbar from './Menu/searchbar';
import { SetStateAction, useState } from 'react';
// import './App.css';

function App() {
  const [query, setquery] = useState("");
  
    const queryChangeHandler = (event: { target: { value: SetStateAction<string>; }; }) => {
      setquery(event.target.value);
      // console.log(query);
    };
    const handleSubmit = (e: any) => {
      e.preventDefault();
    };


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
        </Container>
      </Navbar>
     
      {<Routes>
        <Route path="/:group/:title/:year" element={<MovDetails />} />
        <Route path="/:group/:id" element={<MovDetails />} />
        <Route path="/movies-in-theaters" element={<Movies_in_theatre query={query} />} />
        <Route path="/movies-coming" element={<ComingSoon query={query} />} />
        <Route path="/top-rated-india" element={<Indian_Movies query={query} />} />
        <Route path="/top-rated-movies" element={<Movies query={query} />} />
        <Route path="/favourites" element={<Favourites query={query}></Favourites>} />
        <Route path="/" element={<Movies_in_theatre query={query} />} />
      </Routes> }


    </>


  );
}

export default App;

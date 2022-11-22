
import { Alert, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Imovie from "../models/Imovie";
import MovieItem from "./Listmovieitem";
import { useLocation } from "react-router-dom";
import { render } from "react-dom";

// type props={
//     getmovies():Imovie[];
// }
const ListMovies = (props: { getmovies: () => any; query: string; path: string }) => {
    const [movies, setMovies] = useState<Imovie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Imovie[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [showSuccessAlert, setSuccessshowalert] = useState<boolean>(false);
    const [showFailAlert, setshowFailalert] = useState<boolean>(false);
    const [delFav, setdelFav] = useState<boolean>(true);
    // const [path,setPath] = useState<string>("");

    // const [query, setquery] = useState<string>("");
    // console.log("List:", props.query);
    // setquery(props.query);

    useEffect(
        () => {
            //  setquery(props.query);
            const fetchHepler = async () => {
                try {
                    const data = await props.getmovies();
                    // console.log("data:",data);
                    setMovies(data);
                    setFilteredMovies(data);
                    console.log("movies:", movies);
                }
                catch (error) {
                    setError(error as Error);
                }
            }
            fetchHepler();
        },
        [props.path, movies.length, delFav]
    );
    useEffect(() => {
        const helper = async () => {
            console.log("queryprops:", props.query);
            if (movies) {
                let filtered = props.query.length === 0
                    ? movies
                    : movies.filter(movie =>
                        movie.title.toLowerCase().includes(props.query.toLowerCase())
                    );
                setFilteredMovies(filtered);
                // console.log("Filtered:",filtered);
                console.log("filteredMovies:", filteredMovies);

                // setMovies(filtered);
            }
        }
        helper();
    }, [props.query, props.path, movies.length, delFav]);
    
    const updateafterDelete = function () {
        // ini=val;
        // console.log("inside parent, length:", movies.length);
        // console.log("hi inside parent, val:",val);
        if (delFav) {
            setdelFav(false);
        }
        else {
            setdelFav(true);
        }
    }
    const ShowSuccessAlertfunc = function () {
        setSuccessshowalert(true);
    };
    const ShowFailAlertfunc = function () {
        setshowFailalert(true);
    }
    useEffect(() => { }, [showFailAlert, showSuccessAlert]);

    return (
        <>
            {
                error && (
                    <Alert variant="danger"> error.message</Alert>
                )
            }
            {
                filteredMovies.length !== 0 && (
                    <Row xs={2} md={3} lg={6}>
                        {
                            filteredMovies.map(
                                movie => (
                                    <Col key={movie.title + movie.year + movie.id + movie.releaseDate} className="d-flex my-2">
                                        <MovieItem movieItem={movie} movies={movies} updatedelFav={updateafterDelete}
                                            updatefailalert={ShowFailAlertfunc} updatesuccessalert={ShowSuccessAlertfunc} />
                                    </Col>

                                )
                            )
                        }
                    </Row>
                )
            }

            {
                showSuccessAlert &&
                <Alert variant="success" onClose={() => setSuccessshowalert(false)} dismissible
                    className="position-fixed top-50 end-0 translate-middle"
                >
                    Succesfully added to Favourites
                </Alert>
            }
            {
                showFailAlert &&
                <Alert variant="danger" onClose={() => setshowFailalert(false)} dismissible
                    className="position-fixed top-50 end-0 translate-middle"
                >
                    Already exists in Favourites
                </Alert>
            }


        </>
    )
};
export default ListMovies;
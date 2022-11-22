import Imovie from "../models/Imovie";
import { Card, Button, Alert } from "react-bootstrap";
import FavIcon from "../utils/FavouriteIcon";

import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { response } from "express";
import { render } from "react-dom";
interface Props {
  movieItem: Imovie;
  movies: Imovie[];
  updatedelFav:()=>void;
  updatesuccessalert:()=>void;
  updatefailalert:()=>void;
}

const MovieItem = ({ movieItem, movies,updatedelFav,updatesuccessalert,updatefailalert }: Props) => {
  // const [movieSize,setmovieSize]=useState(movies.length);
  //Setting path for individual Card display
  var path = useLocation().pathname;
  // console.log("path:", path);
  if (movieItem.id != undefined) {
    path = path + '/' + movieItem.id;
  }
  else {
    //  path = path+'?title='+movieItem.title+'&?year='+movieItem.year;
    path = path + '/' + movieItem.title + '/' + movieItem.year;

  }
  const isFavourite = async () => {
    // const [favmovies,getMovies]=useState<Imovie[]|null>(null);
    var moviesFetched: Imovie[] = [];
    var index: number | undefined = undefined;
    const moviesF = async () => {
      const response = await axios.get(
        `http://localhost:3001/favourites`
      );
      moviesFetched = response.data;
      console.log("data frm response:", moviesFetched);
      index = moviesFetched.findIndex(m => m.title === movieItem.title && m.year === movieItem.year);
      console.log("index from func:", index);

      // return response.data;
    };
    await moviesF();
    return (index === -1) ? false : true
    // if(index!==undefined){
    //   return (index===-1)?false:true; 
    // }
    // else{

    // }



    // async axios.get<Imovie[]>(`http://localhost:3001/favourites`)
    //      .then(response=>moviesFetched=response.data)
    // const get = async()=>{
    //    await axios.get<Imovie[]>(`http://localhost:3001/favourites`)
    //        .then( (response) => {
    //          moviesFetched=(response.data);
    //         console.log("Favmovies in get:",moviesFetched);
    //         console.log("index:",moviesFetched.indexOf(movieItem));
    //         // myArray.findIndex(x => x.hello === 'stevie')
    //         // index = (moviesFetched!==null)?moviesFetched.indexOf(movieItem):-1;
    //           index = moviesFetched.findIndex(m => m.title===movieItem.title && m.year === movieItem.year );
    //           return (index===-1)?false:true;    
    //       });
    //     }  ;

    //  console.log("value of get():",get());
    // moviesFetched=get();
    // index=-1;
    // index = moviesFetched.findIndex(m => m.title===movieItem.title && m.year === movieItem.year );
    // console.log(index)
    // console.log("Favmovies:",moviesFetched);
    // console.log("index:",index);
  }

  const AddToFavourites = async () => {
    // console.log("To Favs");
    if (await isFavourite()) {
      console.log("Already exists");
      updatefailalert();
      // return (
      //   <Alert variant="danger">Already added to Favourites</Alert>
      // );
      // alert("Already added eto Favourits");
    }
    else {
      if (movieItem.id) {
        movieItem.id = undefined;
      }
      axios({
        method: 'post',
        url: `http://localhost:3001/favourites/?title=${movieItem.title}&year=${movieItem.year}`,
        data: movieItem,
        headers: {

        },
      })
      updatesuccessalert();
    };

  }
 
  const removeFromFavourites = () => {

    axios({
      method: 'delete',
      params: { title: movieItem.title, year: movieItem.year },
      url: `http://localhost:3001/favourites/${movieItem.id}`,
      data: movieItem,
      headers: {

      },
    })
    console.log("Size after deletion:",movies.length-1);
    updatedelFav();
    

    // setdelFav(movies.length-1);
    // render(<ShowAlert/>,"","");
  };


function RemoveFavourites() {
  const [moviesin, setmovies] = useState<Imovie[]>(movies);
  useEffect(() => {

    axios.get<Imovie[]>(`http://localhost:3001/favourites`)
      .then(response => setmovies(response.data))
    movies = moviesin;

    //  console.log(delItem);
  }, [movies]
  );

  return (
    <>
      <Button variant="light" onClick={removeFromFavourites}>Remove From Favourites</Button>
      {/* <div className="py-0" style={{ textAlign: "center" }} onClick={removeFromFavourites}>
        Remove From Favourites
      </div> */}
    </>
  )

}

function ShowAlert() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        Removed
      </Alert>
    );
  }
  return <Button onClick={() => setShow(true)}>Show Alert</Button>;
};


const pathForImages = "../img/"
console.log(pathForImages);

return (
  //  <Link to = {useLocation().pathname +'/'+ movieItem.id}>

  <Card>
    <Link to={path} className="mb-0">
      <Card.Img variant="top" src={movieItem.posterurl} 
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src= pathForImages+movieItem.poster;
      }}
      style={{ height: '50vh', width: '100%', objectFit: 'cover' }} />
      <Card.Body className="py-0">
        <Card.Title className="py-0" style={{ textAlign: "center" }}>{movieItem.title}</Card.Title>
      </Card.Body>
    </Link>
    {useLocation().pathname !== "/favourites"
      ?<Button variant="light" onClick={AddToFavourites}>
        Add to Favourites
       <FavIcon></FavIcon>
       </Button>
      //  <div className="py-0" style={{ textAlign: "center" }} onClick={AddToFavourites}>
      //   Add to Favourites
      //   <FavIcon></FavIcon>
      // </div>
      : <RemoveFavourites />
      // <div className="py-0" style={{ textAlign: "center" }} onClick={removeFromFavourites}>
      // Remove From Favourites
      // </div>

    }
  </Card>
  // </Link>
);

};

export default MovieItem;
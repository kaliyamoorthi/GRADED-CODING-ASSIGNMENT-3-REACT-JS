// import { getMoviesIndia } from "../../../services/getmovies";
// import { Alert } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import Imovie from "../../../models/Imovie";

// const Indian_Movies=()=>{
//     const [movies,setMovies] = useState<Imovie[]>([]);
//     const [error,setError] = useState<Error|null>(null);

//     useEffect(
//         ()=>{
//             const fetchHepler = async() =>{
//                 try{
//                     const data = await getMoviesIndia();
//                     setMovies(data);
//                 }
//                 catch(error){
//                         setError(error as Error);
//                 }

//             }
//             fetchHepler();
//         },
//         []
//     );

//     return(
//            <>
           
//             <h1>
//                 Movies Desi
//             </h1>
//             {
//                 error && (
//                     <Alert variant="danger"> error.message 
//                     </Alert>)
//             }
//             {
//                 movies.length!=0 && (
//                     movies.map(
//                         movie =>(
//                             <div>
//                                 {movie.title}
//                             </div>
//                         )
//                     )
//                 )
//             }
           
//             </>
//     )
// };
// export default Indian_Movies;
import { useLocation } from "react-router-dom";
import { getMoviesIndia } from "../../../services/getmovies";
import ListMovies from "../../listmovies";
const Indian_Movies=(props:{query: string})=>{
    return(
        <>
         <h1>
             Indian Movies
         </h1>
         <ListMovies getmovies={getMoviesIndia} query={props.query} path={useLocation().pathname}/>
         </>     
 )
};
export default Indian_Movies;
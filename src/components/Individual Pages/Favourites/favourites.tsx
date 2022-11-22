// const Favourites=()=>{
//     return(
//            <>
           
//             <h1>
//                 Favourites
//             </h1>
           
//             </>
//     )
// };
// export default Favourites;
import { getFavourites} from "../../../services/getmovies";
import ListMovies from "../../listmovies";
import { useLocation } from "react-router-dom";
const Favourites=(props:{query: string})=>{
    return(
           <>
            <h1>
               Favourites
            </h1>
            <ListMovies getmovies={getFavourites} query={props.query} path={useLocation().pathname}/>
            </>     
    )
};
export default Favourites;
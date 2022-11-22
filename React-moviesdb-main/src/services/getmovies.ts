import axios from 'axios';
import Imovie from '../models/Imovie';

const getComingSoon = () => {
    return axios.get<Imovie[]>(`http://localhost:3001/movies-coming`)
            .then( response => response.data )
};
const getMoviesInTheatres = () => {
    return axios.get<Imovie[]>(`http://localhost:3001/movies-in-theaters`)
            .then( response => response.data )
};
const getMoviesIndia = () => {
    return axios.get<Imovie[]>(`http://localhost:3001/top-rated-india`)
            .then( response => response.data )
};
const getMovies = () => {
 
    return axios.get<Imovie[]>(`http://localhost:3001/top-rated-movies`)
            .then( response => response.data )
};
const getFavourites = () => {
    return axios.get<Imovie[]>(`http://localhost:3001/favourites`)
            .then( response => response.data )
};
const getMovieById = (id:string |number,group:string) => {
    return (
        axios.get<Imovie>(`http://localhost:3001/${group}/${id}`)
            .then( response => response.data )
    )      
};

const getMovieByTitle = async(title:string ,year:string|number,group:string) => {
    console.log(`http://localhost:3001/${group}?title=${title.replaceAll(" ","%20")}&year=${year}`);
    const response = await axios.get<Imovie[]>(`http://localhost:3001/${group}?title=${title.replaceAll(" ","%20")}&year=${year}`)
    console.log(response.data)
     return response.data
            
};
// const pushDataFromUser = ( newpurchase : Omit<IDataList, 'id'> ) => {
//     return axios.post<IDataList>(
//         `http://localhost:3001/items`,
//         newpurchase,
//         {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//     )
//     .then( response => response.data )
// };

export { 
    getComingSoon,
    getMoviesInTheatres,
    getMoviesIndia,
    getMovies,
    getFavourites,
    getMovieById,
    getMovieByTitle
}
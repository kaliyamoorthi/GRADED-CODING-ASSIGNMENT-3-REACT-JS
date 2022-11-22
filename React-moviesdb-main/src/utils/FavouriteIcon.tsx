import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './FavouriteIcon.css';

const FavIcon=()=>
{
    return(
        <FontAwesomeIcon icon={faHeart} />
    );
}

export default FavIcon;
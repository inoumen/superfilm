import React from 'react';
import returnButton from "../images/returnButton.png";

export default (props) => {
    return (
        <div className="HeaderComponent">
            {props.showMovies && <img src={returnButton} alt="return button" onClick={props.renderListOfMovies}/>}
            <span>SUPER FILM</span>
        </div>
    )
};
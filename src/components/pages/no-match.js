import React from 'react';
import {Link} from 'react-router-dom';

import errorPhoto from "../../../static/assets/images/photos/error.png";

export default function(){
    return(
    <div className="no-match-container">
    <Link to="/">Click to Return to Homepage</Link>
    <img src={errorPhoto} />
    <h2>We couldn't find that page...</h2>
    </div>
    );
}
import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function DeleteAction(props){

    function handleClick(){
        fetch(`https://rwtw-backend-tw.herokuapp.com/delete/${props.id}`,{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response.json()
        }).catch(error => {
            console.log('Fetch delete error', error)
        })
    }

    return(
    <div>
        <Link onClick={handleClick} to ={"/"}><FontAwesomeIcon icon="trash" /></Link>
    </div>
    );
}

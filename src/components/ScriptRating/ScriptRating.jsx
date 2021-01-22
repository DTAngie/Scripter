import React, { useState } from 'react';
import { Popup, Rating } from 'semantic-ui-react';


export default function ScriptRating({userRating, handleRate, convertScore}){
    const [popupText, setPopupText] = useState('');

    function handleClick(e, {rating}){
        handleRate(rating);
    }

    function updatePopupText(e){
        const starValue = e.target.getAttribute('aria-posinset');
        switch(starValue) {
            case '1':
                setPopupText("Pass");
                break;
            case '2':
                setPopupText("Consider");
                break;
            case '3':
                setPopupText("Purchase");
                break;
            default:
                setPopupText("Unrated");
                break;
        }
    }

    return (
        <>
            <p>Rate this Script</p>
            <Popup content={popupText} 
                trigger= {
                    <Rating icon="star" rating={userRating} maxRating={3} onRate={handleClick} onMouseOver={updatePopupText} />
                }
            />
        </>
    )
}
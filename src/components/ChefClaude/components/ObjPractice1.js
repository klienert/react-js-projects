import React, { useState } from "react";
import starFilled from "../images/starFilled.svg";
import starEmpty from "../images/starEmpty.svg";

const ComplexStateObj = () => {
    const [contact, setContact] = React.useState({
        firstName: "John",
        lastName: "Doe",
        phone: "+1 (212) 555-1212",
        email: "itsmyrealname@example.com",
        isFavorite: false
    })    
    
    let starIcon = (contact.isFavorite ? starFilled : starEmpty);

    function toggleFavorite() {
        setContact(prevContact => {
            return {
                ...prevContact,
                isFavorite: !prevContact.isFavorite
            }            
        })
    }

    return (
        <div className="complexObj">
            <article className="complex-card">
                <img
                    src="https://picsum.photos/200"
                    className="avatar"
                    alt={`User profile of ${contact.firstName} ${contact.lastName}`}
                />
                <div className="info">
                    <button
                        onClick={toggleFavorite}
                        aria-pressed={contact.isFavorite}
                        aria-label={contact.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        className="favorite-button"

                    >
                        <img
                            src={starIcon}
                            alt={contact.isFavorite ? "filled star icon" : "empty star icon"} 
                            className="favorite"
                        />
                    </button>
                    <h2 className="name">{contact.firstName} {contact.lastName}
                    </h2>
                    <p className="contact">{contact.phone}</p>
                    <p className="contact">{contact.email}</p>
                </div>
            </article>
        </div>
    )
}

export default ComplexStateObj;
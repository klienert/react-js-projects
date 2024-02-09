"use client";

import { useState } from "react";


export default function Form() {
    
    // const [firstName, setFirstName] = useState("");  // would need to repeat these for each input from the form
    
    // Much cleaner to use one object for the state
    const [form, setSetForm] = useState({
        firstName: "",
        lastName: "",
        email: "", 
        password: "",
        address: "",
        zipCode: ""
    });

const handleChange = (e) => {   
    setSetForm({
        ...form,
        [e.target.name]: e.target.value        
    });
}

console.log(form);
    return (<div className="container">
        <form className="flex flex-col gap-y-2">
            <input 
                type="text"
                onChange={handleChange} 
                name="firstName"
                placeholder="First Name"
                className="px-4 py-2"
            />
            <input 
                type="text" 
                onChange={handleChange} 
                name="lastName"
                placeholder="Last Name"
                className="px-4 py-2"
            />
            <input 
                type="text" 
                onChange={handleChange} 
                name="email"
                placeholder="Email"
                className="px-4 py-2"
            />
            <input 
                type="text" 
                onChange={handleChange} 
                name="password"
                placeholder="Password"
                className="px-4 py-2"
            />
            <input 
                type="text" 
                onChange={handleChange} 
                name="address"
                placeholder="Address"
                className="px-4 py-2"
            />
            <input 
                type="text" 
                onChange={handleChange} 
                name="zipCode"
                placeholder="Zipcode"
                className="px-4 py-2"
            /><br />
            <button 
                type="submit"
                className="btn btn-primary px-4 py-2"                
            >Submit</button>
        </form>
  
    </div>
    );
}

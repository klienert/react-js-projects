import { CognitoUserPool } from 'amazon-cognito-identity-js';
import React, {useState} from 'react';
export default function CognitoForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
    const poolData = {
        UserPoolId: "us-east-2_3uPyu3p2F",
        ClientId: "g667q1h4tp9bc23oht4r23l4g"
    }

    const UserPool = new CognitoUserPool(poolData);

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log("Submitted");
        UserPool.signUp(email, password, [], null, (err, data) => {
            if(err) {
                console.error(err);
            } else {
                console.log(data);
            }

        })
    };

    return (
        <div className="container">

            <form onSubmit={onSubmit} className='form'>
                <label htmlFor="email">Email</label>
                <input value={email} id="email" onChange={e=> setEmail(e.target.value)}
                    className="m-1 p-1" type="text" />
                <br />
                <label htmlFor="pass">Password</label>
                <input value={password} id="pass" onChange={e=> setPassword(e.target.value)}
                    className="m-1 p-1" type="text" />
                <br />
                <button type="submit" className="btn btn-primary m-2 p-2">Sign-Up</button>
            </form>
            
        </div>        
    );    
}
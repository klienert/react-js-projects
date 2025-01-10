import React from "react";

const Form1 = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted!');
        console.log(e);
        const formEl = e.currentTarget;
        const formData = new FormData(formEl);        

        const userData = {
            email: formData.get("email"),
            pass: formData.get("pass")
        };

        console.log(userData);
        formEl.reset(); // this resets the form
    }

    // this would be for React 19...
    // const signUp = (formData) => {
    //     const email = formData.get("email");
    //     console.log(email);
    // }


    return (
        <div className="form1">
            <h2>SignUp Form</h2>
            <form action="" onSubmit={handleSubmit} method="POST">
            {/* <form action={signUp} > */}
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" placeholder="joe@schmo.com"/>
                <br/><br/>
                <label htmlFor="pass">Password:</label>
                <input type="password" name="pass" id="pass" />
                <br/><br/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Form1;

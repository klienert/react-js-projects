import React from "react";

const Form1 = () => {

    // const handleSubmit = (e) => {
    //     e.preventDefault();        
    //     const formEl = e.currentTarget;
    //     const formData = new FormData(formEl);        

    //     const userData = {
    //         email: formData.get("email"),
    //         pass: formData.get("pass")
    //     };

    //     console.log(userData);
    //     formEl.reset(); // this resets the form
    // }

    // this would be for React 19...
    const signUp = (formData) => {
        // const email = formData.get("email");
        // const pass = formData.get('pass');
        // const text = formData.get('description');
        // const emp = formData.get('employmentStatus');
        // const diet = formData.getAll('dietaryRestrictions'); // getAll will get all the selected options
        // const color = formData.getAll('favColor');
        
        // const data = [email, pass, text, emp, diet, color];
        // console.log(data);

        // console.log(Object.fromEntries(formData));
        const data = Object.fromEntries(formData);
        const diet = formData.getAll('dietaryRestrictions'); // getAll will get all the selected options
        // console.log(data); // from object
        // console.log(diet); // specific for the checkboxes (multiple entries)

        const allData = {
            ...data,
            dietaryRestrictions: diet
        }

        console.log(allData);

    }


    return (
        <div className="form1">
            <h2>SignUp Form</h2>
            {/* <form action="" onSubmit={handleSubmit} method="POST"> */}
            <form className="form1-form" action={signUp} >
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" placeholder="joe@schmo.com"
                    defaultValue="test@test.com"
                />                
                
                <label htmlFor="pass">Password:</label>
                <input type="password" name="pass" id="pass" 
                    defaultValue="pass123"
                />
                
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" defaultValue="Testing: 1, 2, 3..."></textarea>
               
                <fieldset className="form1-fieldset">
                    <legend>Employment Status:</legend>
                    <label>
                        <input type="radio" name="employmentStatus" value="Unemployed" />
                            Unemployed
                    </label>
                    <label>
                        <input type="radio" name="employmentStatus" value="Part-time"/>
                            Part-time
                    </label>
                    <label>
                        <input type="radio" name="employmentStatus" value="Full-time"/>
                        Full-time
                    </label>
                </fieldset>

                <fieldset className="form1-fieldset">
                    <legend>Dietary Restrictions:</legend>
                    <label>
                        <input type="checkbox" name="dietaryRestrictions" value="Dairy" />
                            Dairy
                    </label>
                    <label>
                        <input type="checkbox" name="dietaryRestrictions" value="Meat"/>
                            Meat
                    </label>
                    <label>
                        <input type="checkbox" name="dietaryRestrictions" value="Onion"/>
                        Onion
                    </label>
                </fieldset>
                
                <fieldset className="form1-fieldset">
                    {/* <legend>Select a favorite color:</legend> */}
                    <label htmlFor="favColor">Select your favorite color!</label>
                    <select id="favColor" name="favColor" defaultValue="" required>
                        <option value="" disabled>-- Choose a color --</option>
                        <option value="Red">Red</option>
                        <option value="Orange">Orange</option>
                        <option value="Yellow">Yellow</option>
                        <option value="Green">Green</option>
                        <option value="Blue">Blue</option>
                        <option value="Indigo">Indigo</option>
                        <option value="Violet">Violet</option>
                    </select>
                </fieldset>
                

                <button>Submit</button>
            </form>
        </div>
    )
}

export default Form1;

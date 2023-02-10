import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

/* this is an example of a custom component. these can be used in html like <BooButton />. they will run this function BooButton
 * and whatever is returned will be the value of the html of <BooButton />. take note though, these functions MUST start with a 
 * capital letter or it won't work. arguments can be passed to BooButton with <BooButton argName=value />. these arguments are
 * accessed in the method with props.argName. (see EX:1 for where this is used inline)*/
function BooButton(props) {
    let button;
    
    if (!props.isBooPrimed) button = <button onClick={props.handleSubmit}>GAHHHH</button>;
    else button = <button onClick={props.handleSubmit}>Sure, whatever</button>

    return button;
}

// actual app webpage
function App(props) {
    // state variables
    /* these guys are created with const [variable_name, setter_method] = useState(initial_data);
     * the syntax [thing, other_thing] = method() is called destructuring. look it up if you want */
    const [isBooPrimed, setBooPrimed] = useState(true); // creates a state variable called isBooPrimed, setter method is setBooPrimed()
    const [hasBooHappened, setHasBooHappened] = useState(false);
    const [name, setName] = useState("");
    const [givenName, setGivenName] = useState(false);
    const [noName, setNoNameError] = useState(false);

    // how to call a function "within" a function (see EX:1 for where used inline)
    /* basically, we need to call a method within a method. but in the case where this is used, if we were to call a normal method
     * it ends up breaking the code. why? if we call a function it executes the function and ends up breaking. it doesn't know to 
     * return to this section of code. in this example, we create a variable called 'handleSubmit' and set it equal to a callback 
     * method [()=>{--METHOD HERE--}] to create a method object. that way it can come back to this specific line in code without
     * accidentally breaking out */
    const handleSubmit = () => {
        setBooPrimed(!isBooPrimed);
        if (!hasBooHappened && !isBooPrimed) setHasBooHappened(!hasBooHappened);
    }

    const nameUpdate = (event) => {
        if(event.target.name === "nameTextbox") setName(event.target.value);
    }

    const submitForm = () => {
        if (name === "") setNoNameError(true);
        else {
            setGivenName(true);
            setNoNameError(false);
        }
    }

    let element;

    if(givenName) {
        /* this is an example of using conditional rendering. as you can see, this uses the boolean variables isBooPrimed and hasBooHappened
         * to change the message boo. if boo is not primed (boo has been sprung) then the message displays "BOO!". after that, it checks the
         * value of hasBooHappened. this will change the primed boo message to "Sorry... do you forgive me?". this means that boo has already
         * been sprung once, and boo is primed for another BOO!. if all of the above are false, then it goes to "Psst. Hey _name_..." message.
         * that means the boo is primed, and has never been sprung.*/
        let boo

        if (!isBooPrimed) boo = "BOO!"
        else if (hasBooHappened) boo = "Sorry... do you forgive me?";
        else boo = `Psst. Hey ${name}.... click this button`;

        element = [(
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        {boo}
                    </p>
                    <BooButton isBooPrimed={isBooPrimed} handleSubmit={handleSubmit} /> {/*EX:1 inline use of custom component*/}
                    {/* right here is an example of an inline if with logical &&. this allows you to add additional html elements based
                    * on an if(condition) statement is true, but inline. this can be handy for some stuff later down the line. like
                    * displaying text if certain conditions have been met*/}
                    {!isBooPrimed &&
                        <p className="Get-Pranked">
                            {/* this is called an inline if/else conditional. VERY similar to the above inline if, but what happens with
                            * this is, if true run first statement. if false run second statement. so (condition) ? "true" : "false" */}
                            {hasBooHappened ? "haha get pranked loser" :"i'm really sorry man. i won't do it again"}
                        </p>
                    }
                </header>
            </div>
        )];
    }
    else {
        element = [(
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div>
                        <form onSubmit={submitForm} action="javascript:void(0);">
                            <p>Enter your name</p>
                            <input name="nameTextbox" type="text" placeholder="Name here" value={name} onChange={nameUpdate}/>
                            <input type ="submit" value="Submit"/>
                            {noName &&
                                <p className="No-Name-Error">
                                    Please enter a name
                                </p>
                            }
                        </form>
                    </div>
                </header>
            </div>
        )]
    }

    // another example of conditional rendering
    /* say we wanted to have a flag cancel the rendering of App(). if we just make an if statement at the end of the method that returns
     * null with some sort of condition, then it won't render if set to true. this is neat too because if you forget that this is a value
     * that you forget that you have, it is set to undefined (it will just skip this if statement). this can kick you in the ass though 
     * so make sure that you remember this for any other methods you might want*/
    if(props.warn) {
        return null;
    }

    return (element);
}

export default App;

import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

// function that returns "boo button" that says "GAHHHH"
function booButton(props) {
    return (<button onClick={props.handleSubmit}>GAHHHH</button>);
}

// function that returns button that says "Sure, whatever"
function noBooButton(props) {
    return (<button onClick={props.handleSubmit}>Sure, whatever</button>);
}

// actual app webpage
function App(props) {
    // state variables
    /* these guys are created with const [variable_name, setter_method] = useState(initial_data);
     * the syntax [thing, other_thing] = method() is called destructuring. look it up if you want */
    const [isBooPrimed, setBooPrimed] = useState(false); // creates a state variable called isBooPrimed, setter method is setBooPrimed()
    const [hasBooHappened, setHasBooHappened] = useState(false);

    // how to call a function "within" a function (see EX:1 for where used inline)
    /* basically, we need to call a method within a method. but in the case where this is used, if we were to call a normal method
     * it ends up breaking the code. why? if we call a function it executes the function and ends up breaking. it doesn't know to 
     * return to this section of code. in this example, we create a variable called 'handleSubmit' and set it equal to a callback 
     * method [()=>{--METHOD HERE--}] to create a method object. that way it can come back to this specific line in code without
     * accidentally breaking out */
    const handleSubmit = () => {
        setBooPrimed(!isBooPrimed);
        if (!hasBooHappened && isBooPrimed) setHasBooHappened(!hasBooHappened);
    }

    let button;

    let boo = "Psst. Hey you.... click this button";

    /* this is an example of using conditional rendering. as you can see, this uses the above state variable isBooPrimed to see if
     * the boo is ready to be sprung. if it is, then the button is set to the above function booButton. otherwise, it is set to 
     * noBooButton. take note of the fact that we have to pass the variable handleSubmit to it because the buttons require the method 
     * handleSubmit, which is located in the function App(). so under NORMAL circumstances, it does NOT know about handleSubmit */
    if (isBooPrimed) {
        boo = "BOO!"
        button = booButton(props = { handleSubmit }) // EX:1
    }
    else {
        if (hasBooHappened) boo = "Sorry... do you forgive me?";
        button = noBooButton(props = { handleSubmit }) // EX:1
    }
    let element = [(
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    {boo}
                </p>
                {button}
                {/* right here is an example of an inline if with logical &&. this allows you to add additional html elements based
                  * on an if(condition) statement is true, but inline. this can be handy for some stuff later down the line. like
                  * displaying text if certain conditions have been met*/}
                {isBooPrimed &&
                    <p className="Get-Pranked">
                        {/* this is called an inline if/else conditional. VERY similar to the above inline if, but what happens with
                          * this is, if true run first statement. if false run second statement. so (condition) ? "true" : "false" */}
                        {hasBooHappened ? "haha get pranked loser" :"i'm really sorry man. i won't do it again"}
                    </p>
                }
            </header>
        </div>
    )];

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

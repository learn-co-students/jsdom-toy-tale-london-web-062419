const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;

//base url for my server queries a.k.a use it with fetch
const toysUrl = "http://localhost:3000/toys";

/// DON'T FORGET, DEBUGGER IS YOUR FRIEND///

//If you don't understand where the values are coming from, use the debugger to trace back and inspect
//from where things are coming from

/////////Query Selectors//////////////

//I'm specifically grabbing the form element to append my event listener
//and retrieve my data to create a new toy
const addToyForm = document.querySelector(".add-toy-form");

////////////////API CALLS => I'm grouping all the functions that comunicate with my server here a.k.a functions that have fetch inside
//By convention (this one is for you David) the functions from this section should live on a separate API file,
//but don't worry with that for now

const fetchAllToys = () => {
    //fetching all toys form api, returning an array with objects representing a toy
    fetch(toysUrl)
        .then(json => json.json())
        .then(resp => renderAllToys(resp));
};

//Post a new toy to the server
const createToy = newToy => {
    //I'm returning the fetch function here,
    //so I have the hability to handle with the promise outside of the scope of this function
    return fetch(toysUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "applicaton/json"
        },
        body: JSON.stringify(newToy)
    }).then(resp => resp.json());
};

//Update the likes from a specific toy, by using a patch request to the server with the new likes count
const updateLikes = toy => {
    const toyUrl = `${toysUrl}/${toy.id}`;
    const updatedLikes = {
        likes: ++toy.likes
    };

    return fetch(toyUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "applicaton/json"
        },
        body: JSON.stringify(updatedLikes)
    }).then(resp => resp.json());
};

///////////////////////////Sequence to render all toys in the page starts here////
const renderAllToys = toys => {
    //Render all the toys in the page
    toys.forEach(toy => {
        renderToy(toy);
    });
};

const renderToy = toy => {
    //Render a single toy on the page;
    //Will be called inside of RenderAllToys
    const toyCollection = document.querySelector("#toy-collection");
    const div = toyCard(toy);
    //I'm appending the toy car div here to the container div that will have the collection of toys
    toyCollection.append(div);
};

//Render a card representing a toy
//Will be called inside of renderToy
const toyCard = toy => {
    //Create all the elements that I need
    const toyDiv = document.createElement("div");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const img = document.createElement("img");
    const button = document.createElement("button");

    //Add all the attributes to render the card
    //Get the information from the toy object
    toyDiv.className = "card";
    h2.innerText = toy.name;
    img.src = toy.image;
    img.className = "toy-avatar";
    p.innerText = `Likes: ${toy.likes}`;
    button.innerText = "Like";
    button.className = "like-btn";

    //Append the new elemnts we just created to the main div, this way we have the card completed
    toyDiv.append(h2, img, p, button);

    //Create the event listener that will allow us to update the likes for each toy
    button.addEventListener("click", () => {
        //we are passing dow here the card div and the toy object, so we can usit later for our like functionality
        handleUpdateLikes(toyDiv, toy);
    });

    //Return the complete div so I can use it as a variable whenever I call this function
    return toyDiv;
};

/////////////Sequence that updates the likes of a toy///////////

//We start the sequence to update the likes of a specific toy inside of the event listener that we attached to the like
//button that is created on the toyCard function.

//This function will have all the logic to handle the process of updating the likes count of a specific toy
const handleUpdateLikes = (toyDiv, toy) => {
    //I'm grabbing the toy div and the toy from the toyCard function on the moment I define the event listener
    //updateLikes is the function that makes the patch request to the server, and it returns a promise so I can use
    // .then() on it
    updateLikes(toy).then(updatedToy => {
        //here im selecting from the toy div the element that has the likes text
        //and updating the content with the response from the server, through the updatedToy object
        likesElem = toyDiv.querySelector("p");
        likesElem.innerText = `Likes: ${updatedToy.likes}`;
    });
};

/////////////////////Event listeners for the create toy functionality//////////////////

//This is used to toggle the new toy form
addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
        toyForm.style.display = "block";
    } else {
        toyForm.style.display = "none";
    }
});

//Add an event listener to the new toy button. The sequence to create a new toy starts here
addToyForm.addEventListener("submit", event => {
    event.preventDefault();
    const formObj = grabDataFromForm(event.target);
        createToy(formObj).then(renderToy);
});

//I'm creating a formatter function to grab the data from the new toy form
const grabDataFromForm = form => { 
    const data = {
        likes: 0
    };
    data.name = form.name.value;
    data.image = form.image.value;
    
    return data;
};

//////////Initialise the sequence to start my app/////////////
const init = () => {
    //Define an initalise function so you can put all
    //the functions you need to start on loading of page in one place
    fetchAllToys();
};
//This will run your functions after all the content has been loaded into the DOM
//Note that I can just give the name of a function to the event listener to execute on the specified event
document.addEventListener("DOMContentLoaded", init);
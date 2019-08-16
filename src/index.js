const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;

const toysUrl = "http://localhost:3000/toys";

/////////Query Selectors//////////////
const addToyForm = document.querySelector(".add-toy-form");

const fetchAllToys = () => {
  fetch(toysUrl)
    .then(json => json.json())
    .then(resp => renderAllToys(resp));
};

//Post a new toy to the server
const createToy = newToy => {
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
  const updatedLikes = { likes: ++toy.likes };

  return fetch(toyUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "applicaton/json"
    },
    body: JSON.stringify(updatedLikes)
  }).then(resp => resp.json());
};

////Sequence to render all toys in the page starts here////

//Render all the toys in the page
const renderAllToys = toys => {
  toys.forEach(toy => {
    renderToy(toy);
  });
};

//Render a single toy on the page;
const renderToy = toy => {
  const toyCollection = document.querySelector("#toy-collection");
  const div = toyCard(toy);
  toyCollection.append(div);
};

//Render a card for toy
const toyCard = toy => {
  const toyDiv = document.createElement("div");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const img = document.createElement("img");
  const button = document.createElement("button");

  toyDiv.className = "card";
  h2.innerText = toy.name;
  img.src = toy.image;
  img.className = "toy-avatar";
  p.innerText = `Likes: ${toy.likes}`;
  button.innerText = "Like";
  button.className = "like-btn";

  toyDiv.append(h2, img, p, button);

  button.addEventListener("click", () => {
    handleUpdateLikes(toyDiv, toy);
  });

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

  //I'm grabbing the data from the form already formatted form my formatter function
  const formObj = grabDataFromForm(event.target);
  //I'm creating a new toy and render it as soon as it gets returned from the server
  createToy(formObj).then(renderToy);
  // debugger;
});

//I'm creating a formatter function to grab the data from the new toy form
const grabDataFromForm = form => {
  //create an object with likes inside, since its required to create a new toy, but there isn't an input field
  //for the likes on the new toy form
  const data = {
    likes: 0
  };

  //add the other fields from the form that we need to create a new toy
  data.name = form.name.value;
  data.image = form.image.value;
  //Return the final object, alreday formatted for the create request
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

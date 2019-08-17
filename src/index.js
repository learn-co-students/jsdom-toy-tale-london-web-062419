const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toysURL = "http://localhost:3000/toys"
let addToy = false

// YOUR CODE HERE

//FETCHING AREA
//STEP 3 CREATE A FETCH TO FETCH ALL THE TOYS INSIDE THE TOY ARRAY 

const getToys = () => {
    fetch(toysURL)  //returns a promise
    .then(resp => resp.json())
    .then(toysArray => {

        toyIterator(toysArray);
    })//passing the resp to the next function I will be building the toys iterator.

}


const toyIterator = toys => { //takes in an argument passed down by the fetch
    toys.map( toy => {
        renderToy(toy)
        //
    })//passing the toy to the next function 
    
}

//Step 5 Create a new toy this is a post request to
// next step would be to add a event listner for the submit form
const addNewToy = newToy => {
    debugger;
  return fetch(toysURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "applicaton/json"
    },
    body: JSON.stringify(newToy)
  }).then(resp => resp.json());
};


const showNewToy = e => {
    debugger
    // const newToyData = document.querySelector(".add-toy-form").value; 
    const name = document.querySelector('#name-input').value 
    // const name = e.target.name.value ///do I have to do it this way just because there is multiple params or why so ? 
    // const image = e.target.image.value
    const toyObj = {name: name, image: image, likes: 0}
    addNewToy(toyObj).then(toy => {renderToy(toy)
    })
}




// What is the better way of doing this. 
const form = document.querySelector(".add-toy-form");

form.addEventListener("submit", e => { 
    //needs to listen for the submit to actually do anything this will pass to the next function that I would build called showNewToy
    e.preventDefault();//to prevent default
    showNewToy(e);
    form.reset();

});


//step 7 Add new like
//Patch request because it's an update. 
const addLikes = (id, likes) => {
  return fetch(toysURL + "/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ likes: likes })
  }).then(resp => resp.json());
}; 

//Step 4 renderToy
/* <div class="card">
    <h2>Woody</h2>
    <img src=toy_image_url class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn">Like <3</button>
  </div> */

const renderToy = toy => {
     //passing down the toy instance from the toyIterator
// got to build the card/div where each toy will live
const toyContainer = document.querySelector("#toy-collection")



const toyDiv = document.createElement("div")
const toyName = document.createElement("h2")
const likes = document.createElement("p")
const likeBtn = document.createElement("button")
const toyImg = document.createElement("img")

toyImg.className = "toy-avatar"
toyImg.src = toy.image
toyName.innerText = toy.name
likes.innerText = `Likes:${toy.likes}` 
likeBtn.innerText = "Like <3";
likeBtn.className = "like-btn"
toyDiv.className = "card"
likeBtn.id = toy.id
likes.id = `like-${toy.id}`

//the event

likeBtn.addEventListener("click", e =>{

    const likesElement = document.querySelector(`#like-${e.target.id}`)
    
   let currentLikes = likesElement.innerText.split(":")[1]
    let updatedLike = ++currentLikes 
    
    addLikes(e.target.id, updatedLike)
    likesElement.innerText = `Likes: ${updatedLike}`;
    // renderLikesOnPage(e)
})

toyDiv.append(toyName, likes, toyImg, likeBtn);
toyContainer.append(toyDiv)


};


//EVENT LISTNER SECTION OF THE PAGE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!





// step 2 create the init function.

const init = () => {
    getToys()// next step will be creating the next function that I just declared.
}


// step 1 create the dom content loader, the initializer. 

document.addEventListener("DOMContentLoaded", init);






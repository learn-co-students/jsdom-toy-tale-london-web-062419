//fetch the toys
const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector(".container");
let addToy = false;

const toyURL = "http://localhost:3000/toys"

//make a fetch request to get the data 
//the data is an array of objects

const fetchingToys = () => {
  fetch(toyURL)
  .then(resp => resp.json())
  .then(toys => renderToys(toys))
};

renderToys = (toys) => {
  toys.forEach(toy => {
    renderToy(toy)
  })
}

//passing on the toy array
//need to query Select the toy Collection div which will be later used to append the deets on
const toyCollection = document.querySelector('#toy-collection')
const renderToy = (toy) =>{

  //need to create a div called card 
  const div = document.createElement('div')
  div.className = 'card'

const h2 = document.createElement('h2');
h2.innerText = toy.name

const image = document.createElement('img');
image.className = "toy-avatar"
image.src = toy.image

const p = document.createElement('p');
p.innerText = `${toy.likes} Likes`

const likeBtn = document.createElement('button')
likeBtn.className = 'like-btn'
likeBtn.innerText = "Like <3"

div.append(h2, image, p, likeBtn)
toyCollection.append(div)


//CREATE THE EVENT LISTENER PASSING THE NEW LIKES FUNCTION INSIDE, and passing toyCollection
//and toy which will be used in the next function!
//return the toyCollection
likeBtn.addEventListener('click', e => {
  e.preventDefault();
  handleUpdateLikes(toyCollection, toy);
})
return toyCollection
};

//now need to create a new toy. Need to create the event listener, query selecting what i need 
//then creating the post request

//querySelector to grab the form for creating a new toy

const addToyForm = document.querySelector('.add-toy-form');

//now create the event listener
addToyForm.addEventListener('submit', e => {
  e.preventDefault();
  // now need to create a variable that has the formData which will be passed to the POST
  const newToy = formData(addToyForm)
  //then pass the post function with the newToy variable (has the details). then call the render
  //toy function so that the new toy is added to the age
  postingToy(newToy).then(obj => renderToy(obj))
})

const formData = form => {
  const grabbedData = {
    likes: 0,
    image: form.image.value,
    name: form.name.value

  }
  return grabbedData
}
//newToy will have the details of the toy's name, image and likes 
//first will get the details of the form before passing it on

const postingToy = (newToy) => {
  return fetch(toyURL, {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:  JSON.stringify(newToy)
  }).then(resp => resp.json())
}

//PATCH REQUEST
//we need to create the new url with the toy.id
//also need to increment the likes, which will be passed as the argument 
const updatingLike = (toy) => {
  const aToyUrl = `${toyURL}/${toy.id}`;
  const updateLikes = {likes: ++toy.likes}
  return fetch(aToyUrl,{
    method: "PATCH",
    headers: 
            {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
    body: JSON.stringify(updateLikes),
  }).then(resp => resp.json());
};



//need to create the handleLikes function which will use the toy Collection and toy.
//calling on the patch request and using the second then method to pass the object and grab the
//details of that object so it can be updated
//once this function is complete it has been passed inside the event listener already and will update the likes on the 
//click event
const handleUpdateLikes = (toyCollection, toy) => {
  updatingLike(toy).then(updatedToy => {
    likesElement = toyCollection.querySelector('p');
    // debugger;
    likesElement.innerText = `Likes: ${updatedToy.likes}`
  });
};

//PATCH http://localhost:3000/toys/:id
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body:
// {
//   "likes": <new number>
// }





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

document.addEventListener("DOMContentLoaded", () => {
  fetchingToys();
})
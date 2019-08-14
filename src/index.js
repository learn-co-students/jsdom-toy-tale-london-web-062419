let addToy = false
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const card = document.createElement('#card')
const jsonify = resp => resp.json()
const toysURL = "http://localhost:3000/toys"

// Query Selector
const allToysDiv  = document.querySelector('#toy-collection')
const newToyForm = document.querySelector('.add-toy-form')


// YOUR CODE HERE

function fetchAllToys = () => {
  fetch(toysURL)
  .then(resp => resp.json())
  .then(allToys => {
    renderAllToys(allToys)
  });
}

  const renderAllToys = toys => {
    toys.forEach(toy => {
      renderToy(toy)
    )};
  }



// Render a toy  
const renderToy = (toy) => {
  const div = document.createElement('div')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const btn = document.createElement('button')
  
  div.className = 'card'
  h2.innerText = toy.name
  img.src = toy.image
  img.className = "toy-avatar"
  p.innerText = `${toy.likes}`
  btn.className = "like-btn"
  btn.innerText  = "like <3"

  div.append(h2, img, p, btn)
  allToysDiv.append(div)
}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

//Create new form with event listener

newToyForm.addEventListener("submit", event =>{
  event.preventDefault();

grabDataFRomToyForm = form => {
  debugger
}
})

// Create new toy post request

const createToy = (toy) => {
  fetch(toysURL, {
    method: "POST",
    header: {
      "Content-Type": "application/json", 
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAllToys();
})

// Dom content loaded 


// OR HERE!

// 1. Make a get request to fetch data form API
// 2. With response data, make a div class for each toy and add to toy collection div. 
// --> use forEach method. 
// 3. Create h2 tag to add the toys name 
// 4. Create an img tag with src of toy image 
// 5. Create a p tag  of how many likes each toy has 
// --> This will likely require iteration 
// 6. Add a tag with class of "like btn"
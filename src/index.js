const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
let addToy = false
const toysUrl = ('http://localhost:3000/toys');

// all querySelectors:
//#id .class nothing is a tag
const divCollection = document.querySelector('#toy-collection');
const newToyForm = document.querySelector('.add-toy-form');
  //fetch all of the toys 

  const fetchAllToys = () => {
    fetch(toysUrl)
    .then(resp => resp.json())
    .then(allToys => renderAllToys(allToys));
  };

   //render all Toys
   const renderAllToys = toys => {
    toys.forEach(toy => {
      renderToy(toy);
    });
  };

  //render a toy
  const renderToy = toy => {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const btn = document.createElement('button');
    // now to add these attributes to the new card
    div.className = 'card';
    //to use the innerText to put the details of these attributes inside of the card. using the toy argument and
    //calling from inside of the object of each toy. from EXAMPLE: locoalhost/3000/toy/1
    h2.innerText = toy.name;
    img.src = toy.image;
    img.className = "toy-avatar";
    p.innerText = `${toy.likes} likes`;
    btn.className = "like-btn";
    btn.innerText = "Like <3";

    //now need to append these attributes onto the card, which can be done in one line. It also has to be in same order.
    div.append(h2, img, p, btn);
    divCollection.append(div);

  };

  //create a new toy
  // add event listener to form
  newToyForm.addEventListener('submit', event => {
    event.preventDefault();

    const newToy = grabDataForm(newToyForm);
    createToy(newToy).then(obj => renderToy(obj))
  });

  //in order to create this new to,we first need to grab information from the form 
  const grabDataForm = form => {
    const formattedData = {
      likes: 0,
      name: form.name.value,
      image: form.image.value,
    };
    return formattedData;
  };
  // create  a new toy post request:

  const createToy = newToy => {
    return fetch(toysUrl, {
      method: "POST",
      headers: 
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newToy)
    }).then(resp => resp.json());

  };

 


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
//the initializer, so that it will show it on the page!! using the fetch as this goes through the rendertoy 
//function and the renderalltoys function as this is called inside of the fetch function.
document.addEventListener('DOMContentLoaded', (event) => {
  fetchAllToys();
});
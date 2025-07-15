let selectdifficulty = document.getElementById("category");
let selectcuisine = document.getElementById("cuisine");
let list = document.getElementById("pizza-list");
let search = document.getElementById("search-input");
let searchbtn = document.getElementById("search-btn");



let arrycuisine = []
let arrydifficulty = [];
let alldata = []
async function getData() {
  let url = await fetch("https://dummyjson.com/recipes");
  let data = await url.json();


alldata = data.recipes;

console.log(alldata);



  
 
    


    selectcuisine.addEventListener("change", filterdata);
    selectdifficulty.addEventListener("change", filterdata);
  alldata.forEach((recipe) => {

    if (!arrydifficulty.includes(recipe.difficulty)) {
        arrydifficulty.push(recipe.difficulty)
    }
  
  
    if (!arrycuisine.includes(recipe.cuisine)) {
        arrycuisine.push(recipe.cuisine)
    }
  
    
  })

 

arrydifficulty.forEach((value) =>{
selectdifficulty.innerHTML += `

<option  value="${value}">${value}</option>

`
})  

arrycuisine.forEach((value) =>{
selectcuisine.innerHTML += `

<option value="${value}">${value}</option>

`
})  

showdata(alldata)

}

getData();


function showdata(dataToShow) {
  list.innerHTML = '';

  for (let i = 0; i < dataToShow.length; i++) {
    list.innerHTML += `
      <div class="card">
      <div class="card-header">
      <h2>${dataToShow[i].name}</h2>
       <h4>${dataToShow[i].mealType}</h4>
      </div>
        <img src="${dataToShow[i].image}" class="card-img-top" alt="${dataToShow[i].name}">
        <div class="card-body">
          <div class="diffi-cuis">
            <h3>${dataToShow[i].cuisine}</h3>
            <p>${dataToShow[i].difficulty}</p>   
          </div>
          <hr />
          <p>${dataToShow[i].ingredients}</p>
          <p class="card-text" id="card-text-${dataToShow[i].id}">
            ${dataToShow[i].instructions.join("").slice(0, 100)}...
          </p>
          <span>
            <button id="btn-${dataToShow[i].id}" onclick="readMore(${dataToShow[i].id}, '${dataToShow[i].instructions.join("")}')">Read More</button>
          </span>
        </div>
      </div>
    `;
  }
}


function readMore(id , fulltext) {
    let btn = document.getElementById('btn-' + id)
    let para = document.getElementById('card-text-' + id)
       
    // console.log(para.);

    if (para.innerText.length <= 103) {
        para.innerText = fulltext
        btn.innerText = "Read Less"
        
    }else{
              para.innerText = para.innerText.slice(0, 100)
              btn.innerText = "Read More"
            }
}


function filterdata() {
  let cuisineva = selectcuisine.value;
  let difficultyva = selectdifficulty.value;

  let filtered = alldata.filter((recipe) => {
    let matchCuisine = (cuisineva === "All Cuisine" || recipe.cuisine === cuisineva);
    let matchDifficulty = (difficultyva === "All Difficulty" || recipe.difficulty === difficultyva);

    return matchCuisine && matchDifficulty; 
  });

  console.log(filtered);
  showdata(filtered);   
}



searchbtn.addEventListener('click' , (e)=>{
  e.preventDefault();

  let searchvalue = search.value;
  // console.log(searchvalue , "aloow");

  let filtered = alldata.filter((recipe) => {

    return ( recipe.name.toLowerCase().includes(searchvalue.toLowerCase()));
  })

  console.log(filtered);

  showdata(filtered);
  
  
})










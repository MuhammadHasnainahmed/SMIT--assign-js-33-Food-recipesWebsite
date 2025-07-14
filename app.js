let selectdifficulty = document.getElementById("category");
let selectcuisine = document.getElementById("cuisine");
let list = document.getElementById("pizza-list");
let search = document.getElementById("search-input");
let searchbtn = document.getElementById("search-btn");

let arrycuisine = []
let arrydifficulty = []
async function getData() {
  let url = await fetch("https://dummyjson.com/recipes");
  let data = await url.json();
  
 
  for (let i = 0; i < data.recipes.length; i++) {

    // console.log(data.recipes[i]);
    
        
    if (!arrydifficulty.includes(data.recipes[i].difficulty)) {
        arrydifficulty.push(data.recipes[i].difficulty)
    }


    if (!arrycuisine.includes(data.recipes[i].cuisine)) {
        arrycuisine.push(data.recipes[i].cuisine)
    }

         
    list.innerHTML += `
    
    <div class="card" >
    <h2>${data.recipes[i].name}</h2>
      <img src="${data.recipes[i].image}" class="card-img-top" alt="${data.recipes[i].name}">
      <div class="card-body">
      <div class="diffi-cuis">
      <h3>${data.recipes[i].cuisine}</h3>
      <p>${data.recipes[i].difficulty}</p>   
      </div>
      <hr />
      <p>${data.recipes[i].ingredients}</p>
        
      <p class="card-text" id="card-text-${data.recipes[i].id}">
  ${data.recipes[i].instructions.join("").slice(0, 100)}...
</p>
<span>
<button id="btn-${data.recipes[i].id}" onclick="readMore(${data.recipes[i].id}, '${data.recipes[i].instructions.join("")}')">Read More</button>
</span>


       
    </div>
    
    `

//   searchbtn.addEventListener('click', function(e) {
//       e.preventDefault();
//       let searchvalue = search.value.toUpperCase();
//       let title = data.recipes[i].name.toLowerCase(); 
//       if (title.includes(searchvalue)) {
//           console.log("found");
//        }
//         // console.log(searchvalue);   
//   })
    
  
   

    
    
    
}
 

arrydifficulty.forEach((value) =>{
selectdifficulty.innerHTML += `

<option value="${value}">${value}</option>

`
})  

arrycuisine.forEach((value) =>{
selectcuisine.innerHTML += `

<option value="${value}">${value}</option>

`
})  
}
getData();

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




const menu = document.querySelector("#mobile-menu");
const menulinks = document.querySelector(".navbar-menu");
const bannerImg = document.querySelector('.banner-img')
const logoImg = document.querySelector('#navbar-logo')
let random=document.getElementById('randomMeal-title');
let generateBtn=document.getElementById('generate-btn')
let searchBtn=document.getElementById('icon')
let inputValue=document.getElementById('box')
let searchContainer=document.getElementById('search-meals')
// generateBtn.addEventListener(onclick,'getRandomDish')
let modal=document.getElementById("modal-container")
// let modalContent = document.getElementById("modal-content");
// let modalIng = document.getElementById("modal-ing");
let modalClose = document.getElementById("modal-close");
let searchText= document.getElementById('search-text')
let viewBtn=document.getElementById('view-recipie')
let IngredientsCloseBtn=document.getElementById('cross-icon')
IngredientsCloseBtn.addEventListener('click',()=>{
  // mealDetailsContent.parentElement.classList.remove('showIngredient')
  modal.style.display='none'
}) 

const mobileMenu = () => {
  menu.classList.toggle("is-active");
  menulinks.classList.toggle("active");
  bannerImg.classList.toggle("active")
  logoImg.classList.toggle("active")
};
menu.addEventListener("click", mobileMenu);
const link = document.getElementById


/////////////////////////
function toggleShow () {
  var el = document.getElementById("box");
  el.classList.toggle("show");
}

searchBtn.onclick=()=>{
  loadCategoryMeal(inputValue.value)
}







getRandomDish();

function getRandomDish(){
  fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(response=>{
  return response.json()
})
.then(resp=>{
  // console.log(resp.meals[0].idMeal)
  let randomMeal = makeRandomCard({
    id: resp.meals[0].idMeal,
    img: resp.meals[0].strMealThumb,
    name: resp.meals[0].strMeal,
  })
  // randomMeal.classList.add('meal-title')
  random.append(randomMeal)
})
}

function makeRandomCard({id,img,name}){
let image=document.createElement('img');
image.setAttribute('src',img)
let imgContainer=document.getElementById('randomMeal-img')
imgContainer.append(image)

let mealName=document.createElement('h2')
mealName.innerText=name
let titleContainer=document.getElementById('meal-title')
titleContainer.append(mealName)

// random.dataset.mealId=id
console.log(id)
console.log('helo')

viewBtn.addEventListener("click", function(){
  getMealIngredients(id)
})


  
  return imgContainer,titleContainer;
}



function loadCategoryMeal(category){
  // console.log(category)
  searchText.style.display='block'
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  .then(res=>res.json())
  .then(data=>{
    // console.log(data)
    data.meals.forEach((food,i)=>{
      searchContainer.append(makesearchMealCard({
        id:food.idMeal,
        img:food.strMealThumb,
        name:food.strMeal
      }))

      
    })
  })
}

function makesearchMealCard({id,img,name}){
  // console.log('hello')
  let mealCard=document.createElement('div')
  mealCard.classList.add('meal-card')
  // console.log(id)
  // mealCard.onclick=getMealIngredients(id)
  mealCard.addEventListener("click", function(){
    getMealIngredients(id)
    // console.log(id)
  })
  let Simage=document.createElement('img')
  Simage.setAttribute('src',img)
  let Sname=document.createElement('h3')
  Sname.innerText=name
  mealCard.append(Simage,Sname)
  // console.log(mealCard)
  return mealCard
}

// viewBtn.addEventListener('click',getMealIngredients)
// searchContainer.addEventListener('click',getMealIngredients)


function getMealIngredients(id){
  // console.log(e.target.parentElement.parentElement.dataset.id)
  // e.preventDefault();
  // if(e.target.classList.contains('meal-card')){
  //     let mealItem = e.target.parentElement.parentElement;
  //     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
  //     .then(response => response.json())
      // .then(data => mealRecipeModal(data.meals));
      // .then(data => console.log(data))

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(response => response.json())
      .then(data => {
        // data.meals[0]
        let ingredients=[]
        for(let i=1;i<=20;i++){
          let ing=`strIngredient${i}`;
          if(data.meals[0][ing] != ""){
            // console.log(data.meals[0][ing])
            ingredients.push(data.meals[0][ing])
          }
        }
        // console.log(ingredients)
        let a = '';
      ingredients.forEach((elt) => {
          ;
          a+= 
          `
          <ul class='item-box'>
          <li>${elt}</li>
          </ul>`
          mealDetailsContent.innerHTML = a;
          document.querySelector('#ingre-image img').src=data.meals[0].strMealThumb
          // document.getElementById('name').innerText = meal.strMeal
         
      });
      console.log(a)
modal.style.display='flex'
      })

}

const mealDetailsContent=document.querySelector('.ingredients')

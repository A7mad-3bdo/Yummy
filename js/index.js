/* Starting Side bar */
let toggleButton = document.querySelector(".toggle-icon");
let openIcon = $(".toggle-icon #openIcon");
let closeIcon = $(".toggle-icon #closeIcon");
closeIcon.css({display: "none"});
openIcon.on("click", function() {
        $(".side-nav-menu")
            .animate({left: 0}, 400);
        openIcon.css({display: "none"});
        closeIcon.css({display: "inline"});
        for (let i = 0; i < 5; i++) {
            $(".side-nav-menu .links-side .links ul li").eq(i)
                .animate({top: "1px"}, (i + 5) * 100)
        }
})
closeIcon.on("click", function() {
    $(".side-nav-menu")
            .animate({left: -232}, 400);
        openIcon.css({display: "inline"});
        closeIcon.css({display: "none"});
        $(".side-nav-menu .links-side .links ul li")
    .animate({top: 300}, 500)
})
/* Ending Side bar */




/* Starting of Home Page */
let foodItems = document.querySelector("main .container .food-items");
let foodItem = document.querySelector("main .container .food-item");
let getMeals = async() => {
    try
    {
        let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
        let response = await payload.json();
        // console.log(response.meals);
        displayMeals(response.meals);
    }
    catch(error)
    {
        console.log(error);
    }
}
getMeals();

let displayMeals = (array) => {
    let cartoona = ``;
    for (let i = 0; i < array.length; i++) {
        cartoona += 
        `
        <div class="col-md-3">
            <div class="food-item" onclick="getOneMeal(${array[i].idMeal})">
                <img src="${array[i].strMealThumb}" class="w-100" alt="${array[i].strMeal}">
                <div class="food-description">
                    <p class="text-black text-center fs-3 fw-medium">${array[i].strMeal}</p>
                </div>
            </div>
        </div>
        `;
    }
    foodItems.innerHTML = cartoona;
    // searchInputs.classList.replace("d-flex", "d-none");
}
let getOneMeal = async (mealID) => {
    try
    {
        let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        let response = await payload.json();
        for (let i = 0; i < response.meals.length; i++) {
            console.log(response.meals[0]);
            mealInfo(response.meals[0]);
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

let mealInfo = (meal) => {
    let cartoona = `
    <div class="col-md-4 text-white">
        <img src="${meal.strMealThumb}" class="w-100 rounded-2" alt="${meal.strMeal}">
        <p class="food-name fs-3 fw-medium pt-3 text-center">${meal.strMeal}</p>
    </div>
    <div class="col-md-8 text-white">
        <h2>Instructions</h2>
        <p class="pt-3">${meal.strInstructions}</p>
        <div class="area d-flex align-items-baseline justify-content-start">
            <span class="fs-2 fw-medium">Area:</span>
            <h3> &nbsp; ${meal.strArea}</h3>
        </div>
        <div class="category d-flex align-items-baseline justify-content-start">
            <span class="fs-2 fw-medium">Category:</span>
            <h3> &nbsp;${meal.strCategory}</h3>
        </div>
        <div class="recipes">
            <h3 class="fs-2 fw-medium">Recipes:</h3>
            <ul class="d-flex flex-wrap" id="mealIngredients">
                
            </ul>
        </div>
        <div class="tag mb-4">
            <h3>Tags :</h3>
            <p class="bg-danger bg-opacity-25 rounded-3 p-2 text-center mb-3">${meal.strTags}</p>
            <a href="${meal.strSource}" target="_blank"><span class="source bg-success me-3 rounded-2 p-1">Source</span></a>
            <a href="${meal.strYoutube}" target="_blank"><span class="youtube bg-danger rounded-2 p-1">Youtube</span></a>
        </div>
        
    </div>
    `
    foodItems.innerHTML = ``;
    foodItem.innerHTML = cartoona;
    let mealIngredients = document.getElementById("mealIngredients");
    
    let ingredients = [];
        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];
            if (ingredient && measure) {
                ingredients.push(`${measure} ${ingredient}`);
            }
        }
    let mealListIngredients = ``;  
    for (let i = 0; i < ingredients.length; i++) {
        mealListIngredients +=`
        <li class="bg-success bg-opacity-50 rounded-3 p-2 m-2">${ingredients[i]}</li>
        `
    }
    mealIngredients.innerHTML = mealListIngredients;
}

/* Ending of Home Page */





/* Starting of Search */
let searchNameInput = document.querySelector(".food-search #searchName");
let searchLetterInput = document.querySelector(".food-search #searchLetter");
let searchResult = document.querySelector(".food-search .search-results");
let searchInputs = document.querySelector(".food-search #searchInputs");

let displaySearch = () => {
    searchInputs.classList.replace("d-none", "d-flex");
    foodItems.innerHTML = ``;
    foodItem.innerHTML = ``;
}
let getSearchByName = () => {
    searchNameInput.addEventListener("keyup", async() => {
        try
        {
            let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchNameInput.value}`);
            let response = await payload.json();
            displayMeals(response.meals);
            console.log(response.meals);
        }
        catch(error)
        {
            console.log(error);
        }
})
}
getSearchByName();

let getSearchByLetter = () => {
    searchLetterInput.addEventListener("keyup", async() => {
        try
        {
            let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLetterInput.value}`);
            let response = await payload.json();
            displayMeals(response.meals);
        }
        catch(error)
        {
            console.log(error);
        }
})
}
getSearchByLetter();

// https://www.themealdb.com/api/json/v1/1/search.php?s=   --> Name
// https://www.themealdb.com/api/json/v1/1/search.php?f=     --> Letter

/* Ending of Search */



/* Starting of Category */

let getCategories = async () => {

    foodItems.innerHTML = ``;
    foodItem.innerHTML = ``;
    try
    {
        let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        let response = await payload.json();
        console.log(response.categories);
        displayCategories(response.categories);
    }
    catch(error)
    {
        console.log(error);
    }
}
let displayCategories = (array) => {
    let cartoona = ``;
    for(let i = 0; i < array.length; i++) {
        cartoona += 
        `
        <div class="col-md-3">
            <div class="food-item" onclick="getOneMealOfcategory('${array[i].strCategory}')">
                <img src="${array[i].strCategoryThumb}" class="w-100" alt="${array[i].strCategory}">
                <div class="food-description text-center">
                    <p class="text-black text-center fs-6 p-0">${array[i].strCategory}</p>
                    <small class="text-black text-center p-3 overflow-hidden">${array[i].strCategoryDescription}</small>
                </div>
            </div>
        </div>
        
        `;
    }
    foodItems.innerHTML = cartoona;
}
let getOneMealOfcategory = async(category) => {
    try
    {
        let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`);
        let response = await payload.json();
        console.log(response.meals);
        displayMealsOfCategory(response.meals);
    }
    catch(error)
    {
        console.log(error);
    }
}
let displayMealsOfCategory = (array) => {
    let cartoona = ``;
        for (let i = 0; i < array.length; i++) {
            cartoona += 
            `
            <div class="col-md-3">
                <div class="food-item" onclick="getCategoryMealsDetails('${array[i].strMeal}');">
                    <img src="${array[i].strMealThumb}" class="w-100" alt="${array[i].strMeal}">
                    <div class="food-description text-center">
                        <p class="text-black text-center fs-6 p-0">${array[i].strMeal}</p>
                    </div>
                </div>
            </div>
            `;
        }
        foodItems.innerHTML = cartoona;
}
let getCategoryMealsDetails = async(mealName) => {
    try
    {
        let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        let response = await payload.json();
        console.log(response.meals[0]);
        mealInfo(response.meals[0]);
    }
    catch(error)
    {
        console.log(error);
    }
}
/* Ending of Category */



/* Starting of Area */
// let getCountry = async () => {

//     foodItems.innerHTML = ``;
//     foodItem.innerHTML = ``;
//     try
//     {
//         let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
//         let response = await payload.json();
//             // console.log(response.meals);
//             displayCountry(response.meals);
//     }
//     catch(error)
//     {
//         console.log(error);
//     }
// }
// let displayCountry = (array) => {
//     let cartoona = ``;
//     for(let i = 0; i < array.length; i++) {
//         cartoona += 
//         `
//         <div class="col-md-3" onclick="getCountryMeals('${array[i].strArea}')">
//             <div class="country text-white">
//                 <i class="fa-solid fa-house-laptop fa-4x"></i>
//                 <h3>${array[i].strArea}</h3>
//             </div>
//         </div>
//         `;
//     }
//     foodItem.innerHTML = cartoona;
// }
// let getCountryMeals = async(country) => {
//     try
//     {
//         let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
//         let response = await payload.json();
//         console.log(response.meals);
//         displayCountryMeals(response.meals);
//     }
//     catch(error)
//     {
//         console.log(error);
//     }
// }
// let displayCountryMeals = (array) =>{

//     foodItems.innerHTML = ``;
//     foodItem.innerHTML = ``;

//     let cartoona = ``;
//     for(let i = 0; i < array.length; i++) {
//         cartoona += 
//         `
//         <div class="col-md-3">
//             <div class="food-item" onclick="getCountryMealsDetails('${array[i].strMeal}');">
//                 <img src="${array[i].strMealThumb}" class="w-100" alt="${array[i].strMeal}">
//                 <div class="food-description text-center">
//                     <p class="text-black text-center fs-6 p-0">${array[i].strMeal}</p>
//                 </div>
//             </div>
//         </div>

//         `;
        
//     }
//     foodItems.innerHTML = cartoona;
    
// }
// let getCountryMealsDetails = async(mealName) => {
//     try
//     {
//         let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
//         let response = await payload.json();
//         console.log(response.meals[0]);
//         mealInfo(response.meals[0]);
//     }
//     catch(error)
//     {
//         console.log(error);
//     }
// }
/* Ending of Area */






/* Starting of Ingredients */
let getIngredients = async () => {

    foodItems.innerHTML = ``;
    foodItem.innerHTML = ``;
    try
    {
        let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        let response = await payload.json();
        console.log(response.meals);
        displayIngredients(response.meals);
    }
    catch(error)
    {
        console.log(error);
    }
}
let displayIngredients = (array) => {
    let cartoona = ``;
    for(let i = 0; i < 20; i++) {
        cartoona += 
        `
        <div class="col-md-3">
            <div class="ingredient text-white" onclick="getMealsOfIngredients('${array[i].strIngredient}')">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${array[i].strIngredient}</h3>
                <p class="text-white p-0 m-0 overflow-hidden" id="displayIngredientsParagraph">${array[i].strDescription}</p>
            </div>
        </div>
        `;
    }
    foodItem.innerHTML = cartoona;
}

let getMealsOfIngredients = async(category) => {
    try
    {
        let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`);
        let response = await payload.json();
        // console.log(response.meals);
        displayMealsOfIngredients(response.meals);
    }
    catch(error)
    {
        console.log(error);
    }
}
let displayMealsOfIngredients = (array) => {
    let cartoona = ``;
        for (let i = 0; i < array.length; i++) {
            cartoona += 
            `
            <div class="col-md-3">
                <div class="food-item" onclick="getDisplayMealsDetails('${array[i].strMeal}');">
                    <img src="${array[i].strMealThumb}" class="w-100" alt="${array[i].strMeal}">
                    <div class="food-description text-center">
                        <p class="text-black text-center fs-6 p-0">${array[i].strMeal}</p>
                    </div>
                </div>
            </div>
            `;
        }
        foodItem.innerHTML = ``;
        foodItems.innerHTML = cartoona;
}
let getDisplayMealsDetails = async(mealName) => {
        try
        {
            let payload = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
            let response = await payload.json();
            console.log(response.meals[0]);
            mealInfo(response.meals[0]);
        }
        catch(error)
        {
            console.log(error);
        }
}
/* Ending of Ingredients */




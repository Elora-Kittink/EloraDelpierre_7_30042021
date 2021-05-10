import { recipes } from "./recipes.js";

function searchBar() {
  let recipesToDisplay = [];
  const resultGallery = document.getElementById("result");
  const searchBarInput = document.getElementById("search__bar__input");
  let searchValue = searchBarInput.value;
  if (searchValue.length >= 3) {
    for (let recipe of recipes) {
      let nameArray = recipe.name.split(" ");
      let descArray = recipe.description.split(" ");
      let ingredientsArray = recipe.ingredients.map((ing) => {
        return ing.ingredient;
      });
      if (nameArray.some((el) => el.toLowerCase().match(searchValue.toLowerCase()))) {
        // choisir l'ordre qui a le plus de chance d'abouttir a un true rapidement//

        recipesToDisplay.push(recipe);
      } else if (descArray.some((el) => el.toLowerCase().match(searchValue.toLowerCase()))) {
        recipesToDisplay.push(recipe);
      } else if (ingredientsArray.some((el) => el.toLowerCase().match(searchValue.toLowerCase()))) {
        recipesToDisplay.push(recipe);
      }
      console.log(recipesToDisplay.length);
    }
  }
  resultGallery.innerHTML = "";
  console.log(recipesToDisplay);
  displayRecipes(recipesToDisplay);
  const ingredientTagInput = document.getElementById("search__sort__ingredients__input");
  ingredientTagInput.addEventListener("click", function () {
    const ulIngredient = document.getElementById("search__sort__ingredients__ul");
    ulIngredient.innerHTML = "";
    ingredientTagSearch(recipesToDisplay);
  });
}

function ingredientTagSearch(recipesArray) {
  let allIngredients = [];
  for (let recipe of recipesArray) {
    allIngredients.push(
      recipe.ingredients.map((ing) => {
        // mettre dans le tableau allIngredients tous les ingrédients splités//
        return ing.ingredient.split(" ");
      })
    );
  }

  allIngredients = allIngredients.flat(2); // supprimer les profondeurs de tableau sur 2 niveaux//

  let uniqueIngredientsArray = Array.from(new Set(allIngredients)); //enlever les doublons//
  console.log(uniqueIngredientsArray);
  for (let ingredient of uniqueIngredientsArray) {
    console.log(ingredient);
    const ulIngredient = document.getElementById("search__sort__ingredients__ul");
    const liIngredient = document.createElement("li");
    ulIngredient.appendChild(liIngredient);
    const linkIngredient = document.createElement("a");
    linkIngredient.setAttribute("class", "search__sort__ingredients__ul__li dropdown-item");
    linkIngredient.setAttribute("href", "#");
    linkIngredient.innerHTML = ingredient;
    liIngredient.appendChild(linkIngredient);
  }
}

function displayRecipes(recipesArray) {
  const resultGallery = document.getElementById("result");
  const searchBarInput = document.getElementById("search__bar__input");
  searchBarInput.addEventListener("input", searchBar);

  if (recipesArray.length == 0) {
    const noResult = document.createElement("p");
    noResult.setAttribute("id", "result__no");
    noResult.innerText = "Aucun résultat";
    resultGallery.appendChild(noResult);
  } else {
    for (let recipe of recipesArray) {
      const recipesName = recipe.name;
      const recipesIngredients = recipe.ingredients;
      const recipesTime = recipe.time;
      const recipesDesc = recipe.description;
      const recipesAppliance = recipe.appliance;
      const recipesUstensils = recipe.ustensils;
      const recipeCol = document.createElement("div");
      recipeCol.setAttribute("class", "col");
      resultGallery.appendChild(recipeCol);
      const recipeCard = document.createElement("div");
      recipeCard.setAttribute("class", "recipe ");
      recipeCol.appendChild(recipeCard);
      addImgInRecipe(recipeCard);
      const recipeInfo = document.createElement("div");
      recipeInfo.setAttribute("class", "recipe__info ");
      recipeCard.appendChild(recipeInfo);
      addTitleInRecipe(recipeInfo, recipesName, recipesTime);
      addIngredientsInrecipe(recipesIngredients, recipeInfo);
      addDescInRecipe(recipeInfo, recipesDesc);
      addApplianceInRecipe(recipeInfo, recipesAppliance);
      addUstensilsInRecipe(recipeInfo, recipesUstensils);
    }
  }
}

function addImgInRecipe(recipeCard) {
  const recipeImg = document.createElement("div");
  recipeImg.setAttribute("class", "recipe__img ");
  recipeCard.appendChild(recipeImg);
}

function addTitleInRecipe(recipeInfo, recipesName, recipesTime) {
  const recipeTitle = document.createElement("div");
  recipeTitle.setAttribute("class", "recipe__info__title ");
  recipeInfo.appendChild(recipeTitle);
  const recipeName = document.createElement("p");
  recipeName.setAttribute("class", "recipe__info__title__name");
  recipeName.textContent = recipesName;
  recipeTitle.appendChild(recipeName);
  const recipeTime = document.createElement("p");
  recipeTime.setAttribute("class", "recipe__info__title__time");
  recipeTime.innerHTML = '<i class="far fa-clock"></i>' + recipesTime + " min";
  recipeTitle.appendChild(recipeTime);
}

function addIngredientsInrecipe(recipesIngredients, recipeInfo) {
  const ingredientsList = document.createElement("div");
  ingredientsList.setAttribute("class", "recipe__info__ingredients");
  recipeInfo.appendChild(ingredientsList);
  for (let ingredient of recipesIngredients) {
    const ingredientName = ingredient.ingredient;
    const ingredientQty = ingredient.quantity;
    const ingredientUnit = ingredient.unit;
    let ingredients = document.createElement("p");
    ingredients.setAttribute("class", "recipe__info__ingredients__ingredient");
    ingredients.innerHTML = ingredientName;
    ingredientsList.appendChild(ingredients);
    if (ingredient.quantity !== undefined) {
      ingredients.innerHTML = ingredientName + ": " + ingredientQty;
    }
    if (ingredient.unit !== undefined) {
      ingredients.innerHTML = ingredientName + ": " + ingredientQty + ingredientUnit;
    }
  }
}

function addDescInRecipe(recipeInfo, recipesDesc) {
  const instructions = document.createElement("p");
  instructions.setAttribute("class", "recipe__info__description");
  instructions.innerHTML = recipesDesc;
  recipeInfo.appendChild(instructions);
}

function addApplianceInRecipe(recipeInfo, recipesAppliance) {
  const appliance = document.createElement("p");
  appliance.setAttribute("class", "recipe__info__appliance");
  appliance.innerHTML = recipesAppliance;
  recipeInfo.appendChild(appliance);
}

function addUstensilsInRecipe(recipeInfo, recipesUstensils) {
  const ustensils = document.createElement("p");
  ustensils.setAttribute("class", "recipe__info__ustensils");
  ustensils.innerHTML = recipesUstensils;
  recipeInfo.appendChild(ustensils);
}

displayRecipes(recipes);

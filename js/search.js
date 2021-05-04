import { recipes } from "./recipes.js";

console.log("test");
console.log(recipes);

function displayRecipes() {
  const resultGallery = document.getElementById("result");
  for (let recipe of recipes) {
    const recipesId = recipe.id;
    const recipesName = recipe.name;
    const recipesServing = recipe.servings;
    const recipesIngredients = recipe.ingredients;
    console.log(recipe.ingredients);
    const recipesTime = recipe.time;
    const recipesDesc = recipe.description;
    const recipesAppliance = recipe.appliance;
    const recipesUstensils = recipe.ustensils;
    const recipeCard = document.createElement("div");
    recipeCard.setAttribute("class", "recipe");
    resultGallery.appendChild(recipeCard);
    const recipeInfo = document.createElement("div");
    recipeInfo.setAttribute("class", "recipe__info");
    recipeCard.appendChild(recipeInfo);
    addImgInRecipe(recipeCard);
    addTitleInRecipe(recipeInfo, recipesName, recipesTime);
    addIngredientsInrecipe(recipesIngredients, recipeInfo);
    addDescInRecipe(recipeInfo, recipesDesc);
    addApplianceInRecipe(recipeInfo, recipesAppliance);
    addUstensilsInRecipe(recipeInfo, recipesUstensils);
  }
}

function addImgInRecipe(recipeCard) {
  const recipeImg = document.createElement("div");
  recipeImg.setAttribute("class", "recipe__img");
  recipeCard.appendChild(recipeImg);
}

function addTitleInRecipe(recipeInfo, recipesName, recipesTime) {
  const recipeTitle = document.createElement("div");
  recipeTitle.setAttribute("class", "recipe__info__title");
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
    ingredients.innerHTML = ingredientName + ": " + ingredientQty + ingredientUnit;
    ingredientsList.appendChild(ingredients);
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

displayRecipes();

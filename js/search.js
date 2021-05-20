import { recipes } from "./recipes.js";
//  ../sass/dart-sass/sass css/style.scss css/style.css --watch //
let recipesToDisplay2 = [];

//---------------------------------------Search-bar----------------------------------------------------------//

function search(searchValue) {
  // algo de recherche n°1 de la barre de recherche
  let recipesSorted = [];
  if (searchValue.length >= 3) {
    for (let recipe of recipes) {
      let nameArray = recipe.name.split(" ");
      let descArray = recipe.description.split(" ");
      let ingredientsArray = recipe.ingredients.map((ing) => {
        return ing.ingredient;
      });
      if (descArray.some((el) => el.toLowerCase().match(searchValue.toLowerCase()))) {
        recipesSorted.push(recipe);
      } else if (nameArray.some((el) => el.toLowerCase().match(searchValue.toLowerCase()))) {
        recipesSorted.push(recipe);
      } else if (ingredientsArray.some((el) => el.toLowerCase().match(searchValue.toLowerCase()))) {
        recipesSorted.push(recipe);
      }
    }
  }

  return recipesSorted;
}

function search2(searchValue) {
  //algo n°2 de recherche sur la barre de recherche
  let recipesSorted = [];
  if (searchValue.length >= 3) {
    recipesSorted = recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchValue) || recipe.ingredients.some((i) => i.ingredient.toLowerCase().includes(searchValue)) || recipe.description.toLowerCase().includes(searchValue);
    });
  }
  return recipesSorted;
}

function searchBar() {
  //mise en place de la barre de recherche et de l'écoute//
  const resultGallery = document.getElementById("result");
  const searchBarInput = document.getElementById("search__bar__input");
  let searchValue = searchBarInput.value;
  recipesToDisplay2 = search2(searchValue); //peut-être pas utile de préciser recipestodisplay = puisque passé en globale//
  const ulIngredient = document.getElementById("search__sort__ingredients__ul");
  resultGallery.innerHTML = "";
  displayRecipes(recipesToDisplay2);
  const ingredientTagInput = document.getElementById("search__sort__ingredients__input");
  ingredientTagInput.addEventListener("click", function () {
    ulIngredient.innerHTML = "";
    if (recipesToDisplay2.length == 0) {
      ingredientTagSearch(recipes);
    } else {
      ingredientTagSearch(recipesToDisplay2);
    }
  });
}

//----------------------------------------------INGREDIENTS----------------------------------------------------------------//

function ingredientTagSearch(recipesArray) {
  let allIngredients = [];
  for (let recipe of recipesArray) {
    allIngredients.push(
      recipe.ingredients.map((ing) => {
        // mettre dans le tableau allIngredients tous les ingrédients//
        return ing.ingredient.toLowerCase(); //ajouter .split ici si on veut mot par mot//
      })
    );
  }
  allIngredients = allIngredients.flat(); // supprimer les profondeurs de tableau sur 2 niveaux//
  let uniqueIngredientsArray = Array.from(new Set(allIngredients)); //enlever les doublons//
  displayIngredients(uniqueIngredientsArray.sort());
  console.log(uniqueIngredientsArray);
}

function displayIngredients(arrayOfIngredientsToDisplay) {
  const ulIngredient = document.getElementById("search__sort__ingredients__ul");
  const ingredientTagInput = document.getElementById("search__sort__ingredients__input");
  ulIngredient.innerHTML = "";
  for (let ingredient of arrayOfIngredientsToDisplay) {
    const liIngredient = document.createElement("li");
    ulIngredient.appendChild(liIngredient);
    const linkIngredient = document.createElement("a");
    linkIngredient.classList.add("search__sort__ingredients__ul__li", "dropdown-item");
    linkIngredient.href = "#";
    linkIngredient.id = ingredient;
    linkIngredient.innerHTML = ingredient;
    linkIngredient.addEventListener("click", selectAnIngredientTag);
    liIngredient.appendChild(linkIngredient);
  }
  ingredientTagInput.addEventListener("input", function () {
    ingredientTagInputSearch(arrayOfIngredientsToDisplay);
  });
}

function ingredientTagInputSearch(ingredientsArray) {
  const ingredientTagInput = document.getElementById("search__sort__ingredients__input");
  let ingredientTagValue = ingredientTagInput.value;
  let ingredientsTagArray = ingredientsArray.filter((ing) => ing.toLowerCase().includes(ingredientTagValue));
  displayIngredients(ingredientsTagArray);
}

//---------------------------------------------APPLIANCE------------------------------------------------------------//

function applianceTagSearch(recipesArray) {
  let allAppliance = [];
  for (let recipe of recipesArray) {
    allAppliance.push(recipe.appliance);
  }

  let uniqueApplianceArray = Array.from(new Set(allAppliance)); //enlever les doublons//
  displayAppliance(uniqueApplianceArray.sort());
}

function displayAppliance(arrayOfAppliancesToDisplay) {
  const ulAppliance = document.getElementById("search__sort__appliance__ul");
  const applianceTagInput = document.getElementById("search__sort__appliance__input");
  ulAppliance.innerHTML = "";
  for (let appliance of arrayOfAppliancesToDisplay) {
    const liAppliance = document.createElement("li");
    ulAppliance.appendChild(liAppliance);
    const linkAppliance = document.createElement("a");
    linkAppliance.classList.add("search__sort__appliances__ul__li", "dropdown-item");
    linkAppliance.href = "#";
    linkAppliance.id = appliance;
    linkAppliance.innerHTML = appliance;
    linkAppliance.addEventListener("click", selectAnApplianceTag);
    liAppliance.appendChild(linkAppliance);
  }
  applianceTagInput.addEventListener("input", function () {
    applianceTagInputSearch(arrayOfAppliancesToDisplay);
  });
}

function applianceTagInputSearch(appliancesArray) {
  const applianceTagInput = document.getElementById("search__sort__appliance__input");
  let applianceTagValue = applianceTagInput.value;
  let appliancesTagArray = appliancesArray.filter((ing) => ing.toLowerCase().includes(applianceTagValue));
  displayAppliance(appliancesTagArray);
}

function selectAnApplianceTag(e) {
  const applianceTagInput = document.getElementById("search__sort__appliance__input");
  applianceTagInput.value = ""; // quand on selectionne un ingredient le champs de saisie se vide//
  let IDapplianceTagSelected = e.target.id.toLowerCase();
  if (recipesToDisplay2.length == 0) {
    //si il n'y a pas déjà eu de tri par searchbar, trier à partir de recipes//
    let recipesFilteredByTag = recipes.filter((recipe) => {
      return recipe.appliance.toLowerCase().includes(IDapplianceTagSelected);
    });
    recipesToDisplay2 = recipesFilteredByTag;
    displayRecipes(recipesFilteredByTag);
    applianceTagSearch(recipesFilteredByTag);
  } else {
    // si il y a déjà eu un tri searchbar re trier parmis les recettes triées par searchbar//
    recipesToDisplay2 = recipesToDisplay2.filter((recipe) => {
      return recipe.appliance.toLowerCase().includes(IDapplianceTagSelected);
    });
    displayRecipes(recipesToDisplay2);
    ingredientTagSearch(recipesToDisplay2);
  }
  displayTagIngredientSelected(IDapplianceTagSelected);
}

//-------------------------------------------------USTENSILES------------------------------------------------------------------------------//

function selectAnIngredientTag(e) {
  const ingredientTagInput = document.getElementById("search__sort__ingredients__input");
  ingredientTagInput.value = ""; // quand on selectionne un ingredient le champs de saisie se vide//
  let IDingredientTagSelected = e.target.id.toLowerCase();
  if (recipesToDisplay2.length == 0) {
    //si il n'y a pas déjà eu de tri par searchbar, trier à partir de recipes//
    let recipesFilteredByTag = recipes.filter((recipe) => {
      return recipe.ingredients.some((i) => i.ingredient.toLowerCase().includes(IDingredientTagSelected));
    });
    recipesToDisplay2 = recipesFilteredByTag;
    displayRecipes(recipesFilteredByTag);
    ingredientTagSearch(recipesFilteredByTag);
  } else {
    // si il y a déjà eu un tri searchbar re trier parmis les recettes triées par searchbar//
    recipesToDisplay2 = recipesToDisplay2.filter((recipe) => {
      return recipe.ingredients.some((i) => i.ingredient.toLowerCase().includes(IDingredientTagSelected));
    });
    displayRecipes(recipesToDisplay2);
    ingredientTagSearch(recipesToDisplay2);
  }
  displayTagApplianceSelected(IDingredientTagSelected);
}

function displayRecipes(recipesArray) {
  const resultGallery = document.getElementById("result");
  resultGallery.innerHTML = "";
  const searchBarInput = document.getElementById("search__bar__input");
  searchBarInput.addEventListener("input", function () {
    searchBar(recipes);
  });

  if (recipesArray.length == 0) {
    const noResult = document.createElement("p");
    noResult.id = "result__no";
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
      recipeCol.classList.add("col");
      resultGallery.appendChild(recipeCol);
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe");
      recipeCol.appendChild(recipeCard);
      addImgInRecipe(recipeCard);
      const recipeInfo = document.createElement("div");
      recipeInfo.classList.add("recipe__info");
      recipeCard.appendChild(recipeInfo);
      addTitleInRecipe(recipeInfo, recipesName, recipesTime);
      addIngredientsInrecipe(recipesIngredients, recipeInfo);
      addDescInRecipe(recipeInfo, recipesDesc);
      addApplianceInRecipe(recipeInfo, recipesAppliance);
      addUstensilsInRecipe(recipeInfo, recipesUstensils);
    }
  }
}

function displayTagIngredientSelected(ingredientId) {
  const tagZone = document.getElementById("search__tags");
  let tagCell = document.createElement("div");
  tagCell.classList.add("search__tags__cell", "ingredient-tag");
  tagZone.appendChild(tagCell);
  let tagClose = document.createElement("button");
  tagClose.classList.add("search__tags__cell__close");
  tagCell.appendChild(tagClose);
  tagCell.innerText = ingredientId;
}

function displayTagApplianceSelected(applianceId) {
  const tagZone = document.getElementById("search__tags");
  let tagCell = document.createElement("div");
  tagCell.classList.add("search__tags__cell", "appliance-tag");
  tagZone.appendChild(tagCell);
  let tagClose = document.createElement("button");
  tagClose.classList.add("search__tags__cell__close");
  tagCell.appendChild(tagClose);
  tagCell.innerText = applianceId;
}

function addImgInRecipe(recipeCard) {
  const recipeImg = document.createElement("div");
  recipeImg.classList.add("recipe__img");
  recipeCard.appendChild(recipeImg);
}

function addTitleInRecipe(recipeInfo, recipesName, recipesTime) {
  const recipeTitle = document.createElement("div");
  recipeTitle.classList.add("recipe__info__title");
  recipeInfo.appendChild(recipeTitle);
  const recipeName = document.createElement("p");
  recipeName.classList.add("recipe__info__title__name");
  recipeName.textContent = recipesName;
  recipeTitle.appendChild(recipeName);
  const recipeTime = document.createElement("p");
  recipeTime.classList.add("recipe__info__title__time");
  recipeTime.innerHTML = '<i class="far fa-clock"></i>' + recipesTime + " min";
  recipeTitle.appendChild(recipeTime);
}

function addIngredientsInrecipe(recipesIngredients, recipeInfo) {
  const ingredientsList = document.createElement("div");
  ingredientsList.classList.add("recipe__info__ingredients");
  recipeInfo.appendChild(ingredientsList);
  for (let ingredient of recipesIngredients) {
    const ingredientName = ingredient.ingredient;
    const ingredientQty = ingredient.quantity;
    const ingredientUnit = ingredient.unit;
    let ingredients = document.createElement("p");
    ingredients.classList.add("recipe__info__ingredients__ingredient");
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
  instructions.classList.add("recipe__info__description");
  instructions.innerHTML = recipesDesc;
  recipeInfo.appendChild(instructions);
}

function addApplianceInRecipe(recipeInfo, recipesAppliance) {
  const appliance = document.createElement("p");
  appliance.classList.add("recipe__info__appliance");
  appliance.innerHTML = recipesAppliance;
  recipeInfo.appendChild(appliance);
}

function addUstensilsInRecipe(recipeInfo, recipesUstensils) {
  const ustensils = document.createElement("p");
  ustensils.classList.add("recipe__info__ustensils");
  ustensils.innerHTML = recipesUstensils;
  recipeInfo.appendChild(ustensils);
}

displayRecipes(recipes);
ingredientTagSearch(recipes);
applianceTagSearch(recipes);

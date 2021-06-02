import { recipes } from "./recipes.js";
//  ../sass/dart-sass/sass css/style.scss css/style.css --watch //
let recipesToDisplay2 = [];

//---------------------------------------Search-bar----------------------------------------------------------//

function search2(searchValue) {
  //algo option 2 de recherche sur la barre de recherche
  let recipesSorted = [];
  if (searchValue.length >= 3) {
    //la methode filtre chaque recette du tableau et retourne un tableau des recettes incluant la valeure recherchée //
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
  resultGallery.innerHTML = "";
  recipesToDisplay2 = search2(searchValue);
  displayRecipes(recipesToDisplay2); //affichage des recettes filtrées par search2//
  if (recipesToDisplay2.length == 0) {
    // mise à jour des tags //
    ingredientTagSearch(recipes);
    applianceTagSearch(recipes);
    ustensilsTagSearch(recipes);
  } else {
    ingredientTagSearch(recipesToDisplay2);
    applianceTagSearch(recipesToDisplay2);
    ustensilsTagSearch(recipesToDisplay2);
  }
}

//----------------------------------------------INGREDIENTS----------------------------------------------------------------//

function ingredientTagSearch(recipesArray) {
  //créé un tableau regroupant tous les ingrédients sans doublons d'un tableau qu'on lui donne
  let allIngredients = [];
  const ingredientTagInput = document.getElementById("search__sort__ingredients__input");
  for (let recipe of recipesArray) {
    allIngredients.push(
      recipe.ingredients.map((ing) => {
        // mettre dans le tableau allIngredients tous les ingrédients//
        return ing.ingredient.toLowerCase(); //ajouter .split ici si on veut mot par mot//
      })
    );
  }
  allIngredients = allIngredients.flat(); // supprimer les profondeurs de tableau //
  let uniqueIngredientsArray = Array.from(new Set(allIngredients)); //enlever les doublons//
  const arrayOfIngredientsToDisplay = uniqueIngredientsArray.sort();
  ingredientTagInput.addEventListener("input", function () {
    // écoute si on rentre une valeur dans le champs de recherche d'ingrédients

    ingredientTagInputSearch(arrayOfIngredientsToDisplay);
  });
  displayTags(arrayOfIngredientsToDisplay, "search__sort__ingredients__ul", "search__sort__ingredients__ul__li", selectAnIngredientTag); //afficher les ingrédients par ordre alphabetique
}

function selectAnIngredientTag(e) {
  // créé un tableau regroupant les recettes dont les ingrédients contiennent l'ingrédient selectionné et réactualise avec les recettes affichées et les tags restants
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
    applianceTagSearch(recipesFilteredByTag);
    ustensilsTagSearch(recipesFilteredByTag);
  } else {
    // si il y a déjà eu un tri searchbar re trier parmis les recettes triées par searchbar//
    recipesToDisplay2 = recipesToDisplay2.filter((recipe) => {
      return recipe.ingredients.some((i) => i.ingredient.toLowerCase().includes(IDingredientTagSelected));
    });
    displayRecipes(recipesToDisplay2);
    ingredientTagSearch(recipesToDisplay2);
    applianceTagSearch(recipesToDisplay2);
    ustensilsTagSearch(recipesToDisplay2);
  }
  displayTagIngredientSelected(IDingredientTagSelected);
}

function ingredientTagInputSearch(ingredientsArray) {
  // créé un tableau regroupants les ingrédients incluant la valeure entrée dans l'input et actualise l'affichage des ingrédient correspondants
  const ingredientTagInput = document.getElementById("search__sort__ingredients__input");
  let ingredientTagValue = ingredientTagInput.value;
  let ingredientsTagArray = ingredientsArray.filter((ing) => ing.toLowerCase().includes(ingredientTagValue));
  displayTags(ingredientsTagArray, "search__sort__ingredients__ul", "search__sort__ingredients__ul__li", selectAnIngredientTag);
}

function displayTagIngredientSelected(ingredientId) {
  // affiche le tag selectionné
  const tagZone = document.getElementById("search__tags");
  let tagCell = document.createElement("div");
  tagCell.classList.add("search__tags__cell", "ingredient-tag");
  tagZone.appendChild(tagCell);
  const tagContent = document.createElement("span");
  tagContent.textContent = ingredientId;
  tagCell.appendChild(tagContent);
  const tagIcon = document.createElement("i");
  tagIcon.classList.add("far", "fa-times-circle");
  tagCell.appendChild(tagIcon);
  tagIcon.addEventListener("click", () => {
    tagCell.remove();
  });
}

//---------------------------------------------APPLIANCE------------------------------------------------------------//

function applianceTagSearch(recipesArray) {
  let allAppliance = [];
  for (let recipe of recipesArray) {
    allAppliance.push(recipe.appliance);
  }

  let uniqueApplianceArray = Array.from(new Set(allAppliance)); //enlever les doublons//
  const arrayOfAppliancesToDisplay = uniqueApplianceArray.sort();
  const applianceTagInput = document.getElementById("search__sort__appliance__input");
  applianceTagInput.addEventListener("input", function () {
    applianceTagInputSearch(arrayOfAppliancesToDisplay);
  });
  displayTags(arrayOfAppliancesToDisplay, "search__sort__appliance__ul", "search__sort__appliances__ul__li", selectAnApplianceTag);
}

function applianceTagInputSearch(appliancesArray) {
  const applianceTagInput = document.getElementById("search__sort__appliance__input");
  let applianceTagValue = applianceTagInput.value;
  let appliancesTagArray = appliancesArray.filter((ing) => ing.toLowerCase().includes(applianceTagValue));
  displayTags(appliancesTagArray, "search__sort__appliance__ul", "search__sort__appliances__ul__li", selectAnApplianceTag);
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
    ustensilsTagSearch(recipesFilteredByTag);
    ingredientTagSearch(recipesFilteredByTag);
  } else {
    // si il y a déjà eu un tri searchbar re trier parmis les recettes triées par searchbar//
    recipesToDisplay2 = recipesToDisplay2.filter((recipe) => {
      return recipe.appliance.toLowerCase().includes(IDapplianceTagSelected);
    });
    displayRecipes(recipesToDisplay2);
    ingredientTagSearch(recipesToDisplay2);
    applianceTagSearch(recipesToDisplay2);
    ustensilsTagSearch(recipesToDisplay2);
  }
  displayTagApplianceSelected(IDapplianceTagSelected);
}

function displayTagApplianceSelected(applianceId) {
  const tagZone = document.getElementById("search__tags");
  let tagCell = document.createElement("div");
  tagCell.classList.add("search__tags__cell", "appliance-tag");
  tagZone.appendChild(tagCell);
  const tagContent = document.createElement("span");
  tagContent.textContent = applianceId;
  tagCell.appendChild(tagContent);
  const tagIcon = document.createElement("i");
  tagIcon.classList.add("far", "fa-times-circle");
  tagCell.appendChild(tagIcon);
  tagIcon.addEventListener("click", () => {
    tagCell.remove();
  });
}

//-------------------------------------------------USTENSILS------------------------------------------------------------------------------//

function ustensilsTagSearch(recipesArray) {
  //créé un tableau regroupant tous les ustensiles sans doublons d'un tableau qu'on lui donne
  let allUstensils = [];
  const ustensilsTagInput = document.getElementById("search__sort__ustensils__input");
  for (let recipe of recipesArray) {
    allUstensils.push(recipe.ustensils);
  }

  allUstensils = allUstensils.flat(); // supprimer les profondeurs de tableau //
  let uniqueUstensilsArray = Array.from(new Set(allUstensils)); //enlever les doublons//
  let arrayOfUstensilsToDisplay = uniqueUstensilsArray.sort(); //afficher les ustensiles par ordre alphabetique
  ustensilsTagInput.addEventListener("input", function () {
    // écoute si on rentre une valeur dans le champs de recherche d'ustensiles

    ustensilTagInputSearch(arrayOfUstensilsToDisplay);
  });
  displayTags(arrayOfUstensilsToDisplay, "search__sort__ustensils__ul", "search__sort__ustensils__ul__li", selectAnUstensilTag);
}

function selectAnUstensilTag(e) {
  // créé un tableau regroupant les recettes dont les ustensiles contiennent l'ustensile selectionné et réactualise avec les recettes affichées et les tags restants
  const ustensilsTagInput = document.getElementById("search__sort__ustensils__input");
  ustensilsTagInput.value = ""; // quand on selectionne un ustensile le champs de saisie se vide//
  let IDustensilTagSelected = e.target.id.toLowerCase();
  if (recipesToDisplay2.length == 0) {
    //si il n'y a pas déjà eu de tri par searchbar, trier à partir de recipes//
    let recipesFilteredByTag = recipes.filter((recipe) => {
      return recipe.ustensils.includes(IDustensilTagSelected);
    });
    recipesToDisplay2 = recipesFilteredByTag;
    displayRecipes(recipesFilteredByTag);
    ustensilsTagSearch(recipesFilteredByTag);
    ingredientTagSearch(recipesFilteredByTag);
    applianceTagSearch(recipesFilteredByTag);
  } else {
    // si il y a déjà eu un tri searchbar re trier parmis les recettes triées par searchbar//
    recipesToDisplay2 = recipesToDisplay2.filter((recipe) => {
      return recipe.ustensils.includes(IDustensilTagSelected);
    });
    displayRecipes(recipesToDisplay2);
    ustensilsTagSearch(recipesToDisplay2);
    ingredientTagSearch(recipesToDisplay2);
    applianceTagSearch(recipesToDisplay2);
  }
  displayTagUstensilSelected(IDustensilTagSelected);
}

function ustensilTagInputSearch(ustensilsArray) {
  // créé un tableau regroupants les ustensiles incluant la valeur entrée dans l'input et actualise l'affichage des ustensiles correspondants
  const ustensilTagInput = document.getElementById("search__sort__ustensils__input");
  let ustensilTagValue = ustensilTagInput.value;
  let ustensilsTagArray = ustensilsArray.filter((ing) => ing.toLowerCase().includes(ustensilTagValue));
  displayTags(ustensilsTagArray, "search__sort__ustensils__ul", "search__sort__ustensils__ul__li", selectAnUstensilTag);
}

function displayTagUstensilSelected(ustensilId) {
  // affiche le tag selectionné
  const tagZone = document.getElementById("search__tags");
  let tagCell = document.createElement("div");
  tagCell.classList.add("search__tags__cell", "ustensil-tag");
  tagZone.appendChild(tagCell);
  const tagContent = document.createElement("span");
  tagContent.textContent = ustensilId;
  tagCell.appendChild(tagContent);
  const tagIcon = document.createElement("i");
  tagIcon.classList.add("far", "fa-times-circle");
  tagCell.appendChild(tagIcon);
  tagIcon.addEventListener("click", () => {
    tagCell.remove();
  });
}

//-----------------------------------------GENERAL-------------------------------------------------------------------//

function displayTags(arrayOfItemsToDisplay, ulTagClass, liTagClass, selectTag) {
  const ulTag = document.getElementById(ulTagClass);

  ulTag.innerHTML = "";
  for (let item of arrayOfItemsToDisplay) {
    const liTag = document.createElement("li");
    ulTag.appendChild(liTag);
    const linkTag = document.createElement("a");
    linkTag.classList.add(liTagClass, "dropdown-item");
    linkTag.href = "#";
    linkTag.id = item;
    linkTag.innerHTML = item;
    linkTag.addEventListener("click", selectTag);
    liTag.appendChild(linkTag);
  }
}

function displayRecipes(recipesArray) {
  const resultGallery = document.getElementById("result");
  resultGallery.innerHTML = "";
  const searchBarInput = document.getElementById("search__bar__input");
  searchBarInput.addEventListener("input", function () {
    searchBar(recipes);
  });

  if (recipesArray.length == 0) {
    displayNoResult();
  } else {
    for (let recipe of recipesArray) {
      displayRecipe(recipe);
    }
  }
}

function displayNoResult() {
  const resultGallery = document.getElementById("result");
  const noResult = document.createElement("p");
  noResult.id = "result__no";
  noResult.innerText = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.";
  resultGallery.appendChild(noResult);
}

function displayRecipe(recipe) {
  const resultGallery = document.getElementById("result");
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
  recipeTime.innerHTML = '<i class="far fa-clock"></i> ' + recipesTime + " min";
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
      ingredients.innerHTML = "<strong>" + ingredientName + "</strong>" + ": " + ingredientQty;
    }
    if (ingredient.unit !== undefined) {
      ingredients.innerHTML = "<strong>" + ingredientName + "</strong>" + ": " + ingredientQty + ingredientUnit;
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
ustensilsTagSearch(recipes);

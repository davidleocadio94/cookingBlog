////// recipe card generation

import { loadRecipes, generateRecipeCards, handleLoadMoreClick } from './modules/recipeModule.js';


let visibleRecipes = 3; // Number of initially visible recipes
const loadMoreButton = document.getElementById("load-more-button");


// Usage: Load recipes and generate initial recipe cards
loadRecipes()
  .then(() => {
    generateRecipeCards(0, visibleRecipes);
     if (visibleRecipes >= recipes.length) {
      loadMoreButton.style.display = "none"; // Hide the button if all recipes are visible initially
    }
  })
  .catch((error) => console.error(error));


loadMoreButton.addEventListener("click", handleLoadMoreClick);

///////////



////////// calendar generation



import { makeCalendar } from './modules/calendarModule.js';

makeCalendar()
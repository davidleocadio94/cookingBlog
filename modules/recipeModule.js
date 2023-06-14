let recipes = []; // Global array to store all recipes
let visibleRecipes = 3; // Number of initially visible recipes
const loadMoreButton = document.getElementById("load-more-button");
const recipeContainer = document.getElementById("recipe-container");

// Function to load recipes from JSON file
export function loadRecipes() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "./recipes.json", true);
      xhr.onload = function () {
        if (xhr.status === 200) {
          recipes = JSON.parse(xhr.responseText);
          resolve(recipes);
        } else {
          reject(new Error("Failed to load recipes"));
        }
      };
      xhr.onerror = function () {
        reject(new Error("Failed to load recipes"));
      };
      xhr.send();
    });
  }
  
  // Function to generate recipe cards dynamically
  export function generateRecipeCards(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
      const recipe = recipes[i];
      if (!recipe) return; // Stop if there are no more recipes
  
      const card = document.createElement("div");
      card.classList.add("recipe-card");
  
      const title = document.createElement("h2");
      title.classList.add("recipe-title");
      title.textContent = recipe.title;
  
      const intro = document.createElement("p");
      intro.classList.add("recipe-intro");
      intro.textContent = recipe.intro;
  
      const ingredients = document.createElement("p");
      ingredients.classList.add("recipe-ingredients");
      ingredients.textContent = "Ingredients: " + recipe.ingredients.join(", ");
  
      const recipeSteps = document.createElement("p");
      recipeSteps.classList.add("recipe-recipe");
      recipeSteps.textContent = "Recipe: " + recipe.recipe;
  
      const notes = document.createElement("p");
      notes.classList.add("recipe-notes");
      notes.textContent = "Notes: " + recipe.notes;
  
      card.appendChild(title);
      card.appendChild(intro);
      card.appendChild(ingredients);
      card.appendChild(recipeSteps);
      card.appendChild(notes);
  
      recipeContainer.appendChild(card);
    }
  }
  
  // Function to handle the "Load More" button click event
  export function handleLoadMoreClick() {
    const endIndex = visibleRecipes + 6; // Increase the visible recipes by 6
    generateRecipeCards(visibleRecipes, endIndex);
    visibleRecipes = endIndex; // Update the number of visible recipes
  
    if (visibleRecipes >= recipes.length) {
      loadMoreButton.style.display = "none"; // Hide the button if all recipes are visible
    }
  }
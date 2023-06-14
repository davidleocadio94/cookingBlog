// Import the loadRecipes function from recipeModule.js
import { loadRecipes } from './recipeModule.js';

// Get the current date
const currentDate = new Date();

// Array of weekdays
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Get the calendar grid container
const calendarGrid = document.getElementById("calendar-grid");

// Generate the weekly calendar
export function makeCalendar() {
  // Load the recipes
  loadRecipes()
    .then(recipes => {
      for (let i = 0; i < 7; i++) {
        const day = new Date(currentDate);
        day.setDate(currentDate.getDate() + i);

        const dayOfWeek = day.getDay(); // 0 (Sunday) to 6 (Saturday)
        const dayOfMonth = day.getDate();

        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = `${weekdays[dayOfWeek]}, ${dayOfMonth}`;

        // Get a random recipe from the loaded recipes
        //const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
        const recipeElement = document.createElement("p");
        recipeElement.classList.add("recipe");
        //recipeElement.textContent = randomRecipe.title;
        recipeElement.textContent = getRandomRecipeTitle(recipes);
        recipeElement.addEventListener("click", (event) => openRecipeWindow(recipes, event));

        dayElement.appendChild(recipeElement);

        calendarGrid.appendChild(dayElement);
      }
    })
    .catch(error => console.error(error));
}



function getRandomRecipeTitle(recipes) {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    return recipes[randomIndex].title;
  }
  
  function openRecipeWindow(recipes, event) {
    const recipeTitle = event.target.textContent;
    const recipe = recipes.find((r) => r.title === recipeTitle);

  
    if (recipe) {
      const recipeWindow = window.open("", "_blank");
      recipeWindow.document.write(`<h1>${recipe.title}</h1>`);
      
      recipeWindow.document.write("<h2>Ingredients:</h2>");
      recipeWindow.document.write("<ul>");
      recipe.ingredients.forEach((ingredient) => {
        recipeWindow.document.write(`<li>${ingredient}</li>`);
      });
      recipeWindow.document.write("</ul>");
  
      recipeWindow.document.write("<h2>Recipe:</h2>");
      recipeWindow.document.write("<ol>");
      recipe.recipe.forEach((step) => {
        recipeWindow.document.write(`<li>${step}</li>`);
      });
      recipeWindow.document.write("</ol>");
  
      recipeWindow.document.write(`<p>Notes: ${recipe.notes}</p>`);
      
      recipeWindow.document.close();
    }
  }
  
let recipes = []; // Global array to store all recipes
let visibleRecipes = 3; // Number of initially visible recipes
const loadMoreButton = document.getElementById("load-more-button");
const recipeContainer = document.getElementById("recipe-container");

// Function to load recipes from JSON file
function loadRecipes() {
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
function generateRecipeCards(startIndex, endIndex) {
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
function handleLoadMoreClick() {
  const endIndex = visibleRecipes + 6; // Increase the visible recipes by 6
  generateRecipeCards(visibleRecipes, endIndex);
  visibleRecipes = endIndex; // Update the number of visible recipes

  if (visibleRecipes >= recipes.length) {
    loadMoreButton.style.display = "none"; // Hide the button if all recipes are visible
  }
}

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




// Get the calendar grid element
const calendarGrid = document.querySelector('.calendar-grid');

// Get the current date
const currentDate = new Date();

// Get the number of days in the current month
const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

// Get the day of the week of the first day in the current month
const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

// Generate the calendar days
for (let i = 0; i < firstDayOfWeek; i++) {
  // Add empty cells for the days before the first day of the month
  const emptyCell = document.createElement('div');
  emptyCell.classList.add('calendar-cell');
  calendarGrid.appendChild(emptyCell);
}

for (let day = 1; day <= daysInMonth; day++) {
  // Create a cell for each day of the month
  const cell = document.createElement('div');
  cell.classList.add('calendar-cell');
  cell.textContent = day;
  calendarGrid.appendChild(cell);
}


// Get the calendar header element
const calendarHeader = document.querySelector('.calendar-header h2');



// Array of month names
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Set the heading to display the current month and year
calendarHeader.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;


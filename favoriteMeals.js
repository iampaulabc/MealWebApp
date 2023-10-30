document.addEventListener("DOMContentLoaded", () => {
  const favoriteMealList = document.getElementById("favoriteMealList");

  // Function to retrieve and display favorite meals
  function displayFavoriteMeals() {
    const favoriteMeals =
      JSON.parse(localStorage.getItem("favoriteMeals")) || [];

    // Clear the existing list
    favoriteMealList.innerHTML = "";

    // Display favorite meals
    favoriteMeals.forEach((meal) => {
      const li = document.createElement("div");
      li.textContent = meal.name;

      const mealImage = document.createElement("img");
      mealImage.src = meal.img;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove from Favorites";
      removeButton.addEventListener("click", () => removeFavorite(meal.id));

      li.appendChild(mealImage);
      li.appendChild(removeButton);
      favoriteMealList.appendChild(li);
    });
  }

  function removeFavorite(id) {
    const favoriteMeals =
      JSON.parse(localStorage.getItem("favoriteMeals")) || [];

    // Find the index of the meal with the specified ID
    const indexToRemove = favoriteMeals.findIndex((meal) => meal.id === id);

    // If found, remove it from the array
    if (indexToRemove !== -1) {
      favoriteMeals.splice(indexToRemove, 1);
      localStorage.setItem("favoriteMeals", JSON.stringify(favoriteMeals));

      // Redisplay the updated list of favorite meals
      displayFavoriteMeals();
    }
  }
  // Display favorite meals when the page loads
  displayFavoriteMeals();
});

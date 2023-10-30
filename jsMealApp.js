console.log("Script loaded!");

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const favoriteList = document.getElementById("favoriteList");

  // Event listener for search input
  if (searchInput) {
    searchInput.addEventListener("input", async () => {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        const meals = await fetchMeals(searchTerm);
        displaySearchResults(meals);
      } else {
        if (searchResults) {
          searchResults.innerHTML = "";
        }
      }
    });
  } else {
    console.error("searchInput element not found.");
  }

  // Function to fetch meal data from the API
  async function fetchMeals(searchTerm) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.error("Error fetching meals:", error);
      return [];
    }
  }

  // Function to display search results
  function displaySearchResults(meals) {
    if (!searchResults) {
      console.error("searchResults element not found.");
      return;
    }

    searchResults.innerHTML = "";
    if (meals) {
      const ul = document.createElement("ul");
      meals.forEach((meal) => {
        const li = document.createElement("li");
        li.innerHTML = `<div>
        <span>${meal.strMeal}</span>
        <div class="tooltip">
        <img class="liItemImage" src="${meal.strMealThumb}" alt="${meal.strMeal}" data-id="${meal.idMeal}">
        <span class="tooltiptext">Click on the image for more details..</span>
    </div>
    <section class="tooltipFav">
        <button class="button button-89" role="button" data-id="${meal.idMeal}">
        <i class="fi fi-rs-heart"></i></button>
        <span class="tooltipFavtext">Click to add this to your favourites</span>
        </section>
    </div>`;
        ul.appendChild(li);
      });
      searchResults.appendChild(ul);
    } else {
      // Display a message when no meals are found
      searchResults.innerHTML = `<div class='error'>
      <img src="404-error-page-not-found-funny-fat-cat.jpg" alt="Cat_img" /></div>`;
    }
  }

  // Event listener for adding meals to favorites
  if (searchResults) {
    searchResults.addEventListener("click", (e) => {
      const clickedButton = e.target.closest(".button-89"); // Find the closest button with class "button-89"

      if (clickedButton) {
        const icon = clickedButton.querySelector(".fi-rs-heart");
        icon.classList.toggle("fi-rs-heart");
        icon.classList.toggle("fi-ss-heart"); // Add the new classes

        setTimeout(() => {
          icon.classList.toggle("fi-ss-heart");
          icon.classList.toggle("fi-rs-heart"); // Remove the previous classes
        }, 370);

        const mealId = clickedButton.getAttribute("data-id");
        const outerParentDiv = clickedButton.parentElement.parentElement; // Get the outer parent div
        const spanTag = outerParentDiv.querySelector("span"); // Get the span tag inside the outer parent div
        const imageTag = outerParentDiv.querySelector("img"); // Get the image tag inside the outer parent div
        let imageSrc = imageTag.src; // Get the source URL of the image

        const mealName = spanTag ? spanTag.textContent.trim() : "Unknown Meal";
        addToFavorites(mealId, mealName, imageSrc);

        console.log("button clicked re-baba");
      }
    });
  } else {
    console.error("searchResults element not found.");
  }

  // Function to add meals to favorites
  function addToFavorites(id, name, img) {
    // Store the meal details (or just the ID) in localStorage
    const favoriteMeals =
      JSON.parse(localStorage.getItem("favoriteMeals")) || [];

    const isAlreadyFavorite = favoriteMeals.some((meal) => meal.id === id);

    // If it's not already a favorite, add it
    if (!isAlreadyFavorite) {
      favoriteMeals.push({ id, name, img });
      localStorage.setItem("favoriteMeals", JSON.stringify(favoriteMeals));
      //alert("This item has been successfully added to favorites");
    } else {
      alert("This item has already been favorited");
    }
  }

  // Add an event listener to each search result item for navigation to meal details page
  // Update the event listener to check if the clicked element or its parent contains the "button" class
  if (searchResults) {
    searchResults.addEventListener("click", (e) => {
      const clickedImage = e.target.closest(".liItemImage"); // Find the closest parent element with class "liItemImage"

      if (clickedImage) {
        const mealId = clickedImage.getAttribute("data-id");
        console.log("Clicked on meal ID:", mealId);
        // Redirect to the Meal Detail Page with the meal ID as a query parameter
        window.open(`mealDetails.html?id=${mealId}`, "_blank");
      }
    });
  } else {
    console.error("searchResults element not found.");
  }

  document
    .querySelector(".btn.btn-b")
    .addEventListener("click", function (event) {
      //event.preventDefault(); // Prevents the default action
      window.open("favouritesPage.htm", "_blank"); // Opens the favourites page in a new window // Redirects to your favourites page
    });
});

/*   if (favoriteList) {
      btn.addEventListener("click", (e) => {
        // Redirect to the Meal Detail Page with the meal ID as a query parameter
        window.location.href = `favouritesPage.html`;
    });
  } else {
    console.error("searchResults element not found.");
  }
  it's 
    Event listener for removing meals from favorites
    */

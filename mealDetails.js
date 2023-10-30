document.addEventListener("DOMContentLoaded", () => {
  const mealDetailContent = document.getElementById("mealDetailContent");

  // Function to get the meal ID from the query parameter
  function getMealIdFromQuery() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("id");
  }

  // Function to fetch meal details by ID
  async function fetchMealDetails(mealId) {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await response.json();
      return data.meals[0];
    } catch (error) {
      console.error("Error fetching meal details:", error);
      return null;
    }
  }

  // Function to display meal details
  async function displayMealDetails() {
    const mealId = getMealIdFromQuery();
    if (mealId) {
      const meal = await fetchMealDetails(mealId);
      if (meal) {
        mealDetailContent.innerHTML = `
        <div class="liquid-content">
                    <h3>${meal.strMeal}</h3>
                    <h3>${meal.strMeal}</h3>
                    <h3>${meal.strMeal}</h3>
                    </div>
                    <div class="imgAndP">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <p>${meal.strInstructions}</p>
                    </div>
                `;
      }
    }
  }
  // Call the function to display meal details when the page loads
  displayMealDetails();
});
/*   const gui = new dat.GUI();
  const canvas = document.querySelector("canvas");
  const c = canvas.getContext("2d");

  canvas.width = innerWidth;
  canvas.height = innerHeight / 3.25;

  const wave = {
    y: canvas.height / 1.24,
    length: 0.01,
    amplitude: 40,
    frequency: 0.019,
  };

  const strokeColor = {
    h: 255,
    s: 0,
    l: 0,
  };

  const waveFolder = gui.addFolder("wave");

  waveFolder.add(wave, "y", 0, canvas.height);
  waveFolder.add(wave, "length", -0.01, 0.01);
  waveFolder.add(wave, "amplitude", -300, 300);
  waveFolder.add(wave, "frequency", -0.01, 1);

  const strokeFol = gui.addFolder("strokeCol");

  strokeFol.add(strokeColor, "h", 0, 155);
  strokeFol.add(strokeColor, "s", 0, 100);
  strokeFol.add(strokeColor, "l", 0, 100);

  increment = wave.frequency;
  function animate() {
    requestAnimationFrame(animate);
    //c.clearRect(0, 0, canvas.width, canvas.height);

    c.beginPath();

    // Create a clipping region at the top of the canvas
    c.rect(0, 0, canvas.width, wave.y);
    c.clip();

    c.moveTo(0, wave.y);

    for (let i = -1; i <= canvas.width; i++) {
      c.lineTo(
        i,
        wave.y +
          Math.sin(i * wave.length + increment) *
            wave.amplitude *
            Math.sin(increment)
      );
    }

    // Fill the clipped region with a background color
    c.fillStyle = "rgba(255, 0, 0)";
    c.fill();

    c.strokeStyle = `yellow`;
    c.stroke();

    increment += wave.frequency;

    // Reset the clip to allow drawing below the wave
    c.restore();
  }

  animate(); */

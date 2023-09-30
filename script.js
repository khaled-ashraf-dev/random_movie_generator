// Get a reference to the select element
const selectElement = document.getElementById('filter-genre');

// Array of genres
const genres = [
  "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime",
  "Documentary", "Drama", "Family", "Fantasy", "Film Noir", "History",
  "Horror", "Music", "Musical", "Mystery", "Romance", "Sci-Fi", "Short",
  "Sport", "Superhero", "Thriller", "War", "Western"
];

// Iterate through the genres array and create an option element for each genre
genres.forEach(genre => {
  const option = document.createElement('option');
  option.value = genre;
  option.text = genre;
  selectElement.appendChild(option);
});

// Update the Movie Data on the Webpage
function manipulateData(data) {
  if (data.length === 0) {
    return false
  }
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomMovie = data[randomIndex]
  moviePoster.src = randomMovie.Poster;
  movieTitle.innerText = randomMovie.Title;
  movieYear.innerText = randomMovie.Year;
  movieDuration.innerText = parseDuration(randomMovie.Runtime);
  movieRating.innerText = randomMovie.imdbRating;
  moviePlot.innerText = randomMovie.Plot;

  let writersArr = randomMovie.Writer.split(', ');
  let actorsArr = randomMovie.Actors.split(', ');
  let genresArr = randomMovie.Genre.split(', ');
  let directorsArr = randomMovie.Director.split(', ');


  actorsDiv.innerHTML = "";

  // Iterate through the array of names
  actorsArr.forEach((name) => {
    // Create a new <p> element
    const paragraphElement = document.createElement("p");

    // Set the text content of the <p> element to the name
    paragraphElement.textContent = name;
    paragraphElement.className = 'cast-name';

    // Append the <p> element to the <div>
    actorsDiv.appendChild(paragraphElement);
  });

  writersDiv.innerHTML = "";
  writersArr.forEach((name) => {
    // Create a new <p> element
    const paragraphElement = document.createElement("p");

    // Set the text content of the <p> element to the name
    paragraphElement.textContent = name;
    paragraphElement.className = 'cast-name';

    // Append the <p> element to the <div>
    writersDiv.appendChild(paragraphElement);
  });

  directorsDiv.innerHTML = "";

  // Iterate through the array of names
  directorsArr.forEach((name) => {
    // Create a new <p> element
    const paragraphElement = document.createElement("p");

    // Set the text content of the <p> element to the name
    paragraphElement.textContent = name;
    paragraphElement.className = 'cast-name';

    // Append the <p> element to the <div>
    directorsDiv.appendChild(paragraphElement);
  });

  genresDiv.innerHTML = "";
  // Iterate through the array of genres
  genresArr.forEach((genre) => {
    // Create a new <p> element
    let paragraphElement = document.createElement("button");

    // Set the text content of the <p> element to the name
    paragraphElement.textContent = genre;

    // Append the <p> element to the <div>
    genresDiv.appendChild(paragraphElement);

  });
  let image = document.getElementById('image')
  image.onload = function () {
    changeBackgroundColor();
  }
}


// Change the Background Color Based on Poster
function changeBackgroundColor() {
  // Create a Color Thief instance
  const colorThief = new ColorThief();

  // Replace 'image' with the ID of your image element
  const image = document.getElementById('image');

  // Extract the dominant color from the image
  const dominantColor = colorThief.getColor(image);
  // Create a <style> element or select an existing one if you have it in your HTML
  let style = document.getElementById('custom-style');

  // If the <style> element doesn't exist, create it
  if (!style) {
    style = document.createElement('style');
    style.id = 'custom-style'; // Assign an ID to the <style> element
    document.head.appendChild(style);
  }

  // Define the CSS code as text
  const cssCode = `
    body {
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]});
      transition: background-color 0.5s ease-in-out;
    }
    
    img {
      box-shadow: rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}) 0px 20px 30px -2px;
    }
    
    `;

  // Set the CSS code as the content of the <style> element
  style.textContent = cssCode;
}

// Call the function when the page loads
window.addEventListener('load', changeBackgroundColor);

// elements
let moviePoster = document.getElementById('image')
let movieTitle = document.getElementById('movie-title');
let movieYear = document.getElementById('movie-year');
let movieDuration = document.getElementById('movie-duration');
let movieRating = document.getElementById('movie-rating');
let moviePlot = document.getElementById('summary');
let writersDiv = document.getElementById('writer');
let directorsDiv = document.getElementById('director');
let actorsDiv = document.getElementById('actors');
let genresDiv = document.getElementById('genres-container');


function parseDuration(movieDuration) {
  // Parse the minutes from the input string
  let minutes = parseInt(movieDuration, 10);

  // Calculate the hours and remaining minutes
  let hours = Math.floor(minutes / 60);
  let remainingMinutes = minutes % 60;

  // Create the new formatted string
  let formattedString = `${hours}h ${remainingMinutes}m`;
  return formattedString
}

function showFilters() {
  let filters = document.getElementById('filters')
  filters.style.display = 'flex';

}

function hideFilters() {
  let filters = document.getElementById('filters')
  filters.style.display = 'none';
}

// Fetch JSON data
let jsonDataUrl = 'https://raw.githubusercontent.com/khaled-ashraf-dev/random_movie_generator/main/Python/movie_data.json';

// Fetch the JSON data
fetch(jsonDataUrl)
  .then(response => response.json())
  .then(data => {
    jsonData = data; // Store the fetched data in the variable
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error);
  });

function filterJson(jsonData) {
  let genre = document.getElementById("filter-genre")
  let yearFrom = document.getElementById('filter-year-from')
  let yearTo = document.getElementById('filter-year-to')
  let rating = document.getElementById('filter-rating')
  let votes = document.getElementById('filter-votes')
  let isEnglish = document.getElementById('filter-english')
  let language = '';

  const filteredMovies = Object.keys(jsonData["_default"]).filter((key) => {
    const movie = jsonData["_default"][key];
    if (isEnglish.value === 'yes') {
      language = 'English';
    }
    return (
      movie.Year >= parseInt(yearFrom.value) &&
      movie.Year <= parseInt(yearTo.value) &&
      movie.Genre.includes(genre.value) &&
      movie.imdbRating >= rating.value &&
      movie.imdbVotes >= votes.value &&
      movie.Language.includes(language)
    );
  }).map((key) => jsonData["_default"][key]);

  return filteredMovies;
}

function getRandomMovie() {
  let filteredMovies = filterJson(jsonData);
  manipulateData(filteredMovies);
}
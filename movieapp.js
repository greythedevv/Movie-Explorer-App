const API_KEY = "3694313f";

let popupElem = document.getElementById("popup")
let movieInfoElem = document.getElementById("movieinfo")
let closeBtn = document.getElementById("closeBtn")

// Close popup
closeBtn.addEventListener("click", function () {
  popupElem.style.display = "none";
});

// Search movies
async function movieapp(keyword) {
  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${keyword}&apikey=${API_KEY}`);
    if (!res.ok) throw new Error("Network Error");

    const data = await res.json();

    if (data.Response === "False") throw new Error(data.Error);

    displayMovies(data.Search);

  } catch (error) {
    catchError(error.message);
  }
}

// Button click
document.getElementById("btn").addEventListener("click", function () {
  const keyword = document.getElementById("inputBox").value.trim();

  if (!keyword) {
    alert("Fill in the fields");
    return;
  }

  movieapp(keyword);
});

// Display movies
function displayMovies(movies) {
  let html = "";

  movies.forEach(movie => {
    html += `
      <div class="movie-card" cursor="pointer"
        onclick="showMovieDetails('${movie.imdbID}')">

        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>

        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200'}"
        width="180">
      </div>
    `;
  });

  document.getElementById("result").innerHTML = html;
}

// Get movie details
async function showMovieDetails(imdbID) {
  try {

    const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
    const data = await res.json();

    if (data.Response === "False") throw new Error(data.Error);

    displayMovieDetails(data);

  } catch (error) {
    catchError(error.message);
  }
}

// Display movie details
function displayMovieDetails(data) {

  const html = `
    <h2>${data.Title} (${data.Year})</h2>

    <img src="${data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/200'}" width="200">

    <p><strong>Genre:</strong> ${data.Genre}</p>
    <p><strong>Director:</strong> ${data.Director}</p>
    <p><strong>Actors:</strong> ${data.Actors}</p>
    <p><strong>Plot:</strong> ${data.Plot}</p>
    <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
  `;

  movieInfoElem.innerHTML = html;

  popupElem.style.display = "block";
}
window.addEventListener("click", function(e){
  if(e.target === popupElem){
    popupElem.style.display = "none"
  }
})

// Error handler
function catchError(message) {
  document.getElementById("result").innerHTML =
    `<p style="color:red">❌ ${message}</p>`;
}
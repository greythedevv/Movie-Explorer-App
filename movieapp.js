// JavaScript
const API_KEY = "3694313f";

// 1️⃣ Search movies by keyword (s=)
async function movieapp(keyword) {
  try {
    showLoading();

    const res = await fetch(`https://www.omdbapi.com/?s=${keyword}&apikey=${API_KEY}`);
    if(!res.ok) throw new Error("Network Error")
    const data = await res.json();

    if (data.Response === "False") throw new Error(data.Error);

    displayMovies(data.Search);

  } catch (error) {
    catchError(error.message);
  } finally {
    hideLoading();
  }
}

// 2️⃣ Event listener for search button
document.getElementById("btn").addEventListener("click", function () {
  const keyword = document.getElementById("inputBox").value.trim();
  if (!keyword) {
    alert("Fill in the fields");
    return;
  }
  movieapp(keyword);
  document.getElementById("details").innerHTML = ""; // clear previous details
});

// 3️⃣ Show and hide loading
function showLoading() {
  document.getElementById("loading").innerHTML = "🔃 Loading...";
}
function hideLoading() {
  document.getElementById("loading").innerHTML = "";
}

// 4️⃣ Display list of movies
function displayMovies(movies) {
  let html = "";
  movies.forEach(movie => {
    html += `
      <div 
        class="movie-card" 
        style="border:1px solid #ccc; padding:10px; margin:10px; display:inline-block; width:200px; cursor:pointer;"
        onclick="showMovieDetails('${movie.imdbID}')"
      >
        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200'}" alt="Poster" width="180"/>
      </div>
    `;
  });
  document.getElementById("result").innerHTML = html;
}

// 5️⃣ Fetch full details for a movie (t= with imdbID)
async function showMovieDetails(imdbID) {
  try {
    showLoading();

    const res = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
    const data = await res.json();

    if (data.Response === "False") throw new Error(data.Error);

    displayMovieDetails(data);

  } catch (error) {
    catchError(error.message);
  } finally {
    hideLoading();
  }
}

// 6️⃣ Display full movie details
function displayMovieDetails(data) {
  const html = `
    <h2>${data.Title} (${data.Year})</h2>
    <img src="${data.Poster !== "N/A" ? data.Poster : 'assets/download (4).png'}" width="200"/>
    <p><strong>Genre:</strong> ${data.Genre}</p>
    <p><strong>Director:</strong> ${data.Director}</p>
    <p><strong>Actors:</strong> ${data.Actors}</p>
    <p><strong>Plot:</strong> ${data.Plot}</p>
    <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
    <p><strong>BoxOffice:</strong> ${data.BoxOffice !== "N/A" ? data.BoxOffice : "Unknown"}</p>
  `;
  document.getElementById("details").innerHTML = html;
}

// 7️⃣ Display error
function catchError(message) {
  document.getElementById("result").innerHTML = `<p style="color:red">❌ ${message}</p>`;
  document.getElementById("details").innerHTML = "";
}



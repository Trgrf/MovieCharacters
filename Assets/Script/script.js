//doms
var userFormEl = document.getElementById('user-form')
var movieTitleEl = document.getElementById('movie-title')
var resultsEl = document.getElementById('results')
var reviewsEl = document.getElementById('reviews')


function getResults(movies, searchTerm) {
if (movies.length === 0) {
    resultsEl.textContent = "No Movies found";
    return;
  }

  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i].title
  }

}


function getApi(title) {
    var dataurl = "https://omdbapi.com/?s=" + title + "&apikey=854eb2b2"

    fetch(dataurl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            getResults(data, title)

        })
}


function formSubmitHandler(event) {
    event.preventDefault();

    var userTitle = movieTitleEl.value.trim();

    if (userTitle) {
        getApi(userTitle);


        //cleanuup
        resultsEl.textContent = "";
        userTitle.value = '';
    }
}


userFormEl.addEventListener("submit", formSubmitHandler);


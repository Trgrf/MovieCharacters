//doms
var userFormEl = document.getElementById("user-form");
var movieTitleEl = document.getElementById("movie-title");
var resultsEl = document.getElementById("results");
var reviewsEl = document.getElementById("reviews");

function infoDump(information) {
  for (var i = 0; i < information.Search.length; i++) {
    var movieTitle = information.Search[i].Title;
    var movieYear = information.Search[i].Year;
    var movieInfo = document.createElement("div");
    movieInfo.textContent =
      movieTitle + " was made in the year " + movieYear + "!";

    reviewsEl.append(movieInfo);
  }
}

function getResults(movies) {
  if (movies.length === 0) {
    resultsEl.textContent = "No Movies found";
    return;
  }
  for (var i = 0; i < movies.Search.length; i++) {
    var imgEl = document.createElement("img");
    imgEl.setAttribute("src", movies.Search[i].Poster);

    var imgTitleEl = document.createElement("h2");
    imgTitleEl.textContent = movies.Search[i].Title;
    imgTitleEl.setAttribute("data-titles", movies.Search[i].Title);
    // imgTitleEl.setAttribute("class = review-title");
    imgTitleEl.classList.add("review-title");

    resultsEl.append(imgTitleEl);
    imgTitleEl.appendChild(imgEl);
  }
}
// grabs titles from data attribute of created h4 tags
function titleCollector(event) {
  var movieTitleReviewEl = event.target;
  // movieTitleReview.getAttribute("data-titles");
  var reviewResults = movieTitleReviewEl.getAttribute("data-titles");
  getApiReview(reviewResults);
  console.log(reviewResults);
}

resultsEl.addEventListener("click", titleCollector);

function getApiOmdb(title) {
  var dataurl = "https://omdbapi.com/?s=" + title + "&apikey=854eb2b2";

  fetch(dataurl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getResults(data);
      infoDump(data);
    });
}

function formSubmitHandler(event) {
  event.preventDefault();

  var userTitle = movieTitleEl.value.trim();

  if (userTitle) {
    getApiOmdb(userTitle);

    //cleanuup
    resultsEl.textContent = "";
    reviewsEl.textContent = "";
    movieTitleEl.value = "";
  }
}

function getReview(reviews) {
  var reviewsLink = document.createElement("a");
  reviewsLink.textContent = reviews.results.link.suggested_link_text + "";
  reviewsLink.href = reviews.results.link.url;

  reviewsEl.appendChild(reviewsLink);
}

function getApiReview(title) {
  var reviewurl =
    "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" +
    title +
    "&api-key=o76pkUAV2dEli9jTa2ys2rDqMdzOkmhF";
  fetch(reviewurl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getReview(data);
      console.log(data);
    });
}

userFormEl.addEventListener("submit", formSubmitHandler);

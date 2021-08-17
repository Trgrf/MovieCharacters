//doms

//global Variables
var movieEl


function getApi() {
    var dataurl = "https://omdbapi.com/?s=" + userInput + "&apikey=854eb2b2"

    fetch(dataurl)
    .then (function(response){
        return response.json();
    })
    .then(function(what data are we pulling?){

    })
}






function formSubmitHandler(event) {
    event.preventDefault();
    
    var userName = nameInputEl.value.trim();
    
    if (userName) {
      getUserRepos(userName);
    
    
      //cleanuup
      repoContainerEl.textContent = "";
      nameInputEl.value = '';
    }
    }
    //2
    userformEl.addEventListener("submit", formSubmitHandler);

getApi();
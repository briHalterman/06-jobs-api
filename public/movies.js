// JavaScript for the front end

// front end JavaScript does not run in Node
// delivered to the browser and runs in the browser context
// full access to the document, window, and DOM

// there are various divs and controls to be manipulated by this JavaScript
// change this code to match movies data model
// divs and controls must be resolved by their ID

// add this code to the top of movies.js:
async function buildMoviesTable(moviesTable, moviesTableHeader, token, message) {
    return 0;
};
// This function is async because it will eventually await a fetch call to retrieve the list of movies. It returns the number of movies retrieved. Right now of course, it just returns 0.

// Start movies.js with the following code:
document.addEventListener("DOMContentLoaded", () => {
    const logoff = document.getElementById("logoff");
    const message = document.getElementById("message");
    const logonRegister = document.getElementById("logon-register");
    const logon = document.getElementById("logon");
    const register = document.getElementById("register");
    const logonDiv = document.getElementById("logon-div");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const logonButton = document.getElementById("logon-button");
    const logonCancel = document.getElementById("logon-cancel");
    const registerDiv = document.getElementById("register-div");
    const name = document.getElementById("name");
    const email1 = document.getElementById("email1");
    const password1 = document.getElementById("password1");
    const password2 = document.getElementById("password2");
    const registerButton = document.getElementById("register-button");
    const registerCancel = document.getElementById("register-cancel");
    const movies = document.getElementById("movies");
    const moviesTable = document.getElementById("movies-table");
    const moviesTableHeader = document.getElementById("movies-table-header");
    const addMovie = document.getElementById("add-movie");
    const editMovie = document.getElementById("edit-movie");
    const title = document.getElementById("title");
    const director = document.getElementById("director");
    const releaseYear = document.getElementById("release-year");
    const studio = document.getElementById("studio");
    const genre = document.getElementById("genre");
    const addingMovie = document.getElementById("adding-movie");
    const moviesMessage = document.getElementById("movies-message");
    const editCancel = document.getElementById("edit-cancel");
  
    // section 2
    // // where the next code will go

    // At various times in the application, the home page must be displayed. The home page will show a logon button and a register button if the user is not logged in. If the user is logged in, the logoff button is shown, as well as a table of movies entries, if the user has any.

    // Because the home page must be brought up at various points in the application, you create an event listener for it, and trigger its display by dispatching an event. 
    
    // Add next section of code:
    let showing = logonRegister;
    let token = null;
    document.addEventListener("startDisplay", async () => {
      showing = logonRegister;
      token = localStorage.getItem("token");
      if (token) {
        //if the user is logged in
        logoff.style.display = "block";
        const count = await buildMoviesTable(
          moviesTable,
          moviesTableHeader,
          token,
          message
        );
        if (count > 0) {
          moviesMessage.textContent = "";
          moviesTable.style.display = "block";
        } else {
          moviesMessage.textContent = "There are no movies to display for this user.";
          moviesTable.style.display = "none";
        }
        movies.style.display = "block";
        showing = movies;
      } else {
        logonRegister.style.display = "block";
      }
    });
  
    var thisEvent = new Event("startDisplay");
    document.dispatchEvent(thisEvent);
    var suspendInput = false;

    // In the code above, several operational variables (token, showing, thisEvent, and suspendInput) are created. The token is retrieved from local storage. Local storage persists even if the page is refreshed. If the token is not present in local storage, that means the user is not logged in, so the logon/register div is shown. Otherwise the logoff button and the movies div are shown. The movies div contains the table for movies entries, and this is shown only if the user has movies entries. The showing variable keeps track of which div is being shown. The thisEvent variable is used to create an event, which, when dispatched, triggers the home page display. Divs are shown and hidden by setting the style.display for the div to “block” or “none”.

    // This section of code calls a function, buildMoviesTable. This function does the complicated task of populating the movies table.
  
    // section 3
});
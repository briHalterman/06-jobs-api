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
// This function is async because it will eventually await a fetch call to retrieve the list of movies. 
// It returns the number of movies retrieved. Right now of course, it just returns 0.

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

    // Because the home page must be brought up at various points in the application, create an event listener for it, and trigger its display by dispatching an event. 
    
    // Add next section of code:
    let showing = logonRegister;
    let token = null;
    document.addEventListener("startDisplay", async () => {
      showing = logonRegister;
    // token is retrieved from local storage
    // local storage persists even if the page is refreshed
      token = localStorage.getItem("token");
    // if the token is not present in local storage, that means the user is not logged in, so the logon/register div is shown
    // otherwise the logoff button and the movies div are shown
      if (token) {
        //if the user is logged in
        logoff.style.display = "block";
        // buildMoviesTable function does the complicated task of populating the movies table
        const count = await buildMoviesTable(
          moviesTable,
          moviesTableHeader,
          token,
          message
        );
        // movies div contains the table for movies entries
        // shown only if the user has movies entries
        if (count > 0) {
          moviesMessage.textContent = "";
          moviesTable.style.display = "block";
        } else {
          moviesMessage.textContent = "There are no movies to display for this user.";
          moviesTable.style.display = "none";
        }
        movies.style.display = "block";
        // showing variable keeps track of which div is being shown
        showing = movies;
      } else {
        logonRegister.style.display = "block";
      }
    });
  
    var thisEvent = new Event("startDisplay");
    // thisEvent variable is used to create an event, which, when dispatched, triggers the home page display
    document.dispatchEvent(thisEvent);
    var suspendInput = false;
    // several operational variables (token, showing, thisEvent, and suspendInput) are created
    // divs are shown and hidden by setting the style.display for the div to “block” or “none”.
  
    // section 3

    // The flow of the application is controlled by button clicks, so you need an event listener to catch those. The first button click to handle is the logon. The callback for the click event listener is async, because there are awaits for fetch calls in the body of that function.

    // add these lines of code after the section 3 comment:
    document.addEventListener("click", async (e) => {
        // if an async operation is in progress, you do not want to handle button clicks, because that could disrupt the flow of the application
        // suspendInput variable is set to true if an asynchronous operation is in progress, and false once that operation completes
        // if suspendInput is true, the button click is ignored
        if (suspendInput) {
          return; // we don't want to act on buttons while doing async operations
        }
        // the message variable stores the DOM entry of a paragraph that displays messages to the user
        // message has to be cleared when a subsequent button click occurs
        if (e.target.nodeName === "BUTTON") {
          message.textContent = "";
        }
        // The code that follows handles clicks for the logoff, logon, register, logonCancel, registerCancel, logonButton, and registerButton:
        if (e.target === logoff) {
          // logoff button clears the token and removes it from local storage, so the user is no longer logged on 
          localStorage.removeItem("token");
          token = null;
          showing.style.display = "none";
          logonRegister.style.display = "block";
          showing = logonRegister;
          // contents of the movies table are also cleared, so that the next user can’t access them 
          moviesTable.replaceChildren(moviesTableHeader); // don't want other users to see
          // Note that even if the movies table is hidden, a user could see its contents using browser development tools. The table is cleared by making the header row as the only child of the table.
          // event is dispatched to cause the home screen to display, and message, "you are logged off" is shown  
          message.textContent = "You are logged off.";
        } else if (e.target === logon) { 
          // logon button causes the logonDiv to be shown
          // home screen is hidden by setting the style.display of showing to “none”
          showing.style.display = "none";
          logonDiv.style.display = "block";
          showing = logonDiv;
        } else if (e.target === register) {
          // register button causes the registerDiv to be shown
          showing.style.display = "none";
          registerDiv.style.display = "block";
          showing = registerDiv;
        } else if (e.target === logonCancel || e.target == registerCancel) {
          // logonCancel and registerCancel buttons trigger the display of the home page
          showing.style.display = "none";
          logonRegister.style.display = "block";
          showing = logonRegister;
          email.value = "";
          password.value = "";
          name.value = "";
          email1.value = "";
          password1.value = "";
          password2.value = "";
        } else if (e.target === logonButton) {
          // logonButton button causes user input (email and password) to be collected  
          suspendInput = true;
          // movies API is called, using fetch inside of a try/catch block, in case of error conditions
          // Note that the URL for the API call is a relative URL, /api/v1/login . This means that the web address to be called is the same one as for the index.html page.
          try {
            const response = await fetch("/api/v1/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email.value,
                password: password.value,
              }),
            });
            const data = await response.json();
            // if successful (status 200) response is recieved, the body of the response contains the JWT token
            // this is stored in local storage and the home page display is triggered
            if (response.status === 200) {
              message.textContent = `Logon successful.  Welcome ${data.user.name}`;
              token = data.token;
              localStorage.setItem("token", token);
              showing.style.display = "none";
              thisEvent = new Event("startDisplay");
              email.value = "";
              password.value = "";
              document.dispatchEvent(thisEvent);
            } else {
              message.textContent = data.msg;
            }
            // otherwise the body of the response contains a message, which is displayed in the message paragraph
          } catch (err) {
            message.textContent = "A communications error occurred.";
          }
          suspendInput = false;
        } else if (e.target === registerButton) {
          // registerButton button works similarly, except that the user is registered, instead of logging in an existing user
          if (password1.value != password2.value) {
            message.textContent = "The passwords entered do not match.";
          } else {
            suspendInput = true;
            try {
              const response = await fetch("/api/v1/auth/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: name.value,
                  email: email1.value,
                  password: password1.value,
                }),
              });
              const data = await response.json();
              if (response.status === 201) {
                message.textContent = `Registration successful.  Welcome ${data.user.name}`;
                token = data.token;
                localStorage.setItem("token", token);
                showing.style.display = "none";
                thisEvent = new Event("startDisplay");
                document.dispatchEvent(thisEvent);
                name.value = "";
                email1.value = "";
                password1.value = "";
                password2.value = "";
              } else {
                message.textContent = data.msg;
              }
            } catch (err) {
              message.textContent = "A communications error occurred.";
            }
            suspendInput = false;
          }
        } 
        
        // section 4
      })
});
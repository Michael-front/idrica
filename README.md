# Application Test for Idrica

Mini web application with TypeScript, cypress, jest, react library test, css modules,  ReactJS, RTK-query for cache management, and responsive design.

## Features

<dl>
  <dt>Home Page</dt>
  <dd>Listing 100 posts from (<a href="https://jsonplaceholder.typicode.com/posts">posts</a>)</dd>
  <dd>Posts can be filtered by title or body</dd>

  <img src="docs\images\home.png" alt="Descripción de la imagen" height="800" width="1200"/>

  <dt>Login Page</dt>
  <dd>The user can log in with any user from the <a href="https://jsonplaceholder.typicode.com/users">Users API</a> (user or email)</dd>
  <dd>For example, with user "Bret" and password "1234" (all the users have like password "1234")</dd>
  <dd>The token is saved in a cookie (js-cookie), but this token is fake since the API does not generate a session token</dd>
  <dd>When the user is logged in, they can change the page theme or language</dd>
  <dd>When the user is logged in, a new option appears in the menu (header) to manage CRUD posts</dd>

  <img src="docs\images\login.png" alt="Descripción de la imagen" height="600" width="1200"/>

  <dt>CRUD Page</dt>
  <dd>The user can see their statistics (total posts and the sum of comments) via a bar graph</dd>
  <dd>Options exist to create, update, and delete a post</dd>

  <img src="docs\images\crud.png" alt="Descripción de la imagen" height="800" width="1200"/>

  <dt>Configuration (visible with login)</dt>
  <dd>On this page, you can change the theme or the language.</dd>

  <dt>API Documentation</dt>
  <dd><a href="https://jsonplaceholder.typicode.com/">https://jsonplaceholder.typicode.com</a></dd>
</dl>




## Quick start

1.  Make sure that you have Node.js v20.12.1 and npm v10 or above installed.
2.  Clone this repo using `git clone https://github.com/Michael-front/idrica.git`
3.  Move to the appropriate directory: `cd idrica`.<br />
4.  (optional) Run `npm preinstall:windows`  to delete previous installation.<br />
5.  Run `npm install` in order to install dependencies.<br />
6.  Run `npm start` to lauch the application.
_At this point you can run `npm start` to see the example app at `http://localhost:3000`._

Now you're ready to rumble!


## Documentation
- [app](docs/app.md): Technologies and Architecture used
- [**Commands**](docs/commands.md): Commands for podcasts web application
- [Styling](docs/css.md): How to work with the CSS
- [Testing](docs/testing.md): How to work with your test.


## Note
- To avoid re-renders in development mode, you can comment out `React.StrictMode` in `index.tsx`. Although it is normal to wrap the app with `React.StrictMode` in development mode, this will result in one additional re-render.

- I am not strictly following hexagonal architecture since this is just a test.

- According to the [API documentation](https://jsonplaceholder.typicode.com), the data for the POST, UPDATE, PATCH, and DELETE methods are fake, so I can make the request but the real data does not change. The website simulates the changes in CRUD operations, but when the page is reloaded, the changes are not persistent.

- The initial objective set by the test is being met: creating the CRUD for posts using RTK-query and displaying a chart for the logged-in user with all their posts and the number of comments for each post.

The option to view comments is disabled since the test instructions do not specify whether it is required. However, if it were necessary, it could be implemented in several ways:

1. Use a Redux slice to store the selected post for viewing its comments.
2. Call the endpoint with its ID (it avoids overloading the global state but requires making the request again).
3. Use React's Context API.


## Author

Michael Coloma calva


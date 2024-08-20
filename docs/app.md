# Technologies and Architecture used

## State management

This app manages the application state using Redux Toolkit to retrieve session data and the selected theme.
The session is saved in a cookie with a fake token (js-cookie).

token: `token/user:${findUser.user}:${findUser.id}` 
view: 
- src\postsManager\adapters\primary\ui\pages\Login.tsx
- src\postsManager\adapters\secondary\redux\store.ts

## RTK-query 

RTK Query is used to manage CRUD operations for posts.
The methods PUT, PATCH, UPDATE, POST, and DELETE are invoked.

view: src\postsManager\infrastructure\api\rtkQueryClient\postsApiRTK.ts


## Routing

For routing, we use [`react-router-dom`] to manage ours rutes:
- "/" for the home page (list and filter posts)
- "/login" for the login page
- "/setting" for the manage theme and language page
- "/crud-post-user" to manage the graph and CRUD operations for posts

## Jest for the test

- see [Testing](../docs/testing.md)

## Prettier and esLint using with visual studio code (VSC)

To manage the dependency rules for 'react' and 'typescript' as well as the code formatting

My configuration for VSC is the following (ctrl + shi + p: Perference open user settings):

```
{
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "git.confirmSync": false,
  "editor.renderWhitespace": "all",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "eslint.workingDirectories": ["src"]
}
```
The prettier rules is in the file configuration `.pretterrc`.
the esLint rules is in the file configuration `.eslintrc.yaml`

## Webpack

For the management and optimization of resources depending on the development environment (prod or dev)

You can see the file configuration to know more `wepack.config.js`

## Architecture: `hexagonal` and `vertical slicing`

According to the `hexagonal` architecture, I use "infrastructure," "application," and "domain" (with both application and domain inside the "core" folder):

- **Infrastructure**: It handles logic related to external data. In this case, the data doesn't need to be modified. If the data weren't fake, we would need to use the adapter and mapper folders.

- **Application**: It manages our use cases (CRUD Post and get comments and users).

- **Domain**: It manages our entities and our interfaces to the apiClient (ports).

Additionally, I have decided to structure the React ecosystem within the "adapters" folder, understanding it as the logic or lifecycle that exists between the components and the graphical interface that the user can see:

- **"adapters/primary"** for the graphical interface.
- **"adapters/secondary"** to manage React's own mechanisms such as global state, contexts, etc.

Since I am using RTK Query, I could use its hooks directly in the component. However, because I wanted to use a hexagonal architecture, I decided to define "port interfaces" and "adapters" to handle the data. In this case, I am using hooks in the infrastructure layer to leverage the benefits of RTK Query hooks.

According to `vertical slicing`, I am using the directory `postManager` with the idea of using the same infrastructure if, in the future, I need to add postComments, for example. I can create a directory called "developers" with similar infrastructure.


```
│   AppRouter.module.css
│   AppRouter.tsx
│   i18next.ts
│   index.css
│   index.tsx
│   react-app-env.d.ts
│   reportWebVitals.ts
│   setupTests.ts
│
└───postsManager
    ├───adapters
    │   ├───primary
    │   │   ├───types
    │   │   │       constants.ts
    │   │   │
    │   │   └───ui
    │   │       ├───assets
    │   │       │       IconSearch.svg
    │   │       │       idrica_white-300x70.png
    │   │       │
    │   │       ├───components
    │   │       │       BreadCrumbs.module.css
    │   │       │       BreadCrumbs.tsx
    │   │       │       Button.module.css
    │   │       │       Button.tsx
    │   │       │       ChartColumnsBar.tsx
    │   │       │       Filter.module.css
    │   │       │       Filter.test.tsx
    │   │       │       Filter.tsx
    │   │       │       Header.module.css
    │   │       │       Header.tsx
    │   │       │       Loader.module.css
    │   │       │       Loader.test.tsx
    │   │       │       Loader.tsx
    │   │       │       PostCard.module.css
    │   │       │       PostCard.tsx
    │   │       │       WithCommentsHoc.tsx
    │   │       │
    │   │       ├───hooks
    │   │       ├───pages
    │   │       │       CrudPostsUser.module.css
    │   │       │       CrudPostsUser.tsx
    │   │       │       Home.module.css
    │   │       │       Home.tsx
    │   │       │       Login.module.css
    │   │       │       Login.tsx
    │   │       │       Settings.module.css
    │   │       │       Settings.tsx
    │   │       │
    │   │       └───utils
    │   └───secondary
    │       ├───context
    │       ├───providers
    │       └───redux
    │               authSlice.ts
    │               store.ts
    │               themeSlice.ts
    │
    ├───config
    │   └───routes
    │           routes.ts
    │
    ├───core
    │   ├───application
    │   │   └───usesCases
    │   │           useCreatePostUsesCase.ts
    │   │           useDeletePostByIdUsesCase.ts
    │   │           useGetCommentsByPostIdUsesCase.ts
    │   │           useGetPostsByUserIdUsesCase.ts
    │   │           useGetPostsUsesCase.ts
    │   │           useGetUsersUsesCase .ts
    │   │           useUpdatePostByIdUsesCase.ts
    │   │
    │   └───domain
    │       ├───entities
    │       │       Comments.ts
    │       │       Post.ts
    │       │       User.ts
    │       │
    │       └───ports
    │               PostsManagerApiPort.ts
    │
    └───infrastructure
        ├───api
        │   ├───adapters
        │   │       useCreatePostAdapter.ts
        │   │       useDeletePostByIdAdapter.ts
        │   │       useGetCommentsByPostIdAdapter.ts
        │   │       useGetPostByUserIdAdapter.ts
        │   │       useGetPostsAdapter.ts
        │   │       useGetUsersAdapter.ts
        │   │       useUpdatePostByIdAdapter.ts
        │   │
        │   ├───clients
        │   ├───mappers
        │   │       responseGetUsersMapper.ts
        │   │
        │   └───rtkQueryClient
        │           postsApiRTK.ts
        │
        └───utils
```


I tried to use the port-adapter pattern for the RTK-query API (**postApiRTK**). However, since it already provides its own hooks, I decided to take advantage of them, so I'm not using classes to implement the interface for the ports (**postManagerApiPort**) and am instead using hooks.

Since there's no need to adapt any data, using this pattern here seems somewhat overly complicated. It would be more practical to use the hooks provided by postApiRTK directly.

For all these reasons, I mention in the readme notes that I'm not strictly following hexagonal architecture.






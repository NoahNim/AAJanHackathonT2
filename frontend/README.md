# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## API Routes
user
blog
comment
blog_likes
comment_likes
read_later

* `/api/user`
    * `GET /`
        * Purpose: Get logged in user
        * Body: None
        * Return:
            ```json
            {
                "firstName": "Test",
                "lastName": "User",
                "userName": "Demo",
                "email": "testing@gmail.com",
                "profilePicture": "imgString.jpg",
                "bio": "Bio description text"
            }

    * `GET /{userId}`
        * Purpose: Get User by userID
        * Body: None
        * Return:
            ```json
            {
                "firstName": "Test",
                "lastName": "User",
                "userName": "Demo",
                "email": "testing@gmail.com",
                "profilePicture": "imgString.jpg",
                "bio": "Bio description text"
            }

    * `POST /signup`
        * Purpose: Create a new User
        * Body: 
            ```json
            {
                "credential": "testing@gmail.com",
                "password": "randomHashedPassword"
            }
        * Return:
            ```json
            {
                "id": 1, 
                "firstName": "Test",
                "lastName": "User",
                "userName": "Demo",
                "email": "testing@gmail.com",
                "profilePicture": "imgString.jpg",
                "bio": "Bio description text"
            }
    
    * `POST /login`
        * Purpose: Create a new User
        * Body: 
            ```json
            {
                "firstName": "Test",
                "lastName": "User",
                "userName": "Demo",
                "email": "testing@gmail.com",
                "password": "randomHashedPassword",
                "profilePicture": "imgString.jpg",
                "bio": "Bio description text"
            }
        * Return:
            ```json
            {
                "id": 1, 
                "firstName": "Test",
                "lastName": "User",
                "userName": "Demo",
                "email": "testing@gmail.com",
                "profilePicture": "imgString.jpg",
                "bio": "Bio description text"
            }

    * `PUT /{userId}`
        * Purpose: Update a User profile information by userId
        * Body:
            ```json
            {
                "firstName": "...",
                "lastName": "...",
                "userName": "...",
                "email": "...",
                "profilePicture": "...",
                "bio": "..."
            }

        * Return:
            ```json
            {
                "id": 1, 
                "firstName": "...",
                "lastName": "...",
                "userName": "...",
                "email": "...",
                "profilePicture": "...",
                "bio": "..."
            }

    * `DELETE /logout`
        * Purpose: Logout a User
        * Body: None
        * Return: `{"message": "Successfully Logged out!"}`

    * `DELETE /{userId}`
        * Purpose: Delete a User
        * Body:
            ```json
            {
                "password": "randomHashedPassword"
            }
        * Return: `{"message": "Successfully deleted!"}`

* `/api/blog`
    * `GET /all`
        * Purpose: Get all blogs for splash page
        * Body: None
        * Return:
            ```json
            [{
                "title": "How i lived to 100 years",
                "user": {
                    "firstName": "Test",
                    "lastName": "User"
                    },
                "thumbnail": "img.jpg",
                "commentCount": 20,
                "likeCount": 55
            },
            ...]

    * `GET /{blogId}`
        * Purpose: Get single blog by blogID
        * Body: None
        * Return:
            ```json
            {
                "title": "How i lived to 100 years",
                "description": "Description content",
                "thumbnail": "img.jpg",
                "user": {
                    "firstName": "Test",
                    "lastName": "User"
                    },
                "comments": [{
                    "id": 1,
                    "comment": "I love this blog",
                    "likeCount": 10
                }],
                "likeCount": 55
            }

    * `POST /`
        * Purpose: Create a new Blog post
        * Body:
            ```json
            {
                "title": "New Blog Post Title",
                "description": "Content .....",
                "pictures": ["img1.jpg", "img2.jpg","img3.jpg"],
                "tags": ["future", "trending"]
            }
        * Return:
            ```json
            {
                "id" : 1,
                "title": "New Blog Post Title",
                "description": "Content .....",
                "pictures": ["img1.jpg", "img2.jpg","img3.jpg"],
                "tags": ["future", "trending"]
            }

    * `PUT /{blogID}`
        * Purpose: Create a new Blog post
        * Body:
            ```json
            {
                "title": "...",
                "description": "...",
                "pictures": [...],
                "tags": [...]
            }
        * Return:
            ```json
            {
                "id" : 1,
                "title": "...",
                "description": "...",
                "pictures": [...],
                "tags": [...]
            }

    * `DELETE /{blogId}`
        * Purpose: Delete a blog
        * Body: None
        * Return: `{"message": "Successfully deleted the blog!"}`

* `/api/comment`
    * `GET /{blogId}`
        * Purpose: Get all comments for a blog
        * Body: None
        * Return:
            ```json
            [{
                "comment": "message",
                "user": {
                    "firstName": "first",
                    "lastName": "last"
                },
                "likeCount": 2
            }, ...]

    * `POST /`
        * Purpose: Create new comment on a blog
        * Body: 
            ```json
            {
                "blogId": 1,
                "userId": 1,
                "comment": "random comment"
            }
    
    * `PUT /{commentId}`
        * Purpose: Edit a comment
        * Body:
            ```json
            {
                "comment": "updated comment"
            }
        * Return:
            ```json
            {
                "blogId": 1,
                "userId": 1,
                "comment": "updated comment"
            }

    * `DELETE /{blogId}`
        * Purpose: Delete a comment
        * Body: None
        * Return: `{"message": "Successfully deleted the comment!"}`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

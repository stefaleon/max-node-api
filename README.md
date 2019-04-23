## Node API (Max)


## initial setup

* `npm init`
* `npm install express --save`
* Add app.js, require express and listen to 8080.
* Add the routes and controllers folders.
* Configure a feed.js file for the related routes in the routes folder and another for the related actions in the controllers folder.
* Register and use the routes in app.js.
* Configure the `getPosts` action in the `feed` controller.

*Now requests to `http://localhost:8080/feed/posts` receive the response:*
```
{

    "posts": [
        {
            "_id": "1",
            "title": "Test Post Number 1",
            "content": "This is a post for the Node API initial testing.",
            "createdAt": "2019-04-17T21:45:51.752Z"
        }
    ]

}
```

## create 

* Configure the `createPost` action in the `feed` controller.
* Add the POST route for the creation of posts to feed.js in the routes folder.

*Now POST requests can be submitted to `http://localhost:8080/feed/post`.*
*In Postman, in the `Body` tag select `raw - JSON(application/json)` and set the following content*
```
{
	"title": "Create post testing",
	"content": "This is the content of the POST test..."
}
```
*Then the following response is received:*
```
{
    "message": "New post created.",
    "post": {
        "id": "2019-04-18T10:38:49.503Z",
        "title": "Create post testing",
        "content": "This is the content of the POST test...",
        "createdAt": "2019-04-18T10:38:49.503Z"
    }
}
```

## fix CORS errors

*Errors such as `No 'Access-Control-Allow-Origin' header is present` appear in the browser console when we try to get data from the API and the requests origin from a different domain*

* Add a middleware to app.js in order to set appropriate headers so that CORS errors are fixed.



## minimal frontend for testing

* Crate a minimal web page for testing GET and POST requests.
* In order to succesfully create JSON data by sending a POST request, the body content has to be stringified and the content-type has to be set to `application/json`.
```
postButton.addEventListener('click', () => {
  fetch('http://localhost:8080/feed/post', {
    method: 'POST',
    body: JSON.stringify({
      title: 'Test Post',
      content: ' This is the test post content.'
    }),
    headers: {
      'Content-Type': 'application/json'
    }
    
  })
    .then(res => res.json())
    .then(resData => console.log(resData))
    .catch(error => console.log(error));
});
```


## server side validation

*Validation example for a minimum length of 5 characters for both the `title` and the `content` fields*

* `npm install express-validator --save`
* Configure `feed.js` in the routes folder, in order to check the request body. Require the related component and add the related middleware to the POST route.
* Configure `feed.js` in the controllers folder, in order to receive and use the validation result. Use the `validationResult` function on the request in order to create the `errors` constant. Return a status code of 422 if errors exist.

*Testing with a dummy harcoded POST request where the `title` is 4 characters long, using Opera Version:60.0.3255.27, the console display is:*
```
POST http://localhost:8080/feed/post 422 (Unprocessable Entity)
front-end-for-testing.html:60 
{message: "Validation error.", errors: Array(1)}
errors: Array(1)
0: {location: "body", param: "title", value: "  1234 ", msg: "Invalid value"}
length: 1
__proto__: Array(0)
message: "Validation error."
__proto__: Object
```


## connect to db

* `npm install --save mongoose`
* Require mongoose in app.js and connect to a MongoDB database.

*Connection data are provided from the `private` folder files, ignored by git.*


## model

* Set up a mongoose model. Create the `models` folder and configure the model for the posts in `post.js`.
* Pass the `timestamps` argument to the schema constructor in order to have the `createdAt` and `updatedAt` timestamps automatically created by mongoose.


## create posts in the db

* Require the posts' model in `feed.js` in the controllers folder, and configure the createPost method in order to save the created posts to the db.


## handle errors

* In the createPost method in `feed.js` in the controllers folder, handle the validation errors by use of the `Error` object. 
* Set the `statusCode` custom property to 422 and throw the error, so that the function execution is exited and the next error handling middleware is reached. 
* In the catch block, if the statusCode is not set, set it to 500.
* The catch block is a piece of the promise chain and since throwing an error inside an async code snippet does not reach the next error handler, use the `next` function and pass the error to it. 
* Configure `app.js` in order to use an error handling middleware that will be executed whenever an error is thrown or forwarded with `next`.


## get posts from the db

* Configure the `getPosts` action in `feed.js` in the controllers folder in order to find and fetch the posts from the database.


## get a single post

* Configure the `getPost` action in `feed.js` in the controllers folder.
* Add a route for getting a single post in `feed.js` in the routes folder.


## update posts

* Configure the `updatePost` action in `feed.js` in the controllers folder.
* Add a PUT route for updating a post in `feed.js` in the routes folder.
* Add server side validation as a middleware to the route.



## delete posts

* Configure the `deletePost` action in `feed.js` in the controllers folder.
* Add a DELETE route for updating a post in `feed.js` in the routes folder.
* Refactor reusable code to the functions `checkIfPostExists` and `reachNextError`.


## pagination

* In the `getPosts` action in `feed.js` in the controllers folder, receive the `currentPage` parameter from the request query object.
* Implement pagination logic. Data are sorted with the `createdAt` field descending (most recent first) and limited to a hardcoded number of items per page.
* In the response data, provide the `totalItems` and `itemCounterStartInCurrentPage` properties to the front-end in order to be able to display a corresponding-to-the-total-amount-of-posts counter for each post. 


## user model

* Add a model for the users in `models/user.js`.


## user sign up authentication

* Add `auth.js` in the routes folder.
* Require and use the authentication routes in app.js. 
* Add `auth.js` in the controllers folder and configure the `putSignUp` action. 
* `npm install bcryptjs --save`
* Require `bcryptjs` in `controllers/auth.js` in order to hash the created passwords.

* In `routes/auth.js`, configure the `sign-up` PUT route for user sign-up, which routes to the `putSignUp` action. 
* Implement validation for signing up with email.
* Now users can sign-up via the `http://HOSTNAME:PORT/auth/sign-up` API endpoint. The method has to be set to `PUT`, the content type headers to `application/json` and the JSON-stringified body should contain the `email`, `password` and `name` values.

*Testing PUT requests to http://localhost:8080/auth/sign-up with Postman*

---
request body:
```
{
	"email": "test@test.org",
	"password": "12345       "
}
```
response:
```
{
    "message": "Validation failed.",
    "data": [
        {
            "location": "body",
            "param": "name",
            "msg": "Invalid value"
        }
    ]
}
```
---

---
request body:
```
{
	"email": "test@test.org",
	"password": "12345       ",
  "name": " Test User   "
}
```
response:
```
{
    "message": "User created.",
    "userId": "5cbcf76b143dbd1574628856"
}
```

Checking with MongoDB Compass, the following user is created in the db:
```
_id: 5cbcf76b143dbd1574628856
status: "New User"
posts: Array
email: "test@test.org"
name: "Test User"
password: "$2a$12$w4I6LBCW2318f/zneFvXhOOVFagBfeyS.fP5BrG.JPrXz9SQIoBv6"
__v:0
```

response if the same request is resent:
```
{
    "message": "Validation failed.",
    "data": [
        {
            "location": "body",
            "param": "email",
            "value": "test@test.org",
            "msg": "This email address is already in use."
        }
    ]
}
```

---


## user log in


* In `controllers/auth.js`, configure the `postLogIn` action. The request body contains the user `email` and `password`. Search for the user in the db with the email address and if a user is found, compare the provided password with the hashed password in the db by use of `bcrypt.compare`. On success, temporarily respond with a message and the loaded user. The next step will be the creation of a JSON Web Token.

* In `routes/auth.js`, configure the `log-in` POST route for user log-in, which routes to the `postLogIn` action.

*Testing POST requests to http://localhost:8080/auth/log-in with Postman*

---
request body:
```
{
	"email": "test@test.org",
	"password": "12345"
}
```
response:
```
{
    "message": "User found",
    "loadedUser": {
        "status": "New User",
        "posts": [],
        "_id": "5cbf435006f76c473ce0f6f9",
        "email": "test@test.org",
        "name": "Test User",
        "password": "$2a$12$ms4YW5ZD4n0RtwjTH15k..SZtRl/8pwxhF.YR2XOj5dCbLRDtiZVe",
        "__v": 0
    }
}
```
---
request body:
```
{
    "email": "IDontExist@test.org",
    "password": "12345"
}
```
response:
```
{
    "message": "User not found."
}
```

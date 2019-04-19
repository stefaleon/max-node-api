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



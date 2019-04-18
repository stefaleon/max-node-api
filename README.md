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

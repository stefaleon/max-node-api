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



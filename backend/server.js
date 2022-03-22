// BASIC EXPRESS SERVER

//import modules:
const path = require('path') //core package from node.js, used to help build frontend
const express = require('express') //import backend web framework
const colors = require('colors') //import colors
const dotenv = require('dotenv').config() 
/* 
.config() allows us to have a file with our dotenv variables in it

The require() method is a built-in function used to load and cache JavaScript modules into a Node.js application.
https://stackoverflow.com/questions/9901082/what-is-this-javascript-require#:~:text=The%20require()%20method%20is,use%20the%20require()%20method.
*/

const {errorHandler} = require('./middleware/errorMiddleware') //import errorHandler module
const connectDB = require('./config/db') //import config files for database
//const res = require('express/lib/response')
const port = process.env.PORT || 5000 
/*
port on server for client to connect to
PORT is an environment variable, declared in .env file of the root
if PORT is not found it will listen to port 5000
*/

connectDB() //call function that connects to database
const app = express() //'app' object calls express

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//to detect (parse) the body data in json & urlencoded

//NOTE: dont forget to add every new route to the server:
app.use('/api/goals', require('./routes/goalRoutes'))
//.use() will redirect to ./routes/goalRoutes file in 'backend' folder
app.use('/api/users', require('./routes/userRoutes'))


//serve frontend
if(process.env.NODE_ENV === 'production'){ //if in production mode:
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    //set static folder (build folder for react)
    //put static folder in the frontend/build folder, this is where react builds the static assets
    //'__dirname' is the current directory

    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
    )
    //point routes (besides API ones) to index HTML
    //'*' means any route besides our API ones

} else {
    app.get('/', (req,res) => res.send('Please set to production'))
}

app.use(errorHandler) //overwrites default express errorHandler

app.listen(port, function(){
    console.log('Server is listening on port ', this.address().port )
})
/*
first argument is the port number app is listening to
second argument is an optional function call, in this case a log() to console
*/




/*
NOTES

Project based on tutorial by Traversy Media on YouTube: https://www.youtube.com/watch?v=-0exw-9YJBo



OVERVIEW

VID 1
folder "backend": root of backend folder contains fullstack application/backend dependencies
                  all routes, models and controllers will be contained in folder (called node modules) in the root
files/folders: 
server.js: entry point to server, api/goals goes to goalRoutes.js
goalRoutes.js: brings in functions from goalController.js and establishes endpoints
goalController: implements CRUD-style MongoDB methods using Mongoose
                get, set, update, delete goals.
errorMiddleware.js: Custom error handler
goalModel: Defines our Schema (for Mongoose db)
db.js: Connects us to our server
.env: global environment variables

VID 2                
userModel.js:
userRoutes.js:
userController.js:
authMiddleware.js: verifies token and authenticates client requests. Add to routes to protect.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ROUTES
To create a route need http client (ex Postman)
specify: 
1. Request: GET, PUT, POST, DELETE, etc. 
2. Server address: http://localhost:5000/api/goals (this gets goals)
More on: https://expressjs.com/en/starter/basic-routing.html

example of route in javascript:
app.get('/api/goals', function(req, res) {
    res.status(200).json({message: 'Get Goals' })
})
OR
app.get('/api/goals', (req, res) =>{
    res.status(200).json({message: 'Get Goals' })
})

where get is the request type we are listening for and
'/api/goals' is the endpoint 
asynchronous function sends a string as a response (usually json object or array). 
It is also good practice to set a status.

ASIDE:
usually we have more than one route, 
so we make a separate folder and file in the backend for the routes
Each resource in the API should have its own route file

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

BODY DATA (Routes)
Sometimes we will want to retrieve body data from the client
example in goalController.js:
const setGoal = (req, res) => {
    console.log(req.body)
    res.status(201).json({message: 'Set Goal' })
}
This will log the body property of req (client request) to the console

We also will need to add a couple of lines of middleware 
on server.js file to detect (parse) the body data:
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

MIDDLEWARE
is a function that runs during the req/res cycle.
More on Middleware: https://expressjs.com/en/guide/writing-middleware.html#:~:text=Overview,the%20application's%20request%2Dresponse%20cycle.&text=Middleware%20functions%20can%20perform%20the,request%20and%20the%20response%20objects.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

DATABASES
Relational (SQL) VS non-relational (No-SQL) databases:
Relational databases are held in the traditional chart like formats whereas 
non-relational are held in documents. In this sense, A “collection” of “documents” 
in a MongoDB database is analogous to a “table” of “rows” 
in a relational database.
We will be using a No-SQL database (MongoDB) for this project


STATUSES
404 - not found
200 - OK
400 - Bad request, client error (server cant understand)
401 - Unauthorized
500 - server error

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

PROGRAMS/TECHNOLOGIES USED


NODE.JS
https://nodejs.org/api/http.html
Useful workshops? https://nodeschool.io/index.html


NPM - NODE PACKAGE MANAGER
World's largest software registry. Open source developers use npm 
to share and borrow packages, and many organizations use npm to manage 
private development. npm consists of three distinct components:
1.the website
2. the Command Line Interface (CLI)
3. the registry
Find out more: https://docs.npmjs.com/about-npm


EXPRESS
Express is a minimal and flexible Node.js web application framework 
that provides a robust set of features for web and mobile applications.
https://expressjs.com/


POSTMAN
Postman is an API platform for building and using APIs.
https://www.youtube.com/watch?v=VywxIQ2ZXw4
To run a simple request to the server
1. Create server.js
2. Run server.js on terminal: npm run server 
3. Run file that contains code to make request.


MONGOOSE
Database that interacts with routes (client requests and server responses)
Mongoose is our ODM (object document mapping), which means it works like 
a non-relational/NoSQL database


JWT - JSON WEB TOKEN
JSON Web Tokens are an open, industry standard RFC 7519 method 
for representing claims securely between two parties.

the JWT can be encoded or decoded and consists of 3 parts: 
1. header: includes algorithm and token type (JWT is the type)
2. payload: Includes data in json format; can have whatever you want in the token. 
            In our case, we include the user id.
            iat: Time the token was issued at
3. verify signature: ensures JWT has not been altered or tampered

party that creates the token signs the header and payload with a secret
that is known to both issuer and receiver 
OR 
a private key known only to issuer

this means if we want a protected route we will have to log in, 
get the token, and send the token and the headers to access 
that specific protected route


EXTRAS
What does REST stand for? https://stackoverflow.com/questions/671118/what-exactly-is-restful-programming
*/
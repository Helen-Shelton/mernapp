// connect to server
const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI) 
        //make object conn of type mongoose, connect to database created and linked in .env file under variable 'MONGO_URI'
        
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline) //;?
        /*
        From conn variable there is an object called 'connection' and then there is a host
        The host is the the host name portion of the URI. If multiple hosts, 
        such as a replica set, this will contain the first host name in the URI.
        
        Note:
        .cyan.underline imported from colors package 
        the backticks used (not regular quotes): `` instead of ''
        */
    
    } catch(error){ //if we cant connect to the database log error instead
        console.log(error) //'?
        process.exit(1) //exit process with failure (1 equals failure)
    }
}

module.exports = connectDB


/*
TRY AND CATCH (ERRORS)
The try statement allows you to define a block of code to be tested for errors while it is being executed.
The catch statement allows you to define a block of code to be executed, if an error occurs in the try block.

ASYNC FUCNTIONS
All Mongoose methods are Asynchronous, that is, they return a 'promise'. 
An async function is a function declared with the async keyword, 
and the await keyword is permitted within it. The async and await keywords 
enable asynchronous, promise-based behavior to be written in a cleaner style, 
avoiding the need to explicitly configure promise chains.

PROMISE CHAINING
Promise chaining is a syntax that allows you to chain together 
multiple asynchronous tasks in a specific order. 
This is great for complex code where one asynchronous task needs to be performed 
after the completion of a different asynchronous task.

Try and Catch: https://www.w3schools.com/js/js_errors.asp
Async Functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
Promise Chains: https://javascript.info/promise-chaining
                https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises


*/
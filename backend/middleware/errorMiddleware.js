const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    })
}

module.exports = {
    errorHandler,
}
/*
errorHandler function overwrites the default express errorHandler 
by passing in object "err" as an arguement.
"next" calls any further middleware

the statusCode will be either what is set in the controller (400 in this case) 
or error 500 (server error)

stack trace: we only want this if we are in development mode (variable defined in .env file)
if we're in production then we want that to be null, else show the stack on the "err" object
(this will give us line numbers, etc)

NOTE:
A stack trace is a report that provides information about program subroutines. 
The stack frames represent the movement of an application during the execution of 
the program. It traces the locations where an exception is raised. ... 
In stack trace, each element represents a method invocation.

It is commonly used for certain kinds of debugging, where a stack trace 
can help software engineers figure out where a problem lies or how various 
subroutines work together during execution.
*/

// Middleware are functions that execute during the req, res cycle (when client makes request)
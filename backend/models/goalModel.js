// The 'models' folder is where we define any resources we have: 
//blog posts, to do's, etc. (whatever we have in our application)

// This file is where we define our schema, 
//which will be the fields for a particular resource

const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
        user: { 
        //each goal must have a specific user associated with it (for protection), that is why we add this field
            type: mongoose.Schema.Types.ObjectId, 
            /* 
            When we create a new resource (document), there 
            is an _id field that is automatically created of type ObjectId.
            We set our 'user' field to this type.
            */

            required: true,
            ref: 'User', 
            //'ref' tells us which Model this ObjectId (mongoose.Schema.Types.ObjectId) references.
        },   
        text: {
            type: String,
            required: [true, 'Please add a text value'],
        },
    }, 
    {
        timestamps: true,
    //this is a second argument to mongoose.Schema function
    //creates createdAt and updatedAt properties automatically
})
/*
We pass an object in with our fields (text & timestamps). 
ex, the field is 'text' so we pass in a text field

If a property only requires a type, it can be specified
using a shorthand notation:
const goalSchema = mongoose.Schema({
    text: String
})
or do what is written above, 
where we set 'text' as an object with MULTIPLE properties.
*/

module.exports = mongoose.model('Goal', goalSchema) 
//export 'Goal' model, which takes in goalSchema (created above)

/*
SCHEMA
Mongoose Timestamps: https://masteringjs.io/tutorials/mongoose/timestamps

Quick Schema example: https://mongoosejs.com/docs/index.html
schema: https://mongoosejs.com/docs/guide.html
schema types: https://mongoosejs.com/docs/schematypes.html

Videos on Schema design best practices: 
https://www.youtube.com/watch?v=leNCfU5SYR8 (longer version)
https://www.youtube.com/watch?v=QAqK-R9HUhc (shorter version)



*/
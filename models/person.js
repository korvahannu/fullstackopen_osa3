const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log("Connecting to mongoDB . . .");

mongoose.connect(url)
.then(result => {
    console.log("Successfully connected!");
})
.catch(error => {
    console.log(error.message);
});

const personSchema =  new mongoose.Schema(
	{
		name: {type: String, minlength: 3},
		number: {type: String, minLength: 8},
	}
);

personSchema.set('toJSON',{

    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }

});

module.exports = mongoose.model('Person', personSchema);
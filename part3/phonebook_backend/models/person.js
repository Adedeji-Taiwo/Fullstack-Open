const mongoose = require('mongoose');


// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URL;
console.log('connecting to', url);



mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });



const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        min: 8,
        validate: {
            validator: function(v) {
                return /\d{2,3}-\d{6,}/.test(v);
            },
        },
        required: true
    }
});


noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});


module.exports = mongoose.model('Person', noteSchema);




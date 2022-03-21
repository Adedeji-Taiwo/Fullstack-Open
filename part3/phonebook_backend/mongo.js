/* eslint-disable no-undef */
const mongoose = require('mongoose');

if(process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}


const password = process.argv[2];

const url =
`mongodb+srv://phonebook_fullstack:${password}@cluster0.nlgwf.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);


const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', noteSchema);



const person = new Person({
    name: `"${process.argv[3]}"`,
    number: `"${process.argv[4]}"`,
});


person.save().then(() => {
    console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`);
    mongoose.connection.close();
});


Person
    .find({})
    .then(persons => {
        console.log('Phonebook:');
        persons.forEach(result => {
            console.log(`${result.name} ${result.number}`);
        });
        mongoose.connection.close();
    });
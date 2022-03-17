const express = require("express");
const morgan = require('morgan');
const cors = require("cors");
require('dotenv').config();


const app = express();


//middleware to convert JSON obtained from request body into javaScript object.
app.use(express.json());

//Morgan configured to show data sent via POST
morgan.token('body', req => {
    return JSON.stringify(req.body)
});

//middleware to log messages to console
app.use(morgan(':method :url :status :req[body] :res[content-length] - :response-time ms :body'));

//middleware to use and allow for requests from all origins
app.use(cors())



let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]





//Root Route
app.get('/api/persons', (req, res) => {
    res.json(persons);
})

//Info route
app.get('/info', (req, res) => {
    res.send(
        `<div>
            <p>Phonebook has info for ${persons.length} people.</p>
            <p>${new Date}</p>
        </div>`
    )
})

//Single person route
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    
    if(person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
})

//Delete unique route
 app.delete('/api/persons/:id', (req, res) => {
     const id = Number(req.params.id);
     persons = persons.filter(note => note.id !== id);

     res.status(204).end();
 })


 //Post route
 app.post('/api/persons', (req, res) => {
     const body = req.body;

     if (!body.name) {
         return res.status(400).json({
             error: "name missing"
         })
     }

    else if (!body.number) {
         return res.status(400).json({
             error: "number missing"
         })
     }


    else if (persons.map(person => person.name).includes(body.name)) {
         return res.status(400).json({
             error: "name must be unique"
         })
     }

     else {

        const person = {
        id: Math.floor( Math.random() * 100000),
        name: body.name,
        number: body.number
        }


        persons = persons.concat(person);

        res.json(person);
        
     }



 })



 
//middleware after routes to raise flags for unknown routes
const unKnownEndPoint = (req, res) => {
  res.status(404).send({error: "unknown endpoint"})
}

app.use(unKnownEndPoint);



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

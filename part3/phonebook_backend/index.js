const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const Person = require('./models/person');




//middleware for logging request information
const requestLogger = (req, res, next) => {
    console.log('Method:', req.method);
    console.log('Path: ', req.path);
    console.log('Body: ', req.body);
    console.log('---');
    next();
};




//middleware to convert JSON obtained from request body into javaScript object.
app.use(express.json());

//middleware to use and allow for requests from all origins
app.use(cors());


//middleware to make express show static content
app.use(express.static('build'));


//middleware for logging request information to console
app.use(requestLogger);

//Morgan configured to show data sent via POST
morgan.token('body', req => {
    return JSON.stringify(req.body);
});

//middleware to log messages to console
app.use(morgan(':method :url :status :req[body] :res[content-length] - :response-time ms :body'));







//Root Route
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    });
});


//Info route
app.get('/info', (req, res) => {
    Person.find({}).then(result => {
        res.send(
            `<div>
            <p>Phonebook has info for ${result.length} people.</p>
            <p>${new Date}</p>
        </div>`
        );
    });
});

//Single person route
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person);
            } else {
                res.status(404).end();
            }
        })
        .catch(error => next(error));
});


//Delete unique person route
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(error => next(error));
});




//Post route
app.post('/api/persons', (req, res, next) => {
    const body = req.body;

    if (!body.name) {
        return res.status(400).json({ error: 'name missing' });
    }

    if (!body.number) {
        return res.status(400).json({ error: 'number missing' });
    }



    const person = new Person({
        name: body.name,
        number: body.number,
    });


    person.save().then(savedPerson => {
        res.json(savedPerson);
    })
        .catch(error => next(error));
});



//update route
app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body;



    Person.findByIdAndUpdate(
        req.params.id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedPerson => {
            res.json(updatedPerson);
        })
        .catch(error => next(error));
});




//middleware after routes to raise flags for unknown routes
const unKnownEndPoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unKnownEndPoint);




//error handling middleware
const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }


    next(error);
};


app.use(errorHandler);



// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

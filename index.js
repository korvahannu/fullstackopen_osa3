const { json } = require('express');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

/*
Esim. json-parseri ottaa pyynnön mukana tulevan raakadatan request-oliosta,
parsii sen JavaScript-olioksi ja sijoittaa olion request:in kenttään body
*/
app.use(express.json());
app.use(cors());

morgan.token('hannu',
(request, response) => {
		
		if(request.method !== "POST")
			return null;

		return JSON.stringify(request.body);
	}

);

app.use(morgan('tiny'));
app.use(morgan(':hannu'));



/*
npm run dev
dependency: npm install express
dev dependency: npm install --save-dev nodemon
*/

let persons = [
{
	id: 1,
	name: 'Hannu Korvala',
	number: '1234-1234'
},
{
	id: 2,
	name: 'Jack Daniels',
	number: '1337-5P34K'
},
{
	id: 3,
	name: 'Kaapo 4v',
	number: '4444-4444'
}
];

app.get('/info',

	(request, response) => {
		
		const personCount = persons.length;
		const date = new Date();
		
		response.send(
		`<p>Phonebook has info for ${personCount} people</p>
		<p>${date}</p>`
		);
		
	}

);

app.get('/api/persons',

	(request, response) => {
		
		
		response.json(persons);
	}

);

app.get('/api/persons/:id',
	
	(request, response) => {
		
		const id = Number(request.params.id);
		
		const person = persons.find(p => p.id === id);
		
		if(person)
			response.json(person);
		else
			response.status(404).end();
		
	}
	
);

app.post('/api/persons',

	(request, response) => {
		console.log("Posting to api/persons");
		const body = request.body;

		if(!body.name)
		{
			return response.status(400).json({error : 'missing name'});
		}

		if(!body.number)
		{
			return response.status(400).json({error : 'missing number'});
		}

		if((persons.filter(person => person.name === body.name)).length > 0)
		{
			return response.status(400).json({error : 'name must be unique'});
		}

		const newPerson = {
			id: Math.floor(Math.random() * 9999999),
			name: body.name,
			number: body.number
		};

		persons = persons.concat(newPerson);
		response.status(204).end();
	}

);

app.delete('/api/persons/:id',
	
	(request, response) => {
		const id = Number(request.params.id);
		persons = persons.filter(person => person.id !== id);
		response.status(204);
	}
	
);

app.get('*',
	(request, response) => {
		
		response.send('<a href="/api/persons">View phonebook (JSON)</a>');
		
	}
);

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

app.listen(PORT,

	() => {
		console.log(`Server is listening to port ${PORT}`);
	}

);
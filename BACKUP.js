require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const Person = require('./models/person')

morgan.token('hannu',
  (request) => {
    if(request.method !== 'POST')
      return null

    return JSON.stringify(request.body)
  }
)

app.use(morgan('tiny'))
app.use(morgan(':hannu'))


app.get('/info',

  (request, response, next) => {

    const date = new Date()

    Person.count({})
      .then(count => {
        response.send(
          `<p>Phonebook has info for ${count} people</p>
			<p>${date}</p>`
        )
      })
      .catch(error => next(error))
  }

)

app.get('/api/persons',

  (request, response, next) => {

    Person.find({})
      .then(all => {
        response.json(all)
      })
      .catch(error => next(error))
  }

)

app.get('/api/persons/:id',

  (request, response, next) => {

    Person.findById(request.params.id)
      .then(person => {
        if(person)
          response.json(person)
        else
          response.status(404).send({ error: `could not find person with id ${request.params.id}` })
      })
      .catch(error => next(error))

  }

)

/*
3.19 tehtävässä pyydettiin, ettei duplikaatteja voi laittaa
vapaaehtoinen tehtävä numeron päivittämiselle kuitenkin menee ristiin sen kanssa
pidän tuon entisen version eli numeron päivityksen tässä
*/
app.put('/api/persons/:id',

  (request, response, next) => {

    const filter = { _id: request.params.id }
    const update = { number: request.body.number }

    Person.findOneAndUpdate(filter, update, { new:true })
      .then(result => {
        console.log(result)
        response.json(result)
      })
      .catch(error => next(error))
  }
)

app.post('/api/persons',

  (request, response, next) => {
    const body = request.body

    if(!body.name)
      return response.status(400).json({ error : 'missing name' })

    if(!body.number)
      return response.status(400).json({ error : 'missing number' })

    const newPerson = new Person({
      name: body.name,
      number: body.number
    })

    newPerson.save()
      .then(saved => {
        response.json(saved)
      })
      .catch(error => {
        next(error)
      })
  }

)

app.delete('/api/persons/:id',

  (request, response, next) => {
    Person.deleteOne({ _id:request.params.id })
      .then( () => {
        response.status(204).end()
      })
      .catch(error => next(error))
  }

)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const handleErrors = (error, request, response, next) => {

  console.error(error.message)

  if(error.name === 'CastError')
    return response.status(400).send({ error: 'malformatted id' })
  else if(error.name === 'ValidationError')
    return response.status(400).send({ error: error.message })

  next(error)
}

app.use(handleErrors)

app.listen(PORT,

  () => {
    console.log(`Server is listening to port ${PORT}`)
  }

)
const http = require('http')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.static('build'))


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

app.use(express.json())
morgan.token('body', function (req, res) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phone book has info for ${persons.length} people<p>
        <p> ${new Date} <p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const person = getPerson(request)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const deletePerson = getPerson(request)
    persons = persons.filter(p => p.id !== deletePerson.id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (nameExists(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(newPerson)

    response.json(newPerson)
})

function nameExists(name) {
    if (persons.find(p => p.name === name)) {
        return true
    }
    return false
}

const generateId = () => {
    const id = Math.max(...persons.map(p => p.id))
    return id + 1
}

const getPerson = (request) => {
    return persons.find(p => p.id === Number(request.params.id))
}

const PORT = 3001
app.listen(
    PORT,
    () => {
        console.log(`Starting server on port ${PORT}`)
        console.log(`http://localhost:${PORT}/api/persons`)
    }
)



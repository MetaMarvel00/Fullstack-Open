const express = require('express')
const morgan = require('morgan')

const app = express()

let persons = [
  { id: '1', name: 'Arto Hellas', number: '040-123456' },
  { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
  { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' },
]

const generateId = () => String(Math.floor(Math.random() * 1_000_000_000))

app.use(express.json())

morgan.token('body', (req) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ' '
)
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
  )
)

app.get('/api/persons', (_req, res) => {
  res.json(persons)
})

app.get('/info', (_req, res) => {
  const receivedAt = new Date()
  const count = persons.length
  res.send(
    `<p>Phonebook has info for ${count} people</p><p>${receivedAt}</p>`
  )
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find((p) => p.id === req.params.id)
  if (!person) {
    return res.status(404).end()
  }
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const before = persons.length
  persons = persons.filter((p) => p.id !== id)
  if (persons.length === before) {
    return res.status(404).end()
  }
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const nameTaken = persons.some((p) => p.name === body.name)
  if (nameTaken) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }
  persons = persons.concat(person)
  res.json(person)
})

app.put('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const body = req.body
  const existing = persons.find((p) => p.id === id)
  if (!existing) {
    return res.status(404).json({ error: 'not found' })
  }
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }
  const nameTaken = persons.some(
    (p) => p.name === body.name && p.id !== id
  )
  if (nameTaken) {
    return res.status(400).json({ error: 'name must be unique' })
  }
  const updated = { id, name: body.name, number: body.number }
  persons = persons.map((p) => (p.id === id ? updated : p))
  res.json(updated)
})

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

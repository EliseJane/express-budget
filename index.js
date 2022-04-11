const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./src/queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (_request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.get('/users/:userId/budgets', db.getBudgets)
app.get('/users/:userId/budgets/:id', db.getBudgetById)
app.post('/users/:userId/budgets', db.createBudget)
app.delete('/users/:userId/budgets/:id', db.deleteBudget)

app.get('/users/:userId/budgets/:budgetId/splits', db.getSplits)
app.get('/users/:userId/budgets/:budgetId/splits/:id', db.getSplitById)
app.post('/users/:userId/budgets/:budgetId/splits', db.createSplit)
app.delete('/users/:userId/budgets/:budgetId/splits/:id', db.deleteSplit)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

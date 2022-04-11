const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'budgets',
  password: 'password',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)
  
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email, password } = request.body

  pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id', [name, email, password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email, password } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4',
    [name, email, password, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const getBudgets = (request, response) => {
  const userId = parseInt(request.params.userId);
  pool.query('SELECT * FROM budgets WHERE user_id = $1 ORDER BY id ASC', [userId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getBudgetById = (request, response) => {
  const id = parseInt(request.params.id)
  
  pool.query('SELECT * FROM budgets WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createBudget = (request, response) => {
  const { userId, category, amount, startTime, endTime } = request.body

  pool.query('INSERT INTO budgets (user_id, category, amount, start_time, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING id', [userId, category, amount, startTime, endTime], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Budget added with ID: ${results.rows[0].id}`)
  })
}

const deleteBudget = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM budgets WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Budget deleted with ID: ${id}`)
  })
}

const getSplits = (request, response) => {
  const budgetId = parseInt(request.params.budgetId);
  pool.query('SELECT * FROM splits WHERE budget_id = $1 ORDER BY id ASC', [budgetId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSplitById = (request, response) => {
  const id = parseInt(request.params.id)
  
  pool.query('SELECT * FROM splits WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createSplit = (request, response) => {
  const { budgetId, subcategory, amount } = request.body

  pool.query('INSERT INTO splits (budget_id, subcategory, amount) VALUES ($1, $2, $3) RETURNING id', [budgetId, subcategory, amount], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Split added with ID: ${results.rows[0].id} to budget with ID: ${budgetId}`)
  })
}

const deleteSplit = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM splits WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Split deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getBudgets,
  getBudgetById,
  createBudget,
  deleteBudget,
  getSplits,
  getSplitById,
  createSplit,
  deleteSplit,
}
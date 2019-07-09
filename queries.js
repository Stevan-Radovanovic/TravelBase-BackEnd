const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'food_db',
  password: 'postgres',
  port: 5432,
})



const getUsers = (request, response) => {
  pool.query('SELECT * FROM public."user" ORDER BY user_id ASC ', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM "user" WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getUserByUsername = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM "user" WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {

  let user_id = request.body.userid;
  let username = request.body.username;
  let password = request.body.password;
  let role = request.body.role;

  pool.query('INSERT INTO "user" ("user_id","username","password", "role") VALUES ($1, $2, $3 ,$4)', [user_id, username, password, role], (error, results) => {
    if (error) {
    console.log("GRESKA");
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateUser = (request, response) => {
 let user_id=request.body.user_id;
 let username=request.body.username;
  pool.query(
    'UPDATE "user" SET "username" = $1 WHERE "user_id" = $2',
    [username, user_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${user_id}`)
    }
  )
}

const deleteUser = (request, response) => {
  let id=request.body.userid;

  pool.query('DELETE FROM "user" WHERE "user_id" = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
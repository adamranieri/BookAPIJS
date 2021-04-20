const knex = require('knex')
const app = require('./app')
const {PORT, SQL_DB, SQL_HOST, USER, PW} = require('./config')

const db = knex({
  client: 'pg',
  connection: {
    host: SQL_HOST,
    user: USER,
    password: PW,
    database: SQL_DB
  }
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

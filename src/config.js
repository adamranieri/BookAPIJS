module.exports = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  SQL_HOST: process.env.DB_HOST || '35.232.230.126',
  USER: process.env.DB_USER || 'revauser',
  PW: process.env.DB_PASS || 'revabooks',
  SQL_DB: process.env.DB_DATABASE || 'nodebooks'
}

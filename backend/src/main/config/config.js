module.exports = {
  development: {
    username: "root",     //replace with your own local database username
    password: "mysqlpw",  //replace with your own local database password
    database: "inventory",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}
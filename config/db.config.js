module.exports = {
  HOST: "localhost",
  USER: "siroj",
  PASSWORD: "qwer1234",
  DB: "book_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

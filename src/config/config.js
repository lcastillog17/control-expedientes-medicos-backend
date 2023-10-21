// En un archivo config.js
module.exports = {
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  // Configuración de la base de datos MongoDB
  mongodb: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    dbName: process.env.MONGODB_DBNAME,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASSWORD,
  },
};

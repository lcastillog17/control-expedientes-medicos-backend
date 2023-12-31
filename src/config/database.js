const config = require("./config");
const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://mongo:${config.mongodb.port}/${config.mongodb.dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión a MongoDB establecida");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = mongoose;

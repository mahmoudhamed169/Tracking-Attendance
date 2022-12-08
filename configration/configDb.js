const mongoose = require("mongoose");

const connection = () => {
  return mongoose
    .connect(process.env.CONNECTION_STRING_DEPLOY)
    .then((result) => {
      console.log("DB is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connection;

const customersRouter = require("./customer");

function route(app) {
  app.use("/customers", customersRouter);
}

module.exports = route;

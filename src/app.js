const express = require("express");
const path = require("path");
const app = express();
const customerRoutes = require("./routes/customers");
const morgan = require("morgan");
const mysql = require("mysql");
const connection = require("express-myconnection");
// SETTINGS

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

// MIDDLEWARES
app.use(morgan("dev"));
app.use(
  connection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "",
      port: 3306,
      database: "app-registrar-clientes",
    },
    "single"
  )
);

app.use(express.urlencoded({ extended: false }));
// ROUTES
app.use("/", customerRoutes);

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

app.listen(app.get("port"), () => {
  // console.log("Server on port 3000");
});

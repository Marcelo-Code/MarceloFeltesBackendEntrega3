import express from "express";
import handlebars from "express-handlebars";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { __dirname } from "./utils.js";
import path from "path";

dotenv.config();

const uriMongo = process.env.URI_MONGO;
const port = 8080;

const app = express();

//Configuración del motor de plantillas
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(uriMongo)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) =>
    console.error("Error al conectar a la base de datos con Mongoose:", error)
  );

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.get("/", (req, res) => {
  res.render("home");
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(port, () => console.log("Server listening on port " + port));

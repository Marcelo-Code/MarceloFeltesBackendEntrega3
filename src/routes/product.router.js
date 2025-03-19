import { Router } from "express";
import { productModel } from "../models/product.model.js";
import { cartModel } from "../models/cart.model.js";

const router = Router();

//Obtener lista de productos
//--------------------------
router.get("/", async (req, res) => {
  const { limit = 10, page = 1, query = "", value = "", sort } = req.query;

  const productsPerPage = limit;
  const actualPage = page;
  const filterType = query;
  const filterValue = value;
  const sortType = sort;

  let availableCarts = await cartModel.find().sort();

  try {
    let filter = {};

    // Aplicar filtro solo si se recibe un query válido
    // localhost:8080/api/products?query=<propiedad a filtrar>&value=<valor de la propiedad a filtrar>

    if (filterType && filterValue) {
      //Aplica búsqueda flexible, sin considerar maypusculas y minúsculas
      filter = { [filterType]: { $regex: filterValue, $options: "i" } };
    }

    let sortOption = { title: 1 };

    if (sortType === "asc") {
      sortOption = { price: 1 };
    } else if (sortType === "desc") {
      sortOption = { price: -1 };
    }

    // Comparar el valor de 'sort' en el controlador y pasarlo al render
    let sortOrder = sort === "asc" ? true : false;

    let foundProducts = await productModel.paginate(filter, {
      limit: productsPerPage,
      page: actualPage,
      sort: sortOption,
    });

    // Generar prevLink y nextLink
    let prevLink = foundProducts.hasPrevPage
      ? `/api/products?limit=${productsPerPage}&page=${foundProducts.prevPage}`
      : null;

    let nextLink = foundProducts.hasNextPage
      ? `/api/products?limit=${productsPerPage}&page=${foundProducts.nextPage}`
      : null;

    // Si la solicitud tiene el encabezado Accept con text/html, se renderiza la vista products
    // Si la solicitud tiene el encabezado Accept con text/html, renderiza la vista "products"
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      res.render("products", {
        payload: foundProducts,
        prevLink,
        nextLink,
        sortOrder,
        availableCarts,
      });
    } else {
      res.json({
        status: "Success",
        payload: { ...foundProducts, prevLink, nextLink, availableCarts },
      });
    }
  } catch (error) {
    console.error("Error al obtener productos con Mongoose: ", error);
    res.status(500).json({
      error: "Error al obtener productos con Mongoose",
      message: error.message,
    });
  }
});

//Obtener producto por categoría
//------------------------------
router.get("/create", (req, res) => {
  res.render("createProduct");
});

//Obtener producto por ID
//-----------------------
router.get("/:productId", async (req, res) => {
  try {
    let productId = req.params.productId;
    let foundProduct = await productModel.findOne({ _id: productId });
    let availableCarts = await cartModel.find().sort();

    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      res.render("product", {
        payload: foundProduct,
        availableCarts,
      });
      console.log(foundProduct);
    } else {
      res.json({
        status: "Success",
        payload: foundProduct,
        availableCarts: availableCarts,
      });
    }
  } catch (error) {
    console.error("Error al obtener producto con Mongoose: ", error);
    res.status(500).json({
      error: "Error al obtener producto con Mongoose",
      message: error.message,
    });
  }
});

//Renderizar formulario de actualización
//--------------------------------------
router.get("/update/:productId", async (req, res) => {
  try {
    let productId = req.params.productId;
    let foundProduct = await productModel.findById(productId).lean();
    res.render("updateProduct", { product: foundProduct });
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).send({ status: "Error", message: "Internal Server Error" });
  }
});

//Obtener producto por categoría
//------------------------------
router.get("/category/:category", async (req, res) => {
  try {
    let category = req.params.category;
    let foundProduct = await productModel.find({ category: category });
    res.send({ status: "Success", payload: foundProduct });
  } catch (error) {
    console.error("Error al obtener producto con Mongoose: ", error);
    res.status(500).json({
      error: "Error al obtener producto con Mongoose",
      message: error.message,
    });
  }
});

//Crear producto
//--------------
router.post("/", async (req, res) => {
  try {
    let { title, description, price, category, stock } = req.body;
    if (!title || !description || !price || !category || !stock)
      return res.status(400).send({ error: "Faltan campos obligatorios" });

    let newProduct = { title, description, price, category, stock };
    let createdProduct = await productModel.create(newProduct);
    res.status(201).send({ result: "Success", payload: createdProduct });
  } catch (error) {
    console.error("Error al crear producto con Mongoose: ", error);
    res.status(500).json({
      error: "Error al crear producto con Mongoose",
      message: error.message,
    });
  }
});

//Actualizar producto
//-------------------
router.put("/:productId", async (req, res) => {
  try {
    let productId = req.params.productId;
    let productToUpdate = req.body;
    if (
      !productToUpdate.title ||
      !productToUpdate.description ||
      !productToUpdate.price ||
      !productToUpdate.category ||
      !productToUpdate.stock
    )
      return res.status(400).send({ error: "Faltan campos obligatorios" });
    let updatedProduct = await productModel.updateOne(
      { _id: productId },
      productToUpdate
    );
    res.send({ result: "Success", payload: updatedProduct });
  } catch (error) {
    console.error("Error al crear producto con Mongoose: ", error);
    res.status(500).json({
      error: "Error al crear producto con Mongoose",
      message: error.message,
    });
  }
});

//Eliminar producto
//-----------------
router.delete("/:productId", async (req, res) => {
  try {
    let productId = req.params.productId;
    let deletedProduct = await productModel.deleteOne({ _id: productId });
    res.send({ status: "Success", payload: deletedProduct });
  } catch (error) {
    console.error("Error al crear producto con Mongoose: ", error);
    res.status(500).json({
      error: "Error al crear producto con Mongoose",
      message: error.message,
    });
  }
});

export default router;

import { Router } from "express";
import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";
import mongoose from "mongoose"; // Asegúrate de que esto esté importado

const router = Router();

//Obtener lista de carritos
//-------------------------
router.get("/", async (req, res) => {
  try {
    let foundCarts = await cartModel.find().populate("products.productId");
    let availableProducts = await productModel.find().sort({ title: 1 });

    //Si la solicitud tiene el encabezado Accept con text/html, se renderiza la vista carts
    //Si no devuelve una respuesta JSON (consulta por POSTMAN)
    if (req.headers.accept && req.headers.accept.includes("text/html")) {
      res.render("carts", {
        payload: foundCarts,
        availableProducts: availableProducts,
      });
    } else {
      res.json({ status: "Success", payload: foundCarts });
    }
  } catch (error) {
    console.error("Error al obtener carritos con Mongoose: ", error);
    res.status(500).json({
      error: "Error al obtener carritos con Mongoose",
      message: error.message,
    });
  }
});

//Obtener carrito por id
//----------------------
router.get("/:cartId", async (req, res) => {
  try {
    let cartId = req.params.cartId;
    let foundCart = await cartModel.find({ _id: cartId });
    res.status(500).json({
      result: "Success",
      payload: foundCart,
    });
  } catch (error) {
    console.error("Error al obtener carrito con Mongoose: ", error);
    res.status(500).json({
      error: "Error al obtener carrito con Mongoose",
      message: error.message,
    });
  }
});

//Crear carrito
//-------------
router.post("/", async (req, res) => {
  try {
    let createdCart = await cartModel.create({
      products: [],
    });
    res.send({ result: "Success", payload: createdCart });
  } catch (error) {
    console.error("Error al crear carrito con Mongoose: ", error);
    res.status(500).json({
      error: "Error al crear carrito con Mongoose",
      message: error.message,
    });
  }
});

//Agregar producto a carrito
//--------------------------
router.put("/:cartId/products/:productId", async (req, res) => {
  try {
    let cartId = req.params.cartId;
    let productId = req.params.productId;
    let foundCart = await cartModel.findOne({ _id: cartId });
    let foundProduct = await productModel.findOne({ _id: productId });

    //Verifica que tanto el carrito como el producto existan

    if (!foundCart || !foundProduct)
      return res
        .status(400)
        .send({ error: "Carrito o producto no encontrado" });

    //Verifica que el producto tenga stock

    if (foundProduct.stock === 0) {
      return res
        .status(400)
        .send({ error: "Stock insuficiente", producto: foundProduct });
    }

    //Actualiza el stock del producto

    await productModel.findOneAndUpdate(
      { _id: productId },
      { $inc: { stock: -1 } },
      { new: true }
    );

    const productInCart = foundCart.products.some(
      (product) => product.productId._id.toString() === productId
    );

    //Agrega el producto al carrito, si el producto ya estaba en el carrito
    //incrementa la cantidad en 1 unidad, si no lo agrega

    if (productInCart) {
      await cartModel.findOneAndUpdate(
        { _id: cartId, "products.productId": productId },
        { $inc: { "products.$.quantity": 1 } },
        { new: true, upsert: false }
      );
    } else {
      await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $push: { products: { productId, quantity: 1 } } },
        { new: true, upsert: false }
      );
    }

    const updatedCart = await cartModel.findOne({ _id: cartId });

    res.send({ result: "Success", payload: updatedCart });
  } catch (error) {
    console.error("Error al actualizar carrito con Mongoose: ", error);
    res.status(500).json({
      error: "Error al actualizar carrito con Mongoose",
      message: error.message,
    });
  }
});

//Eliminar carrito
//----------------
router.delete("/:cartId", async (req, res) => {
  try {
    let cartId = req.params.cartId;
    let deletedCart = await cartModel.deleteOne({ _id: cartId });
    res.send({ result: "Success", payload: deletedCart });
  } catch (error) {
    console.error("Error al eliminar carrito con Mongoose: ", error);
    res.status(500).json({
      error: "Error al eliminar carrito con Mongoose",
      message: error.message,
    });
  }
});

//Eliminar producto de carrito
//----------------------------
router.delete("/:cartId/products/:productId", async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    console.log("cartId:", cartId, "productId:", productId);

    // Verifica si el carrito existe

    const foundCart = await cartModel.findById(cartId);
    if (!foundCart) {
      return res.status(400).send({ error: "Carrito no encontrado" });
    }

    // Verifica si el producto se encuentra en el carrito

    const productInCart = foundCart.products.some(
      (product) => product.productId._id.toString() === productId
    );

    if (!productInCart) {
      return res
        .status(400)
        .send({ error: "Producto no encontrado en carrito" });
    }

    //Elimina el producto del carrito

    console.log("foundCart._id:", foundCart._id);
    const updatedCart = await cartModel.updateOne(
      { _id: foundCart._id },
      {
        $pull: {
          products: { productId: new mongoose.Types.ObjectId(productId) },
        },
      },
      { new: true }
    );

    console.log("updatedCart:", updatedCart);

    res.send({ result: "Success", payload: updatedCart });
  } catch (error) {
    console.error("Error al eliminar producto del carrito: ", error);
    res.status(500).json({ error: "Error interno", message: error.message });
  }
});

export default router;

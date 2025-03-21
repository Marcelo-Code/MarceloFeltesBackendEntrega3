import mongoose from "mongoose";

const cartsCollection = "carts";
const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

export const cartModel = mongoose.model(cartsCollection, cartSchema);

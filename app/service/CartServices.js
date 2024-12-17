import mongoose from "mongoose";
import CartModel from "../model/cartsModel.js";
export const CreateCartService = async (req) => {
  try {
    let ObjectID = mongoose.Types.ObjectId;
    const { productID, color, qty, size,uid } = req.body;
    const uid2 = new ObjectID(uid);
    const pid = new ObjectID(productID)
    let postJson = {
      userID: uid2,
      productID:pid,
      color,
      qty,
      size,
    };
    console.log(postJson);
    await CartModel.create(postJson);
    return { status: "success", message: "Cart Saved Successfully" };
  } catch (err) {
    return { status: "fail", message: err.toString() };
  }
};
export const UpdateCartService = async (req) => {
  try {
    const { id,color,
      qty,
      size } = req.body;
      let postJson = {
        color,
        qty,
        size,
      };

    await CartModel.updateOne({ _id: id,userID: req.headers.user_id},{$set:postJson});
    return { status: "success", message: "Updated Cart Item Successfully" };
  } catch (err) {
    return { status: "fail", message: err.toString() };
  }
};
export const ReadCartService = async (req) => {
  try {
   

    let data = await CartModel.find({});
   
    if (data.length==0) {
      return { status: "fail", message: "No Items found" };
    }
    return { status: "success", data: data };
  } catch (err) {
    return { status: "fail", message: err.toString() };
  }
};

export const RemoveCartService = async (req) => {
  try {
    const { id } = req.body;
     

    await CartModel.deleteOne({ _id: id,userID: req.headers.user_id});
    return { status: "success", message: "Removed Cart Item Successfully" };
  } catch (err) {
    return { status: "fail", message: err.toString() };
  }
};
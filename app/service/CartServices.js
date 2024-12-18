import mongoose from "mongoose";
import CartModel from "../model/cartsModel.js";
import ProductModel from "../model/productsModel.js";
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

export const ReadCartService =async (req) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    // Step 1: Fetch all cart data
    const userID = new ObjectId(req.headers.user_id);
    let cartData = await CartModel.aggregate([
      {
        $match: { userID },
      }
    ])

    // Step 2: Enrich each cart item with product details
    // Enrich cart data with product details
  const enrichedCartItems = await Promise.all(
    cartData.map(async (item) => {
      try {
        const productID = new ObjectId(item.productID);
        const product = await ProductModel.findById(productID);

        if (product) {
          return {
            ...item,
            price: product.price,
            discount: product.discount,
            discountPrice: product.discountPrice,
            image: product.image,
            title: product.title,
          };
        } else {
          return {
            ...item,
            price: null,
            discount: null,
            discountPrice: null,
            image: null,
            title: null,
          };
        }
      } catch (err) {
        console.error(`Error fetching product for ID: ${item.productID}`, err);
        return {
          ...item,
          price: null,
          discount: null,
          discountPrice: null,
          image: null,
          title: null,
        };
      }
    })
  );

  // Format the result
  const result = enrichedCartItems;

  console.log(result);
  return result;
} catch (error) {
  console.error('Error fetching cart data:', error);
}
};

export const RemoveCartService = async (req) => {
  try {
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
    const objectIdd = new ObjectId(id);
    const userID = req.headers.user_id;
    console.log(userID)
    // Log to verify values
    console.log(`Attempting to remove cart item with ID: ${id} for user: ${userID}`);

    // Perform the delete operation
    const result = await CartModel.findOneAndDelete({ _id: objectIdd, userID: userID });

    // Log result to check if the deletion was successful
    if (result) {
      console.log(`Successfully removed cart item with ID: ${id}`);
      return { status: "success", message: "Removed Cart Item Successfully" };
    } else {
      console.log(`No matching cart item found with ID: ${id} for user: ${userID}`);
      return { status: "fail", message: "Cart item not found or not associated with this user" ,id:userID};
    }
  } catch (err) {
    // Log error for debugging
    console.error('Error removing cart item:', err);
    return { status: "fail", message: err.toString() };
  }
};

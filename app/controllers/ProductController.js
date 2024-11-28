import BrandModel from "../model/brandsModel.js"
import CategoryModel from "../model/categoriesModel.js"
import ProductModel from "../model/productsModel.js"
import ProductSliderModel from "../model/slidersModel.js"
import { ListByFilterService } from "../service/ListByFilterService.js"
import { ListByBrandService, DetailsService, ListByRemarkService, ListByCategoryService, ProductReviewListService, ListByKeywordService } from "../service/ProductServices.js"

export const ProductListByCategory = async (req,res) => {
    let result = await ListByCategoryService(req)
    return res.json(result)
}

export const ProductListByRemark = async (req,res) => {
    let result = await ListByRemarkService(req)
    return res.json(result)
}
export const ProductListByBrand=async (req,res)=>{
    let result = await ListByBrandService(req)
    return res.json(result)
}

export const ProductListBySlider=async (req,res)=>{
    try {
        let data = await ProductSliderModel.find({});
        
        // Use res.json() or res.send() to send the response
        res.status(200).json({ status: "success", data: data });
      } catch (error) {
        res.status(500).json({ status: "fail", data: error.toString() });
      }
}
export const ProductListByFilter=async (req,res)=>{
    let result = await ListByFilterService(req)
    return res.json(result)
}
export const sliderpost=async (req,res)=>{
    try {
        // Destructure data from the request body
        const { title, des, price,image } = req.body; // Adjust fields based on your schema
    
        // Create a new product slider entry
        const newSlider = new ProductSliderModel({
          title, // Assuming you have this field in your model
          des, // Assuming you have this field for the image URL or path
          price,
          image // Assuming you have a description field
        });
    
        // Save the new slider to the database
        const savedSlider = await newSlider.save();
    
        // Return success response with saved data
        return res.status(201).json({ status: "success", data: savedSlider });
      } catch (error) {
        // Return failure response with error message
        return res.status(500).json({ status: "fail", data: error.toString() });
      }
}

export const ProductDetailsID=async (req,res)=>{
    let result = await DetailsService(req)
    // const { ProductID } = req.params;
    return res.json(result)
}

export const ProductListByKeyword=async (req,res)=>{
    let result = await ListByKeywordService(req)
    return res.json(result)
}


export const ProductReviewListByID=async (req,res)=>{
    let result = await ProductReviewListService(req)
    return res.json(result)
}

export const CreateProductReview=async (req,res)=>{
    try {
        return res.json({status:"success"});
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}
export const GetProducts=async (req,res)=>{
    try {
        const products = await ProductModel.find({})
        return res.json({status:"success",data:products});
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}

export const GetProductBrandList=async (req,res)=>{
    try {
        const products = await BrandModel.find({})
        return res.json({status:"success",data:products});
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}
export const GetCategories=async (req,res)=>{
    try {
        const products = await CategoryModel.find({})
        return res.json({status:"success",data:products});
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}
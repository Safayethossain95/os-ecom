import ProductModel from "../model/productsModel.js"
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
export const ListByFilterService = async (req) => {
    try {
        let matchCondition = {

        }
        console.log(req.body)
        if(req.body['categoryID']){
            matchCondition.categoryID = new ObjectId(req.body['categoryID'])
        }
        if(req.body['brandID']){
            matchCondition.brandID = new ObjectId(req.body['brandID'])
        }

        let matchStage = {$match: matchCondition}

        let addFieldsStage = {
            $addFields:{
                numericPrice : {$toInt: "$price"}
            }
        }
        let priceMin = parseInt(req.body['priceMin'])
        let priceMax = parseInt(req.body['priceMax'])
        let priceMatchConditions = {}

        if(!isNaN(priceMin)){
            priceMatchConditions['numericPrice'] = {"$gte":priceMin}
        }
        if(!isNaN(priceMax)){
            priceMatchConditions['numericPrice'] = {
                ...(priceMatchConditions['numericPrice'] ||{}), $lte:priceMax
            }
        }

        let priceMatchStage = {$match:priceMatchConditions}

        let joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        let joinWithVategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
        let unwindBrandStage = {$unwind:"$brand"}
        let unwindCateogryStage = {$unwind:"$category"}
        // let projectionStage = {$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data = await ProductModel.aggregate([
            matchStage,
            addFieldsStage,
            priceMatchStage,
            joinWithBrandStage,
            joinWithVategoryStage,
            unwindBrandStage,
            unwindCateogryStage,
            // projectionStage
        ])

        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}
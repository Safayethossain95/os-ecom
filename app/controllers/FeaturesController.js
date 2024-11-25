import {FeaturesListService,LegalDetailsService} from "../service/FeaturesServices.js";

export const FeaturesList=async(req,res)=>{
    let result=await FeaturesListService(req);
    return res.json(result)
}


export const LegalDetails=async(req,res)=>{
    console.log("dhukse")
    let result=await LegalDetailsService(req);
    return res.json(result)
}





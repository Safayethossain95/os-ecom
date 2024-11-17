import {create} from 'zustand'
import axios from 'axios'

export const productStore = create((set)=>({

  
    ListProduct:null,
    ListByBrandRequest:async(BrandID)=>{
        set({ListProduct:null})
        let res=await axios.get(`/api/ProductListByBrand/${BrandID}`);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']})
        }
    },
    ListByCategoryRequest:async(CategoryID)=>{
        set({ListProduct:null})
        let res=await axios.get(`/api/ProductListByCategory/${CategoryID}`);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']})
        }
    },
    ListByKeywordRequest:async(Keyword)=>{
        set({ListProduct:null})
        let res=await axios.get(`/api/ProductListByKeyword/${Keyword}`);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']})
        }
    },
    ListByFilterRequest:async(postBody)=>{
        set({ListProduct:null})
        let res=await axios.post(`/api/ProductListByFilter`,postBody);
        if(res.data['status']==="success"){
            set({ListProduct:res.data['data']})
        }
    },
    BrandList: null,
    BrandListRequest: async ()=>{
        try{
            const res = await axios.get('/api/ProductBrandList')
            if(res.data.status=="success"){
                set({BrandList:res.data['data']})
            }
        }catch(e){
            console.error(e)
        }
    },
    SliderList:null,
    SliderListRequest: async()=>{
        try{
            const res = await axios.get('/api/ProductListBySlider')
            console.log("ami slidrer",res.data.data)
            if(res.data.status=="success"){
                set({SliderList:res.data['data']})
            }
        }catch(e){
            console.error(e)
        }
    },
    ListByRemark:null,
    ListByRemarkRequest: async(remark)=>{
        try{
            console.log("entered remark")
            const res = await axios.get(`/api/ProductListByRemark/${remark}`)
            if(res.data.status=="success"){
                console.log(res.data['data'])
                set({ListByRemark:res.data['data']})
            }
        }catch(e){
            console.error(e)
        }
    },
    CategoryList:null,
    CategoryListRequest:async()=>{
        let res=await axios.get(`/api/GetCategories`);
        if(res.data['status']==="success"){
            set({CategoryList:res.data['data']})
        }
    },

}))
import {create} from 'zustand'
import axios from 'axios'

export const productStore = create((set)=>({
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
            const res = await axios.get('/api/ProductSliderList')
            if(res.data.status=="success"){
                set({SliderList:res.data['data']})
            }
        }catch(e){
            console.error(e)
        }
    }

}))
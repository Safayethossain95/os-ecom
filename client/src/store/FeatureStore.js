import {create} from 'zustand';
import axios  from "axios";

export const useFeatureStore = create((set)=>({
    FeatureList:null,
    FeatureListRequest:async()=>{
        try{

            let res=await axios.get(`http://localhost:8000/api/FeaturesList`);
            console.log(res.data)
            if(res.data['status']==="success"){
                set({FeatureList:res.data['data']})
            }
        }catch(e){
            console.error(e)
        }
    },

    LegalDetails:null,
    LegalDetailsRequest:async(type)=>{
        set({LegalDetails:null})
        let res=await axios.get(`http://localhost:8000/api/LegalDetails/${type}`);
        if(res.data['status']==="success"){
            set({LegalDetails:res.data['data']})
        }
    },
}))


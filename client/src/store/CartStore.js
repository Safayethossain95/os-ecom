import {create} from 'zustand';
import axios  from "axios";
import {unauthorized} from "../utility/utility";
import { UserStore } from './UserStore';

export const CartStore=create((set)=>({
   
    isCartSubmit:false,

    CartForm:{productID:"",color:"",size:""},

    CartFormChange:(name,value)=>{
        set((state)=>({
            CartForm:{
                ...state.CartForm,
                [name]:value
            }
        }))
    },

    CartSaveRequest:async(PostBody,qty,cartform)=>{
        try {
            set({isCartSubmit:true})
            console.log(cartform)
            let color = cartform?.color
            let size = cartform?.size
            let productID = PostBody.details?.productID
            let myuid = UserStore.getState().uid
            let newform = {
                uid:myuid,
                productID,
                color,
                size,
                qty
            }
            let res=await axios.post(`http://localhost:8000/api/CreateCart`,newform);
            console.log(res)
            return res.data['status'] === "success";
        }catch (e) {
            console.log(e)
            
        }finally {
            set({isCartSubmit:false})
        }
    },



    CartList:null,
    CartCount:0,
    CartTotal:0,
    CartVatTotal:0,
    CartPayableTotal:0,

    CartListRequest:async()=>{
        try {
            let res=await axios.get(`http://localhost:8000/api/ReadCartList`,{
                headers:{'user_id':UserStore.getState().uid}
            });
            console.log(UserStore.getState().uid)
            if(UserStore.getState().isLogin){

                set({CartList:res.data})
                set({CartCount:res.data?.length})
                let total=0
                let vat=0
                let payable=0
                res.data?.forEach((item)=>{
                    if(item['discount']===true){
                        total=total+parseInt(item['qty'])*parseInt(item['discountPrice'])
                    }else{
                        total=total+parseInt(item['qty'])*parseInt(item['price'])
                    }
                })
    
                vat=total*0.05
                payable=vat+total
                set({CartTotal:total})
                set({CartVatTotal:vat})
                set({CartPayableTotal:payable})
            }

        }catch (e) {
            console.log(e)
        }
    },


    RemoveCartListRequest: async (cartID) => {
        try {
            // Step 1: Remove the item from the backend
            const res = await axios.delete(`http://localhost:8000/api/RemoveCart/${cartID}`, {
                headers: { 'user_id': UserStore.getState().uid }
            }, { withCredentials: true });
            console.log(UserStore.getState().uid)
            // Step 2: Check if the response was successful
            if (res && res.status === 200) {
                console.log("Item removed from the cart");
    
                // Step 3: Update the CartList state by removing the item locally
                set(prevState => ({
                    CartList: prevState.CartList.filter(item => item._id !== cartID)
                }));
            } else {
                console.log("No item removed or error in response");
            }
        } catch (e) {
            console.log("Error removing cart item:", e);
        }
    },
    



    CreateInvoiceRequest:async()=>{
        try {
            set({isCartSubmit:true})
            let res=await axios.get(`/api/v1/CreateInvoice`);
            window.location.href=res.data['data']['GatewayPageURL'];
        }catch (e) {
            unauthorized(e.response.status)
        }finally {
            set({isCartSubmit:false})
        }
    },






    InvoiceList:null,
    InvoiceListRequest:async()=>{
        try {
            let res=await axios.get(`/api/v1/InvoiceList`);
            set({InvoiceList:res.data['data']})
        }catch (e) {
            unauthorized(e.response.status)
        }
    },







    InvoiceDetails:null,
    InvoiceDetailsRequest:async(id)=>{
        try {
            let res=await axios.get(`/api/v1/InvoiceProductList/${id}`);
            set({InvoiceDetails:res.data['data']})
        }catch (e) {
            unauthorized(e.response.status)
        }
    }


}))

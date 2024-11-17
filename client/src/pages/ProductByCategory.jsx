import { useEffect } from "react";
import { productStore } from "../store/ProductStore";
import Layout from "../components/layout/Layout";
import ProductList from "../components/product/ProductList";
import { useParams } from "react-router-dom";


const ProductByCategory = () => {
  const {ListByCategoryRequest}=productStore();
    const {id}=useParams();

    useEffect(() => {
        (async ()=>{
            await ListByCategoryRequest(id)
        })()
    }, [id]);


    return (
        <Layout>
            <ProductList/>
        </Layout>
    );
}

export default ProductByCategory
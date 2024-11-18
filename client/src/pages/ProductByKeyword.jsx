import { useEffect } from "react";
import { productStore } from "../store/ProductStore";
import Layout from "../components/layout/Layout";
import ProductList from "../components/product/ProductList";
import { useParams } from "react-router-dom";


const ProductByKeyword = () => {
  const {ListByKeywordRequest}=productStore();
    const {keyword}=useParams();

    useEffect(() => {
        (async ()=>{
            await ListByKeywordRequest(keyword)
        })()
    }, [keyword]);


    return (
        <Layout>
            <ProductList/>
        </Layout>
    );
}

export default ProductByKeyword
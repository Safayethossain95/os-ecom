import  {useEffect} from 'react';
import  { productStore } from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import Layout from '../components/layout/Layout.jsx';
import ProductList from '../components/product/ProductList.jsx';

const ProductByBrandPage = () => {
    const {ListByBrandRequest}= productStore()
    const {id}=useParams();

    useEffect(() => {
        (async ()=>{
            await ListByBrandRequest(id)
        })()
    }, [id]);


    return (
        <Layout>
            <ProductList/>
        </Layout>
    );
};

export default ProductByBrandPage;
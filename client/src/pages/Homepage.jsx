/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Layout from "../components/layout/Layout.jsx";
import Brands from "../components/product/Brands.jsx";;
import { productStore } from "../store/ProductStore.js";
import Features from '../components/product/Features.jsx';
import {useFeatureStore} from "../store/FeatureStore.js";
import Slider from './../components/product/Slider';
import Products from "../components/product/Products.jsx";
import Categories from "../components/product/Categories.jsx";



const Homepage = () => {

    const {BrandListRequest,SliderListRequest,ListByRemarkRequest,CategoryListRequest} = productStore()
    const {FeatureListRequest} = useFeatureStore()
    useEffect(() => {
        (async () => {
            await FeatureListRequest()
            await BrandListRequest();
            await SliderListRequest();
            await ListByRemarkRequest('new');
            await CategoryListRequest()
        })()
    }, []);

    
    return (
        <Layout>
            <Slider/>
            <Features/>
            <Categories/>
            <Products/>
            <Brands/>
        </Layout>
    );
};

export default Homepage;
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Layout from "../components/layout/Layout.jsx";
import Brands from "../components/product/Brands.jsx";
import CategoriesSkeleton from "../skeleton/Categories-Skeleton.jsx";
import ProductsSkeleton from "../skeleton/Products-Skeleton.jsx";
import { productStore } from "../store/ProductStore.js";
import Features from '../components/product/Features.jsx';
import {useFeatureStore} from "../store/FeatureStore.js";
import Slider from './../components/product/Slider';



const Homepage = () => {

    const {BrandListRequest,SliderListRequest} = productStore()
    const {FeatureListRequest} = useFeatureStore()
    useEffect(() => {
        (async () => {
            await FeatureListRequest()
            await BrandListRequest();
            await SliderListRequest();
        })()
    }, []);

    
    return (
        <Layout>
            <Slider/>
            <Features/>
            <CategoriesSkeleton/>
            <ProductsSkeleton/>
            <Brands/>
        </Layout>
    );
};

export default Homepage;
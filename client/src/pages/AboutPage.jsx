
import {useEffect} from 'react';
import LegalContents from '../components/features/LegalContents'
import Layout from '../components/layout/Layout'
import { useFeatureStore } from '../store/FeatureStore'
const AboutPage = () => {
    const {LegalDetailsRequest} = useFeatureStore()
    useEffect(()=>{
        (async ()=>{
            await LegalDetailsRequest('about')
        })()
    },[])
  return (
    <Layout>
        <LegalContents/>
    </Layout>
  )
}

export default AboutPage
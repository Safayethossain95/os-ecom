import {useFeatureStore} from "../store/FeatureStore.js";
import {useEffect} from "react";
import Layout from "../components/layout/Layout.jsx";
import LegalContents from "../components/features/LegalContents.jsx";


const TermsPage = () => {
  const {LegalDetailsRequest}=useFeatureStore();
  useEffect(() => {
    (async ()=>{
      await LegalDetailsRequest("terms")
    })()
  }, []);
  return (
      <Layout>
        <LegalContents/>
      </Layout>
  );
}

export default TermsPage
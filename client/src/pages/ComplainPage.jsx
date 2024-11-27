import {useFeatureStore} from "../store/FeatureStore.js";
import {useEffect} from "react";
import Layout from "../components/layout/Layout.jsx";
import LegalContents from "../components/features/LegalContents.jsx";

const ComplainPage = () => {
  const {LegalDetailsRequest}=useFeatureStore();
  useEffect(() => {
    (async ()=>{
      await LegalDetailsRequest("complain")
    })()
  }, []);
  return (
      <Layout>
        <LegalContents/>
      </Layout>
  );
}

export default ComplainPage
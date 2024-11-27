import {useFeatureStore} from "../store/FeatureStore.js";
import {useEffect} from "react";
import Layout from "../components/layout/Layout.jsx";
import LegalContents from "../components/features/LegalContents.jsx";

const ContactPage = () => {
  const {LegalDetailsRequest}=useFeatureStore();
  useEffect(() => {
    (async ()=>{
      await LegalDetailsRequest("contact")
    })()
  }, []);
  return (
      <Layout>
        <LegalContents/>
      </Layout>
  );
}

export default ContactPage
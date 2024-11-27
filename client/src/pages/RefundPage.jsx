import { useEffect } from "react";
import { useFeatureStore } from "../store/FeatureStore";
import Layout from "../components/layout/Layout";
import LegalContents from "../components/features/LegalContents";

const RefundPage = () => {
  const {LegalDetailsRequest}=useFeatureStore();
  useEffect(() => {
      (async ()=>{
          await LegalDetailsRequest("refund")
      })()
  }, []);
  return (
      <Layout>
          <LegalContents/>
      </Layout>
  );
}

export default RefundPage
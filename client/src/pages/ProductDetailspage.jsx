import { useParams } from "react-router-dom"
import Layout from "../components/layout/Layout"
import Details from "../components/product/Details"


const ProductDetailspage = () => {
  const {id} = useParams()
  console.log("productdetilsid",id)
  return (
    <>
    <Layout>
        <Details id={id}/>
    </Layout>
    </>
  )
}

export default ProductDetailspage
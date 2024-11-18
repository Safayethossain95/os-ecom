import { useParams } from "react-router-dom"
import Layout from "../components/layout/Layout"
import Details from "../components/product/Details"


const ProductDetailspage = () => {
  const {id} = useParams()
  return (
    <>
    <Layout>
        <Details id={id}/>
    </Layout>
    </>
  )
}

export default ProductDetailspage
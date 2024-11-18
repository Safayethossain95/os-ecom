
import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
const ProductImages = () => {
    const images = [
        {
            original:"https://i.ibb.co/5rKGFKb/detailsimg.png",
            thumbnail:"https://i.ibb.co/5rKGFKb/detailsimg.png"
        },
        {
            original:"https://i.ibb.co/5rKGFKb/detailsimg.png",
            thumbnail:"https://i.ibb.co/5rKGFKb/detailsimg.png"
        },
        {
            original:"https://i.ibb.co/5rKGFKb/detailsimg.png",
            thumbnail:"https://i.ibb.co/5rKGFKb/detailsimg.png"
        },
        {
            original:"https://i.ibb.co/5rKGFKb/detailsimg.png",
            thumbnail:"https://i.ibb.co/5rKGFKb/detailsimg.png"
        },
        {
            original:"https://i.ibb.co/5rKGFKb/detailsimg.png",
            thumbnail:"https://i.ibb.co/5rKGFKb/detailsimg.png"
        },
        {
            original:"https://i.ibb.co/5rKGFKb/detailsimg.png",
            thumbnail:"https://i.ibb.co/5rKGFKb/detailsimg.png"
        },
        {
            original:"https://i.ibb.co/5rKGFKb/detailsimg.png",
            thumbnail:"https://i.ibb.co/5rKGFKb/detailsimg.png"
        },
        {
            original:"https://i.ibb.co/5rKGFKb/detailsimg.png",
            thumbnail:"https://i.ibb.co/5rKGFKb/detailsimg.png"
        },
    ]
  return (
    <>
        <ImageGallery autoPlay={true} items={images}/>
    </>
  )
}

export default ProductImages
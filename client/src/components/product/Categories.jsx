import { Link } from "react-router-dom";
import { productStore } from "../../store/ProductStore";
import CategoriesSkeleton from "../../skeleton/Categories-Skeleton";

const Categories = () => {
   const {CategoryList} = productStore()
  return (
    <div>
      <div className="section">
        <div className="container">
          <div className="row">
            <h1 className="headline-4 text-center my-2 p-0">Top Categories</h1>
            <span className="bodySmal mb-5 text-center">
              Explore a World of Choices Across Our Most Popular <br />
              Shopping Categories{" "}
            </span>
            {
                CategoryList===null?
                    <CategoriesSkeleton/>
                :
                CategoryList.map((item,i)=>{
                    return(
            <div key={i} className="col-6 col-lg-8r text-center col-md-8r p-2">
              <Link to={`/by-category/${item._id}`} className="card h-100 rounded-3 bg-white">
                <div className="card-body">
                  <img alt="" className="w-100 mb-5" src="https://i.ibb.co.com/JpjBsc4/cat.png" />
                  <p className="bodySmal mt-3">{item.categoryName}</p>
                </div>
              </Link>
            </div>

                    )
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;

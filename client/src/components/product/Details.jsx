/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import { productStore } from "../../store/ProductStore";
import DetailsSkeleton from "../../skeleton/Details-Skeleton";
import ProductImages from './ProductImages';
import Reviews from './Reviews';

const Details = ({id}) => {
    const {Details,DetailsRequest,ReviewListRequest} = productStore()
    const [quantity,setQuantity] = useState(1)

    const incrementqty = ()=>{
        setQuantity(q=>q+1)
    }
    const decrementqty = ()=>{
        if(quantity>1){
            setQuantity(q=>q-1)

        }
    }

    useEffect(()=>{
        DetailsRequest(id)
        ReviewListRequest(id)
    },[id])

    if(Details===null){
        return (
            <>
            <DetailsSkeleton/>
            </>
    )
    }
    else{
        
        return (
          <>
            <div>
              <div className="container mt-2">
                <div className="row">
                  {
                      Details?.map((item,key)=>{
                          return (
                              <>
                              <div key={key} className="col-md-7 p-3">
                    <ProductImages/>
                  </div>
                  <div className="col-md-5 p-3">
                    <h4>{item.title}</h4>
                    <p className="text-muted bodySmal my-1">{item.category['categoryName']}</p>
                    <p className="text-muted bodySmal my-1">{item.brand['brandName']}</p>
                    <p className="bodySmal mb-2 mt-1">{item.shortDes}</p>
                    <h4>
                      <strike className="text-secondary">${item.price}</strike>{" "}
                      ${item.discountPrice}{" "}
                    </h4>
                    <div className="row">
                      <div className="col-4 p-2">
                        <label className="bodySmal">Size</label>
                        <select className="form-control my-2 form-select">
                        <option value="">Size</option>
                            {
                                item.details.size.split(",").map((item,i)=>{
                                    return(
                                        <>
                                         <option key={i} value={item}>{item}</option>
                                        </>
                                    )
                                })
                            }
                         
                        </select>
                      </div>
                      <div className="col-4  p-2">
                        <label className="bodySmal">Color</label>
                        <select className="form-control my-2 form-select">
                          <option value="">Color</option>
                          {
                                item.details.color.split(",").map((item,i)=>{
                                    return(
                                        <>
                                         <option key={i} value={item}>{item}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                      </div>
                      <div className="col-4  p-2">
                        <label className="bodySmal">Quantity</label>
                        <div className="input-group my-2">
                          <button className="btn btn-outline-secondary" onClick={decrementqty}>-</button>
                          <input
                          value={quantity}
                            type="text"
                            className="form-control bg-light text-center"
                            readOnly
                          />
                          <button className="btn btn-outline-secondary" onClick={incrementqty}>+</button>
                        </div>
                      </div>
                      <div className="col-4  p-2">
                        <button className="btn w-100 btn-success">Add to Cart</button>
                      </div>
                      <div className="col-4  p-2">
                        <button className="btn w-100 btn-success">Add to Wish</button>
                      </div>
                    </div>
                  </div>
                              </>
                          )
                      })
                  }
                  
                </div>
                <div className="row mt-3">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="Speci-tab" data-bs-toggle="tab" data-bs-target="#Speci-tab-pane" type="button" role="tab" aria-controls="Speci-tab-pane" aria-selected="true">Specifications</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="Review-tab" data-bs-toggle="tab" data-bs-target="#Review-tab-pane" type="button" role="tab" aria-controls="Review-tab-pane" aria-selected="false">Review</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="Speci-tab-pane" role="tabpanel" aria-labelledby="Speci-tab" tabIndex="0">
                                {
                                    parse(Details[0]['details']['des'])
                                }
                            </div>
                            <div className="tab-pane fade" id="Review-tab-pane" role="tabpanel" aria-labelledby="Review-tab" tabIndex="0">
                                <Reviews/>
                            </div>
                        </div>
                    </div>
              </div>
            </div>
          </>
        );
    }
};

export default Details;

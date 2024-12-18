/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { CartStore } from "../store/CartStore";
import CartSubmitButton from './../components/cart/CartSubmitButton';
import Layout from "../components/layout/Layout";

const CartPage = () => {

    let {CartList,CartListRequest,RemoveCartListRequest,CartTotal,
        CartVatTotal,
        CartPayableTotal,CreateInvoiceRequest} = CartStore()
    useEffect(() => {
        (async ()=>{
           await CartListRequest()
        })()
    }, []);
    useEffect(()=>{
        console.log(CartList)
    },[])

    const remove = async (cartID) => {
        await RemoveCartListRequest(cartID)
        await CartListRequest()
    }
  return (
    <Layout>

    <div className="container mt-3">
      <div className="row">
        <div className="col-md-12">
          <div className="card p-4">
            <ul className="list-group list-group-flush">
              {" "}
              {CartList?.map((item, i) => {
                
                 
                return (
                  <li
                  key={i}
                    className="list
                    group-item d-flex justify-content-between align-items-start mb-4"
                  >
                    {/* <img
                      className="rounded-1"
                      width="90"
                      height="auto"
                      src={item?.image}
                    /> */}
                    <div className="ms-2 me-auto">
                      <h4 className=" font-bold m-0">
                        {item.title}
                      </h4>
                      <p className="fw-lighter my-1">
                        Unit Price: {item.price},Qty: {item["qty"]}, Size:{" "}
                        {item["size"]}, Color: {item["color"]}
                      </p>
                      <p className=" h6 fw-bold m-0 text-dark">
                        Total <i className="bi bi-currency-dollar"></i>
                        {parseInt(item.price) * parseInt(item["qty"])}{" "}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(item["_id"])}
                      className="btn btn-sm btn-outline-danger"
                    >
                      {" "}
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                );
              })}{" "}
            </ul>
            <div className="my-4">
              <ul className="list-group bg-transparent  list-group-flush">
                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                  <span className="float-end">
                    Total: <i className="bi bi-currency-dollar" />
                    {CartTotal}{" "}
                  </span>
                </li>
                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                  <span className="float-end">
                    {" "}
                    Vat(5%): <i className="bi bi-currency-dollar" />
                    {CartVatTotal}
                  </span>
                </li>
                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                  <span className="float-end">
                    {" "}
                    Payable: <i className="bi bi-currency-dollar" />
                    {CartPayableTotal}
                  </span>
                </li>
                <li className="list-group-item bg-transparent ">
                  <span className="float-end">
                    <CartSubmitButton
                      text="Check Out "
                      onClick={async () => {
                        await CreateInvoiceRequest();
                      }}
                      className="btn px-5 mt-2 btn-success"
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default CartPage;

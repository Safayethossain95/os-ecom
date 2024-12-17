import { Link } from "react-router-dom";
import logo from "../../assets/images/plainb-logo.svg";
import { productStore } from "../../store/ProductStore";
import { UserStore } from "../../store/UserStore";
// import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserSubmitButton from './../user/UserSubmitButton';
import { useEffect } from "react";
import { CartStore } from "../../store/CartStore";
const AppNavBar = () => {
  const { SearchKeyword, SearchKeywordSet } = productStore();
  const {CartListRequest,CartCount}= CartStore()
  const navigate = useNavigate()
  const {isLogin,UserLogoutRequest} = UserStore();

  

  useEffect(() => {
    
    (async ()=>{
      console.log("login",isLogin)
        if(isLogin){
            await  CartListRequest();
            // await  WishListRequest();
        }
    })()
}, []);
  const handlelogout=async()=>{
    sessionStorage.clear();
    localStorage.clear();
    const res=await UserLogoutRequest()
    console.log(res)
    // window.location.href="/"
    navigate("/")
    toast.success("Logged out successfully")
  }
  return (
    <>
      <div className="container-fluid text-white p-2 bg-success">
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-md-6">
              <span>
                <span className="f-12">
                  <i className="bi bi-envelope"></i> Support@PlanB.com{" "}
                </span>
                <span className="f-12 mx-2">
                  <i className="bi bi-envelope"></i> 01774688159{" "}
                </span>
              </span>
            </div>
            <div className="col-md-6">
              <span className="float-end">
                <span className="bodySmal mx-2">
                  <i className="bi bi-whatsapp"></i>
                </span>
                <span className="bodySmal mx-2">
                  <i className="bi bi-youtube"></i>
                </span>
                <span className="bodySmal">
                  <i className="bi bi-facebook"></i>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar  sticky-top bg-white navbar-expand-lg navbar-light py-3">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img className="img-fluid" src={logo} alt="" width="96px" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav06"
            aria-controls="nav06"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav06">
            <ul className="navbar-nav mt-3 mt-lg-0 mb-3 mb-lg-0 ms-lg-3">
              <span className="nav-item me-4">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </span>
            </ul>
          </div>
          <div className=" d-lg-flex">
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={SearchKeyword}
                onChange={(e) => {
                  e.preventDefault();
                  SearchKeywordSet(e.target.value);
                }}
              />
              <Link
                to={
                  SearchKeyword !== null ? `/by-keyword/${SearchKeyword}` : `/`
                }
                className="btn btn-outline-dark"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{
                    width: 24,
                    height: 24,
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Link>
            </div>
            <Link
              to="/cart"
              type="button"
              className="btn ms-2 btn-light position-relative"
            >
              <i className="bi text-dark bi-bag"></i>

              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">{CartCount}</span>
              </Link>
            <Link
              to="/wish"
              type="button"
              className="btn ms-2 btn-light d-flex"
            >
              <i className="bi text-dark bi-heart"></i>
            </Link>
          
            {isLogin? (
              <UserSubmitButton
                type="button"
                className="btn ms-3 btn-success d-flex"
                text="Logout"
                onClick={handlelogout}
              />
               
            ) : (
              <Link
                type="button"
                className="btn ms-3 btn-success d-flex"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNavBar;

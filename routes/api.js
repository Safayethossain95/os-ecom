import express from "express";
const router = express.Router();


import * as UsersController from "../app/controllers/UsersController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";
import * as CartListController from "../app/controllers/CartListController.js";
import * as WishListController from "../app/controllers/WishListController.js";
import * as ProductController from "../app/controllers/ProductController.js";
import * as CategoryController from "../app/controllers/CategoryController.js";
import * as BrandController from "../app/controllers/BrandController.js";
import * as InvoiceController from "../app/controllers/InvoiceController.js";
import { fileUploadController } from "../app/controllers/FileUpload.js";
import {  uploadMiddleware } from "../app/middlewares/FileUpload.js";
import * as FeaturesController from "../app/controllers/FeaturesController.js";


// Users
router.post("/Login",UsersController.Login)
router.get("/logout",UsersController.Logout)
router.post("/Registration", UsersController.RegisterUser)
router.get('/recover-verify-email/:email',UsersController.UserOTP)
router.post("/recover-verify-otp/:email/:otp", UsersController.CodeVerify)
router.get("/istoken", UsersController.IsTokenthere)

router.get("/ProfileDetails",UsersController.ProfileDetails)
router.post("/ProfileUpdate",UsersController.ProfileUpdate)
router.post("/reset-password/:email/:otp" ,UsersController.ResetPassword)
router.post("/CreateProfile", AuthMiddleware,UsersController.CreateProfile)
router.post("/UpadateProfile",UsersController.UpdateProfile)
router.get("/ReadProfile", AuthMiddleware,UsersController.ReadProfile)

// WishList
router.post("/CreateWishList", AuthMiddleware,WishListController.CreateWish)
router.get("/ReadWishList", AuthMiddleware,WishListController.ReadWishList)
router.post("/UpdateWishList", AuthMiddleware,WishListController.UpdateWishList)
router.post("/RemoveWishList", AuthMiddleware,WishListController.RemoveWish)


// Categories
router.get("/CategoryList", CategoryController.CategoryList)


// Reviews
router.post("/CreateProductReview",ProductController.CreateProductReview)


//Cart 
router.post("/CreateCart",CartListController.CreateCart)
router.delete("/RemoveCart/:id",CartListController.RemoveCart)
router.get("/ReadCartList",CartListController.ReadCartList)
router.post("/UpdateCart",CartListController.UpdateCart)

// Wish

router.post("/CreateWish", WishListController.CreateWish)
router.post("/ReadWishList", WishListController.ReadWishList)
router.post("/RemoveWish", WishListController.RemoveWish)

// Product

router.get("/GetProducts", ProductController.GetProducts)
router.get("/ProductBrandList", ProductController.GetProductBrandList)
router.get("/ProductListBySlider",ProductController.ProductListBySlider)
router.post("/sliderpost",ProductController.sliderpost)
router.get("/ProductListByCategory/:CategoryID",ProductController.ProductListByCategory)
router.get("/ProductListByRemark/:Remark",ProductController.ProductListByRemark)
router.get("/ProductListByBrand/:BrandID",ProductController.ProductListByBrand)
router.get("/ProductDetailsID/:ProductID",ProductController.ProductDetailsID)
router.get("/ProductListByKeyword/:Keyword",ProductController.ProductListByKeyword)
router.post("/ProductListByFilter",ProductController.ProductListByFilter)
router.get("/ProductReviewList/:ProductID",ProductController.ProductReviewListByID)

// Brands

router.get("/BrandList",BrandController.BrandList)

//Invoice

router.post("/CreateInvoice",InvoiceController.CreateInvoice)
router.get("/ReadInvoiceList",InvoiceController.ReadInvoiceList)
router.get("/ReadInvoiceDetails",InvoiceController.ReadInvoiceDetails)
router.post("/upload", uploadMiddleware ,fileUploadController)

// Features
router.get('/FeaturesList',FeaturesController.FeaturesList)

//categories

router.get("/GetCategories", ProductController.GetCategories)

// legal details

router.get("/LegalDetails/:type", FeaturesController.LegalDetails)



export default router;



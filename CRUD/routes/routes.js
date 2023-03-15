const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const verifyToken = require("../middleware/middleware");
const cartController = require('../controllers/cartController');
const multer = require('multer');
const categoryController = require('../controllers/categoryController');
const orderController = require('../controllers/orderController')

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + file.originalname
    );
  },
});
const upload = multer({
  storage: storage
});



// a simple test url to check that all of our files are communicating correctly.
router.get('/getusers/:page?/:pageSize?', verifyToken, usersController.getUsers);
router.get('/getsingleuser/:id', verifyToken, usersController.getSingleUser);
router.post('/createuser', usersController.createUser);
router.post('/edituser/:id', verifyToken, usersController.updateUser);
router.get('/deleteuser/:id', verifyToken, usersController.deleteUser);
router.get('/searchuser/:key', usersController.searchUser);


// auth routes
router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);
router.get('/logout', authController.logout);

//category and sub-category routes
router.post('/createcategory', categoryController.createCategory)
router.post('/createsubcategory', categoryController.createSubCategory)
router.get('/getcategorys',categoryController.getCategorys)
router.get('/getsubcategorys', categoryController.getSubCategorys)

// product routes 
router.get('/getproduct/:id', productController.getSingleProduct);
router.post('/createproduct', upload.single('image'), productController.createProduct);
router.get('/shop/:page?/:pageSize?', productController.getProducts);
router.post('/editproduct/:id', upload.single('image'), productController.updateProduct);
router.get('/deleteProduct/:id', verifyToken, productController.deleteProduct);


// cart routes
router.post('/cart/addtocart', cartController.addToCart);
router.post('/cart/removefromcart', cartController.removeFromCart);
router.get("/cart/getcartitems/:id", cartController.getCartItems);

//checkout
router.post('/checkout',orderController.createOrder);

module.exports = router;
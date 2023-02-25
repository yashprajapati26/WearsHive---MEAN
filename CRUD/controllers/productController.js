const ProductModel = require("../models/product.model");
const mongoType = require('mongoose').Types;

const createProduct = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.file)

        let product = new ProductModel({
            title: req.body.title,
            price: req.body.price,
            qty: req.body.qty,
            category: req.body.category,
            image: {
                data: req.file.path,
                path: req.file.path,
                contentType: req.file.mimetype
            },
            detailUrl: req.body.detailUrl
        })
        console.log("product : ", product)

        await product.save();
        res.status(200).json({
            data: product,
            msg: "Product Added"
        })
    } catch (e) {
        console.log(e)
        res.status(400).json({
            msg: "Something is wrong !!"
        })
    }
}

const getProducts = async (req, res) => {
    try {
        // adding pagination 
        const limitValue = req.params.pageSize || 4;
        const skipValue = req.params.page || 0;

        console.log("L:S", limitValue, skipValue)

        let products = await ProductModel.find().limit(limitValue).skip(skipValue)
        let data = {
            products: products,
            totalData: products.length,
            "msg": "success"
        }
        console.log(data)
        res.status(200).json(data)

    } catch (e) {
        console.log(e);
        res.status(400).json({
            msg: "something is wrong"
        })
    }

}

const getSingleProduct = async (req, res) => {
    try {
        if (mongoType.ObjectId.isValid(req.params.id)) {
            product = await ProductModel.findById(req.params.id)
            let data = {
                product: product,
                status: "success"
            }
            res.status(200).json(data)
        } else {
            res.status(401).json({
                msg: "Id not valid"
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        let product = {
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
            detailUrl: req.body.detailUrl
        };

        if (mongoType.ObjectId.isValid(req.params.id)) {
            if (product.title != "" && product.price != "" && product.category != "" && product.detailUrl != "") {
                await ProductModel.findByIdAndUpdate(req.params.id, {
                    $set: product
                });
                res.status(200).json({
                    data: product,
                    msg: "Data Update Sucessfully",
                    status: "success"
                });
            } else {
                res.status(400).json({
                    data: product,
                    msg: "All field required",
                    status: "fail"
                });
            }
        } else {
            res.status(401).json({
                msg: "Id not valid"
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        if (mongoType.ObjectId.isValid(req.params.id)) {
            await ProductModel.findByIdAndRemove(req.params.id);

            res.status(200).json({
                msg: "Data Deleted Sucessfully",
                status: "success"
            });
        } else {
            res.status(401).json({
                msg: "Id not valid"
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}


module.exports = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}
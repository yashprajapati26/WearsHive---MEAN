const CategoryModel = require('../models/category.model')
const SubCatagoryModel = require('../models/subcategory.model')
const mongoType = require('mongoose').Types;

const createCategory = async(req,res)=>{
    try{
        let category = new CategoryModel({
            categoryName : req.body.categoryName
        })
        await category.save()
        res.status(200).json({msg:'category added sucessfully'})
    }
    catch(err){
        console.log(err)
        return res.json({msg:err})
    }
}

const createSubCategory = async(req,res)=>{
    try{
        if(mongoType.ObjectId.isValid(req.body.categoryId)){
            let subcategory = new SubCatagoryModel({
                CategoryId : req.body.categoryId,
                SubCategoryName : req.body.SubCategoryName
            })
            await subcategory.save()
            res.status(200).json({msg:'subcategory added sucessfully'})
        }
        else{
            res.json({msg:"invalid category id"})
        }
    }
    catch(err){
        console.log(err)
        return res.json({msg:"error"})
    }
}


const getCategorys = async(req,res)=>{
    try{
        categorys = await CategoryModel.find()
        return res.status(200).json({categorys:categorys})
    }
    catch(err){
        console.log(err)
        return res.json({msg:'something wrong'})
    }
}

const getSubCategorys = async(req,res)=>{
    try{
        subcategory = await SubCatagoryModel.find().populate('CategoryId')
        return res.status(200).json({subcategory:subcategory})
    }
    catch(err){
        console.log(err)
        return res.json({msg:"something wrong"})
    }
}



module.exports = {createCategory,createSubCategory, getCategorys, getSubCategorys}
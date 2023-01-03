const express=require('express');
const { addCategory, getCategories, getCategoryDetails, updateCategory, deleteCategory } = require('../controllers/categoryController');
const router=express.Router();
const {isAuthenticated,authorizeRoles}=require('../middleware/auth');


router.route('/categories')
        .post(addCategory)
        .get(getCategories);

router.route('/categories/:id')
       .get(getCategoryDetails)
       .put(updateCategory)
       .delete(deleteCategory);



module.exports=router;
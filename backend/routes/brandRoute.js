const express=require('express');
const { addBrand, getBrands, getBrandDetails, updateBrand, deleteBrand } = require('../controllers/brandController');

const {isAuthenticated, authorizeRoles}=require('../middleware/auth');

const router=express.Router();

router.route('/brands')

router.route('/brands')
        .post(isAuthenticated,authorizeRoles('admin'),addBrand)
        .get(getBrands);

router.route('/brands/:id')
        .get(getBrandDetails)
        .put(updateBrand)
        .delete(deleteBrand);



module.exports=router;
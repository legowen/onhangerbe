const Cart = require("../models/Cart");

const cartController = {};

cartController.addItemToCart = async(req,res)=>{
    try{
        const {userId} = req;
        const {productId, size, qty} = req.body
        // Find Cart with User 1.
        let cart = await Cart.findOne({userId})
        //if User has no Cart, Make Cart 2.
        // Check Product already exisst in the cart 3-1
        // If yes, Send Error 3-2, If no => 4
        
        // Add Item into Cart 4

    }catch(error){

    }
}


module.exports = cartController;

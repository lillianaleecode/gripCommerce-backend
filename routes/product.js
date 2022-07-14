const router = require("express").Router();
const Product = require("../models/Product");
const {verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken");

//post/create product
router.post("/", verifyTokenAndAdmin, async (req, res) => {

    const newProduct = new Product(req.body);
  
      try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
      } catch (err) {
        res.status(500).json(err);
      }
    });

//to update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try{
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id, { $set: req.body }, {new: true }
            );
        
        res.status(200).json(updateProduct);

    } catch(err){
        res.status(500).json(err);
    }
})

//delete product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product is deleted.");
    } catch (err) {
      res.status(500).json(err);
    }
});
  
module.exports = router
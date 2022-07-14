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
  
//GET Product (individual)
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET all the products
  //here it is slightly different from the other requests. as I want to get the products by the newest products or by category for example.
router.get("/", verifyTokenAndAdmin, async (req, res) => {

    const queryNew = req.query.new;
    const queryCategory = req.query.category;

    try {
        let products;

        if (queryNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (queryCategory) {
        products = await Product.find({
            categories: {
            $in: [queryCategory],
            }, //localhost:5000/api/product?category=tshirt will bring all the tshirts for example.
        });
        } else {
        products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
    });


module.exports = router
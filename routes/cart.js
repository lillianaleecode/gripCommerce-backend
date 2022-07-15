//cart route is similar to products. with the slight difference that anyone can create a cart, not only the admin.

const router = require("express").Router();
const Cart = require("../models/Cart");
const {verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin} = require("./verifyToken");

//create cart (POST)

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,{$set: req.body,},{ new: true });

    res.status(200).json(updatedCart);

  } catch (err) {
    res.status(500).json(err);
  }
});

//delete cart
router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart is deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
const express=require("express");
const Razorpay = require("razorpay");
const router=express.Router();


const rozerpay= new Rozerpay({
     key_id: process.env.RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_KEY_SECRET, 
})


router.post("/create-order",async(req,res)=>{

   try {

    const {amount}=req.body

    const option={
      amount: amount * 100, 
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order=await rozerpay.orders.create(option)
    res.json(order)
    
   } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Payment initiation failed" });
    
   }
});

module.exports = router;



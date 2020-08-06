var express = require("express");
var router = express.Router();
var Product = require("../models/product");


/* GET home page. */
router.get("/", function (req, res, next) {
  Product.find({ price: { $gte: 400 } },function (err, docs) {
    var productChunks=[];
    var chunkSize=3;
    for(var i=0;i<docs.length;i+=chunkSize){
      productChunks.push(docs.slice(i,i+chunkSize));
    }
    //var rOrders=Math.ceil[100+50*Math.random()];
    res.render("shop/index", { title: "Shopping Cart", products: productChunks});
  }).lean();
});


module.exports = router;

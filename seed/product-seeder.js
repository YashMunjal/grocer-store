var Product = require("../models/product");
var mongoose=require('mongoose');
const { exists } = require("../models/product");
var mockData=require('./mock-product.json');


mongoose.connect('mongodb+srv://yashmunjal:bosWrODJvytignp7@cluster0.6urhw.mongodb.net/shopping?retryWrites=true&w=majority',{
  useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
},(err)=>{
  if(!err)
    console.log("Mongo Connected");
})

//console.log(mockData[0].title);

var products = [];
mockData.forEach((i)=>{
  products.push(
  new Product({
    imagePath:
      i.imagePath,
    title: i.title,
    description: i.description,
    price: i.price,
    category:"Grocery"
  }));
})


var done=0;
for(var i=0;i<products.length;i++){
    products[i].save(function(err,result){
        done++;
        if(done==products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}


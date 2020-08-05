var Product = require("../models/product");
var mongoose=require('mongoose');
const { exists } = require("../models/product");

mongoose.connect('mongodb+srv://yashmunjal:bosWrODJvytignp7@cluster0.6urhw.mongodb.net/shopping?retryWrites=true&w=majority',{
  useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
},(err)=>{
  if(!err)
    console.log("Mongo Connected");
})


var products = [
  new Product({
    imagePath:
      "https://i.pinimg.com/originals/57/a2/8a/57a28a94f89428071426b15ae0e08c53.png",
    title: "Oranch Dressing",
    description: "Mayo Dressing by Oranch",
    price: "200",
  }),
  new Product({
    imagePath:
      "https://i.pinimg.com/originals/57/a2/8a/57a28a94f89428071426b15ae0e08c53.png",
    title: "Oranch Dressing",
    description: "Mayo Dressing by Oranch",
    price: "200",
  })
];

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


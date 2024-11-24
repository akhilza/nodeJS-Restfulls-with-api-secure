import express from "express";
import routes from "./src/routes/crmRoute";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000

// mongoDB Connection 

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.6bxdd.mongodb.net/",{
  useNewUrlParser: true
})



app.use((req, res, next) => {
     if(req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "JWT"){
      jwt.verify(req.headers.authorization.split(" ")[1], "RESTFULAPIs", (err, decode)=>{
            if(err) req.user = undefined;
            req.user = decode;
            next();

      })
     }else{
      req.user = undefined
      next()
     }
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

 routes(app)
app.get("/", (req, res)=>{
    res.send(" Hello World ")
})

app.listen(PORT, ()=>{
    console.log(`Hello ${PORT}`)
})
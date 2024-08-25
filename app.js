const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const db = require("./models/index")

//User Table DB
const Users = require("./models/Users")


// Make all variables from our .env file available in our process
// Use .env instead of .env.example when in development/production
dotenv.config(({path:'.env.example'}))

const port = process.env.APP_PORT || 8000
//Middleware and configs for request
app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}))
app.disable('x-powered-by');
app.use(cors());

//Route imports
const router = require("./routes/index");
//Database connection using mysql2 and sequelize
db.sequelize.sync().then(()=>{
    console.log("Synced Successfull with db.\n");
}).catch((error)=>{
    console.log("Database Error: " + error.message);
})

//All api route
app.use(router);


app.get('/',(req,res)=>{
    res.json({message:"First REST API Link Trial.."});
});

app.listen(port,()=>{
    console.log(`ExpressJS listening to port ${port}`);
});
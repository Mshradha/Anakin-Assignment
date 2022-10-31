const express=require("express")
const puppet=require('../ApproachByPe/puppeteer')
var cors = require('cors')
var app = express()
 
app.use(cors())
 

app.use(express.json())


app.get("/:city",async(req,res)=>{
      try {
          let data=await puppet(req.params.city)
        
          res.status(200).send(data)
      } 
      catch (error) {
          res.send(error)
      }
})

app.listen(3000,async()=>{
    try {
        console.log("listening on port 3000")
    } 
    catch (error) {
        console.log(error) 
    }
})
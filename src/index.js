import connectDB from "./db/index.js";

//require('dotenv').config({path: './env'})
import dotenv from 'dotenv'


dotenv.config({
  path: './env'
})



connectDB()










// First approch tp connecting the database
/*
import express from 'express'
const app = express()
;(async () => {        
  try {
     await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
     app.on("erroe" , (error)=>{
      console.log("ERROR :", error);
      throw error
     })

      app.listen(process.env.PORT, ()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
      })
  } catch (error) {
    console.log("Error:", error);
    throw error
  }
})()
*/
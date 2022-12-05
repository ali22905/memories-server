import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postsRoutes from './routes/posts.js'
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
// const DB_URL = "";



// connect to mongo data base
// the options make sure we don't get warnings in the console
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then( result => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  })
  .catch( err => {
    console.log(err);
  }); 



// app.get('/', (req, res) => {
//   res.redirect('')
// })



// middle ware



app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.use('/posts', postsRoutes)






/*
* snippets
sch : schema

*/














/*
* commands
- npm init
- npm body-parser install cors express mongoose nodemon 

*/
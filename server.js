const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const User = require('./models/User');
mongoose.connect('mongodb://192.168.9.111/userData')
const port=8000;
const app= express();

app.use(bodyParser.json());



app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

// CREATE
/*
estructura para crear:
{
  "newData": {
    "name": "Jim",
    "email": "jim@email.com",
    "password": "secretPassword"
  }
}
*/
//USO DEL SPREAD SYNTAX DE JS ...
//ANTES ERA 
/*
{
  name: req.body.newData.name,
  email: req.body.newData.email,
  password: req.body.newData.password
}
*/
app.post('/users',(req,res)=>{
  User.create(
    {
      ...req.body.newData
    },
    (err, data) => {
      sendResponse(res, err, data);
  })
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  User.findById(req.params.id,(err,data)=>{
    sendResponse(res, err, data);
  })
})
// UPDATE
.put((req,res)=>{
  User.findByIdAndUpdate(
    req.params.id,
    {
      name:req.body.newData.name,
      email:req.body.newData.email,
      password:req.body.newData.password
    },
    {
      new:true
    },
    (err,data)=>{
      sendResponse(res, err, data);
    }
  )
})
// DELETE
.delete((req,res)=>{
  User.findByIdAndDelete(
    req.params.id,
    (err,data)=>{
      sendResponse(res,err,data);
    }
  )
})
function sendResponse(res,err,data){
  if (err){
    res.json({
      success: false,
      message: err
    })
  } else if (!data){
    res.json({
      success: false,
      message: "Not Found"
    })
  } else {
    res.json({
      success: true,
      data: data
    })
  }
}
const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const User = require('./models/User');
mongoose.connect('mongodb://192.168.9.111/userData')
const port=8000;
const app= express();
const userRoute = require("./routes/user.route")
app.use(bodyParser.json());
app.use("/users",userRoute);
app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})
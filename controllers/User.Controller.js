const User = require("../models/User");
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
exports.create = function(req,res)
{
    User.create({
        ...req.body.newData
    },
    (err, data) => {
        sendResponse(res, err, data);
    })
    
}
exports.details = function(req,res)
{
    User.findById(req.params.id, (err, data) => {
        sendResponse(res, err, data);
    })
}
exports.update = function(req,res)
{
    User.findByIdAndUpdate(
        req.params.id, {
            name: req.body.newData.name,
            email: req.body.newData.email,
            password: req.body.newData.password
        }, {
            new: true
        },
        (err, data) => {
            sendResponse(res, err, data);
        }
    )
}
exports.delete = function(req,res)
{
    User.findByIdAndDelete(
        req.params.id,
        (err, data) => {
            sendResponse(res, err, data);
        }
    )
}
function sendResponse(res, err, data) {
    if (err) {
        res.json({
            success: false,
            message: err
        })
    } else if (!data) {
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
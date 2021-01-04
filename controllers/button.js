const Button = require('../models/button')
const {errorHandler} = require("../helpers/dbErrorHandler");

exports.create = (req, res) => {
    Button.find()
        .exec((err, button) => {
            if (err) {
                return res.status(400).json({
                    error: "Buttons not found"
                });
            }
            if (button.length == 0) {
                if (req.body.status) {
                    const button = new Button(req.body);
                    button.save((err) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
           
                res.json({
                    button
                });
               

    
        });
                
                }else{
                    res.json({message: "DEBE ENVIAR EL STATUS"});

                }
         
            }else{
                res.json({message: "El botón ya fue creado una vez, esta sentencia solo se ejecuta una vez"})
            }
            
        });

    
       

};

exports.update = (req, res) =>{
    if(req.body.status == true || req.body.status == false){
    Button.find()
        .exec((err, button) => {
            if (err) {
                return res.status(400).json({
                    error: "Buttons not found"
                });
            }
            
              let  id=button[0]._id;
              
               Button.findOneAndUpdate({_id: id},{$set: {status: req.body.status}},{new: true}, (err, button) => {
                if(err) return res.status(400).json({error: "You're not authorized to perform this action"+err});
                
                res.json(button);
            });
    
            
        });
         
    }else{
        res.json({message: "DEBE ENVIAR EL STATUS con true o false"});
    }

};

exports.status = (req, res) =>{
    Button.find()
    .exec((err, button) => {
        if (err) {
            return res.status(400).json({
                error: "Buttons not found"
            });
        }
        res.json(button);
    });

};
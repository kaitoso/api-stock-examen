//imports libraries
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//routes import
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const saleRoutes = require("./routes/sale");
const buttonRoutes = require("./routes/button");

//app express
const app= express();

//db
const db= async() =>{
try {
     const success = await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    
    }).then(()=>{
        console.log("DB conected.");
    }).catch(()=>{
        console.log("An error has ocurred");
    });


} catch (error) {

    console.log('DB Connection Error', error);
    
}
};

db();


// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            version: "1.0.0",
            title: "Aplicación de stock con botón de apertura y cierre en tiempo real",
            description: "Aplicación de stock y horarios en tiempo real",
            contact: {
                name: "Carlos valenzuela"
            },
            servers: ["http://localhost:8000"]
        }
    },
    // definition the apis with swagger 
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//routes middlewares
app.use("/api",buttonRoutes)
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", saleRoutes);

//port
const port = process.env.PORT || 8000;

//listen port
 const server = app.listen(port, ()=>{
    console.log(`App connected on port ${port}`);
});
const io = require("socket.io").listen(server);
// Assign socket object to every request
app.use(function (req, res, next) {
    req.io = io;
    next();
  });
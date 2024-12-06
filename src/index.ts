import dotenv from "dotenv"
dotenv.config();
import express from "express";
import envVars from "./validations/env-validation";


const app = express();
const PORT = envVars.APP_PORT || 3600;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
})
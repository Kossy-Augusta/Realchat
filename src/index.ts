import dotenv from "dotenv"
dotenv.config();
import express from "express";
import envVars from "./validations/env-validation";
import authRoute from "./routes/auth.routes"
import messageRoute from "./routes/message-routes"
import chatRoute from "./routes/chat.routes";


const app = express();
const PORT = envVars.APP_PORT || 3700;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/v1', authRoute);
app.use('/v1', messageRoute);
app.use('/v1', chatRoute);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
})
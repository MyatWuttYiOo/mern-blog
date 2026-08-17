import express,{Application,Request,Response,NextFunction} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT 
const MONGO_URL = process.env.MONGO_URL;

//Middlewares
app.use(cors());
app.use(express.json());

app.get('/',(req : Request,res: Response) => {
    res.send('Blog API')

})

//API routes
app.use('/api/posts',postRoutes);
app.use('/api/users',userRoutes)

//Global error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

mongoose.connect(MONGO_URL as string)
.then(() => {
    console.log("Connected to db");
    app.listen(PORT,()=>{
    console.log('Server is running in port 4000');
});
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
})


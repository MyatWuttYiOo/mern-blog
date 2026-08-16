import express,{Application,Request,Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from "dotenv";


const app: Application = express();
const PORT = process.env.PORT || 4000;
const MONGO_URL = "mongodb+srv://myatwuttyioo:test1234@mern-cluster.uzaptsp.mongodb.net/blogDB?appName=MERN-Cluster";



//Middlewares
app.use(cors());
app.use(express.json());

app.get('/',(req : Request,res: Response) => {
    res.send('Blog API')

})

//API routes
app.use('/api/posts',postRoutes);
app.use('/api/users',userRoutes)

mongoose.connect(MONGO_URL)
.then(() => {
    console.log("Connected to db");
    app.listen(4000,()=>{
    console.log('Server is running in port 4000');
});
})
.catch((err) => {
    console.error("MongoDB connection error:", err);
})


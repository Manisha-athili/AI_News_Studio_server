
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import newsRoutes from "./routes/NewsRoutes.js";
import aiRoutes from "./routes/aiRoutes.js"

dotenv.config();
import connectDB from "./config/db.js";

const app = express();
const Port = process.env.PORT;


//middleware
app.use(cors({
  origin: [
    "https://ai-news-studio-client.onrender.com",   // Your frontend URL
    "http://localhost:3000",                        // For local development
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


app.use("/api/news",newsRoutes)
app.use("/api/ai",aiRoutes)

app.get("/",(req,res)=>{
    res.json(
        {
            message:"AI News to Social Content Studio API is Running"
        }
    )
})


const startServer = async() =>{
    await connectDB();
    app.listen(Port, ()=>{
        console.log(`Server running on http://localhost:${Port}`)
    })
}

startServer()

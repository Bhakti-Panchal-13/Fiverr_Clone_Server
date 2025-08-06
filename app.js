import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";

const app =  express();
app.use(express.json());
app.use(express.json());
app.use(cookieParser());
dotenv.config();

const port = process.env.PORT;
const mongo_db_url = process.env.MONGO_DB_URL;
 
const connect = async()=>{
try{
    await mongoose.connect(mongo_db_url)
  .then(() => console.log('App is connected to Database'));
}catch(e){
    console.log("Error connecting Databse : " , e);
}
}
// app.use("/",(req,res)=>{
//     res.send("app is working properly")
// })
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});






app.listen(port,()=>{
    connect();
    console.log(`app is listening on ${port}`)
})

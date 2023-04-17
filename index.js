import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from "./db.js";
import CategoryRouter from "./Routes/CategoriesRoute.js";
import UserRouter from "./Routes/UserRoute.js";
import productRouters from "./Routes/ProductRoute.js";
import bodyParser from "body-parser";


dotenv.config();

await connectDB();

const PORT = process.env.PORT || 5000;

const app = new express();

if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"));
}

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.send('API is running...')
})



app.use("/api/category", CategoryRouter);
app.use("/api/user", UserRouter);
app.use("/api/product", productRouters);


app.use("/uploads", express.static("./uploads"));

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`))


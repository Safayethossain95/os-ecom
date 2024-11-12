import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from 'url';

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {
  DATABASE,
  MAX_JSON_SIZE,
  PORT,
  REQUEST_NUMBER,
  REQUEST_TIME,
  URL_ENCODE,
  WEB_CACHE,
} from "./app/config/config.js";
import router from "./routes/api.js";

const app = express();

// App Use Default Middleware
app.use(cors());
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: URL_ENCODE }));
app.use(helmet());

// App Use Limiter
const limiter = rateLimit({ windowMs: REQUEST_TIME, max: REQUEST_NUMBER });
app.use(limiter);

// Cache
app.set("etag", WEB_CACHE);

// Database Connect
const URI = 'mongodb://127.0.0.1:27017/osecom';

// // Connect to MongoDB
// mongoose.connect(uri, {
//   autoIndex: true
// }).then(() => {
//   console.log('MongoDB connected successfully');
// }).catch((error) => {
//   console.error('Error connecting to MongoDB:', error);
// });

//let URL="mongodb://localhost:27017/ecom4"
//let option={user:'',pass:"",autoIndex:true};
mongoose.connect(URI).then((res)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})

app.get("/", (req, res) => {
  res.send("E-commerce API");
});

app.use("/api", router);
app.use(express.static('client/dist'));

// Add React Front End Routing
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})

app.listen(PORT, () => {
  console.log("Server started on my port " + PORT);
});

import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/auth.js"
import { register } from "./controller/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { createPost } from "./controller/posts.js";
import { verifyToken } from "./middleware/auth.js"
import User from "./model/User.js"
import Post from "./model/Post.js"
import {users, posts} from "./data/index.js"



const __fileName = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__fileName)

dotenv.config()
const app=express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Fix 'extented' typo
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Fix 'extented' typo
app.use(cors())
app.use("/assets", express.static(path.join ( __dirName, "public/assets" )))


const storage = multer.diskStorage ({
    destination: function(req, file, cb ){
        cb(null,  "public/uploads")
    },
    filename: function(req, file, cb){
        cb(null,  file.originalname)
    }
})

const upload = multer ({ storage })

/* Route With Path*/

app.post("/auth/register", upload.single("picture"),  register )
app.post("/posts", verifyToken, upload.single("picture"), createPost)

/* Routes with files*/

app.use("/auth", authRoutes)
app.use("/users", userRoutes )
app.use("/posts", postRoutes )


/* MONGOOSE SETUP*/

const PORT = process.env.PORT || 6001



mongoose.connect(process.env.MONGODB_URI , {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
     app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

     /*Update data */
    //  User.insertMany(users)
    //  Post.insertMany(posts)
    })
.catch((error) => console.log(` ${error} did not connect `))


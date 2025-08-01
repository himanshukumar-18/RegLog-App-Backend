import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(cookieParser())


//routing
import userRouter from "./routes/user.router.js";

app.use("/api/v1/users", userRouter)

export { app }
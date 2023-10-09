import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import connect from "./database/conn.js"
import router from "./router/route.js"

/** Setup app express and read .env */
const app = express()
dotenv.config()

/** Middlewares */
app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))
app.disable("x-powered-by")

/** API Route */
app.use("/api", router)

/** Setup PORT */
const port = process.env.PORT || 8080

/** Start server when connected to DB */
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server run in port http://localhost:${port}`)
      })
    } catch (error) {
      console.log("Error when connect Server")
    }
  })
  .catch((error) => {
    console.log("Error when connect Database")
  })

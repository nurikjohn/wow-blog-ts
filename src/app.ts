import express, { Request, Response } from "express"
import cors from "cors"
import routes from "./routes/index"
import { ErrorController } from "./controllers/error"

const app = express()
const errorController = new ErrorController()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.get("/status", (req: Request, res: Response) => {
    res.json({
        stauts: "OK"
    })
})

app.use(errorController.hanle)

export default app

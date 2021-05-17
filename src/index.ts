import app from "./app"
import DB from "./core/db"
import config from "./config/config"
import { logger } from "./config/logger"

;(async function () {
    try {
        const db = new DB()
        db.connect()

        app.listen(config.HttpPort, () => {
            logger.info(`INDEX: Server is running on port: ${config.HttpPort}`)
        })

        logger.info("INDEX: Database connection initialized.")
    } catch (e) {
        throw new Error(`DB connection error: ${e}`)
    }
})()

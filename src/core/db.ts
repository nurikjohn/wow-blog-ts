import mongoose from "mongoose"
import { logger } from "../config/logger"
import config from "../config/config"

const db = mongoose.connection
db.on("error", () => {
    logger.error("DB: mongo db connection is not open")
    logger.info("DB: killing myself so that container restarts")
})

db.once("open", () => {
    logger.info("DB: mongo db connection is established")
})

interface mongoDBInfo {
    host: string
    username: string
    port: number
    password: string
    database: string
}

function getMongoDBUrl(auth: boolean, dbInfo?: mongoDBInfo): string {
    let url: string
    if (auth) {
        return `mongodb://localhost:27017/${config.MongoDatabase}`
    }

    url =
        "mongodb://" +
        config.MongoUser +
        ":" +
        config.MongoPassword +
        "@" +
        config.MongoHost +
        ":" +
        config.MongoPort.toString() +
        "/" +
        config.MongoDatabase

    return url
}
export default class Database {
    url: string = getMongoDBUrl(false, {
        database: config.MongoDatabase,
        host: config.MongoHost,
        password: config.MongoPassword,
        port: config.MongoPort,
        username: config.MongoUser
    })

    constructor() {
        if (config.MongoAuthDisable) {
            this.url = getMongoDBUrl(config.MongoAuthDisable)
        }

        logger.info(`DB: DATABASE URL: ${this.url}`)
    }

    connect() {
        return mongoose.connect(
            this.url,
            {
                autoIndex: false,
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000
            },
            (error) => {
                if (error) {
                    logger.error("DB: MongoDB Connection error:", error)
                    process.exit(1)
                }
            }
        )
    }
}

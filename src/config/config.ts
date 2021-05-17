import dotenv from "dotenv"

dotenv.config()

interface Config {
    HttpPort: string
    MongoHost: string
    MongoPort: number
    MongoDatabase: string
    MongoPassword: string
    MongoUser: string
    MongoAuthDisable: boolean
    JWTSecret: string
    NodeEnv: string
}

let config: Config = {
    HttpPort: getConf("HTTP_PORT", "3000"),
    MongoHost: getConf("MONGO_HOST", "localhost"),
    MongoPort: parseInt(getConf("MONGO_PORT", "27017")),
    MongoDatabase: getConf("MONGO_DATABASE", "sample_project"),
    MongoPassword: getConf("MONGO_PASSWORD", ""),
    MongoUser: getConf("MONGO_USER", ""),
    MongoAuthDisable: true,
    JWTSecret: getConf("JWT_SECRET", "jwt-secret"),
    NodeEnv: getConf("NODE_ENV", "development")
}

function getConf(name: string, def: string = ""): string {
    if (process.env[name]) {
        return process.env[name] || ""
    }

    return def
}

export default config

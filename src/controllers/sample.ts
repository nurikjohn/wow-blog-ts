import { NextFunction, Request, Response } from "express"
import { logger } from "../config/logger"
import { storage } from "../storage/main"

export class SampleController {
    async create(req: Request, res: Response, next: NextFunction) {}

    async update(req: Request, res: Response, next: NextFunction) {}

    async find(req: Request, res: Response, next: NextFunction) {
        throw new Error("not implemented yet")
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            let lang = req.query.lang?.toString() || "ru"
            let slug = req.params.slug
            const dbRes = await storage.user.get(slug, lang)
            return res.status(200).send(dbRes)
        } catch (error) {
            logger.error(error.message, {
                function: "controller.sample.get",
                error: error
            })

            return res.status(500).send({ error: error.message })
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {}
}

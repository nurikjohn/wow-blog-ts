import bcrypt from "bcryptjs"
import { UserRepo, IUserAllResponse } from "../repo/sample"
import User, { IUser } from "../../models/User"
import { findAllQuery } from "../../types/querymodel"
import { logger } from "../../config/logger"
import AppError from "../../utils/appError"

export class UserStorage implements UserRepo {
    private scope = "storage.sample"
    async create(payload: IUser): Promise<IUser> {
        try {
            let dbObj = await User.create(payload)

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.get: finished with error: ${error.message}`)
            throw error
        }
    }

    async update(slug: string, payload: IUser): Promise<string> {
        return ""
    }

    async delete(slug: string): Promise<any> {}

    async findAll(query: findAllQuery): Promise<IUserAllResponse> {
        throw new Error("not implemented yet")
    }

    async findOne(query: Object): Promise<IUser> {
        try {
            let dbObj = await User.findOne({ ...query })

            if (!dbObj) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, "Db object is not found")
            }

            return dbObj
        } catch (error) {
            logger.error(`${this.scope}.get: finished with error: ${error.message}`)
            throw error
        }
    }

    async comparePassword(candidatePassword: string, userPassword: string): Promise<Boolean> {
        return await bcrypt.compare(candidatePassword, userPassword)
    }
}

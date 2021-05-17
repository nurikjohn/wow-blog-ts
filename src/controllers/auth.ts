import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import config from "../config/config"
import { storage } from "../storage/main"
import AppError from "../utils/appError"
import catchAsync from "../utils/catchAsync"

export class AuthController {
    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        let { email, password } = req.body

        let user = await storage.user.findOne({ email })

        if (!storage.user.comparePassword(password, user.password))
            throw new Error("Password is incorrect!")

        let token = await jwt.sign(
            {
                id: user._id
            },
            config.JWTSecret
        )

        res.send({
            token: token
        })
    })

    signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        let user = await storage.user.create(req.body)

        let token = await jwt.sign(
            {
                id: user._id
            },
            config.JWTSecret
        )

        res.send({
            token: token
        })
    })
}

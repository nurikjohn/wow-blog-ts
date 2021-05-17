import Joi from "joi"
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"

export class AuthValidator {
    loginSchema = Joi.object({
        email: Joi.string()
            .email()
            .required()
            .error(new Error("Email is incorrect. Please check it!")),
        password: Joi.string()
            .required()
            .error(new Error("Password is incorrect. Please check it!"))
    })

    signupSchema = Joi.object({
        firstname: Joi.string()
            .required()
            .error(new Error("Firstname is incorrect. Please check it!")),
        lastname: Joi.string()
            .required()
            .error(new Error("Lastname is incorrect. Please check it!")),
        email: Joi.string()
            .email()
            .required()
            .error(new Error("Email is incorrect. Please check it!")),
        password: Joi.string()
            .required()
            .error(new Error("Password is incorrect. Please check it!"))
    })

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.loginSchema.validate(req.body)
        if (error) return next(error)

        next()
    })

    signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { error } = this.signupSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}

class AppError extends Error {
    constructor(statusCode: number, message: string) {
        super(message)

        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"

        Error.captureStackTrace(this, this.constructor)
    }

    statusCode = 500
    status = "error"
    isOperational = true
}

export default AppError

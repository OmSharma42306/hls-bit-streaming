import dotenv from "dotenv"
dotenv.config()

export const JWT_SECRET : string | any = process.env.JWT_SECRET;
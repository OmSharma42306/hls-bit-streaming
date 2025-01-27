import z from "zod"

export const signUpInput = z.object({
name:z.string(),
email : z.string().email(),
password : z.string().min(8)    
});

export const signInInput = z.object({
    email : z.string().email(),
    password : z.string().min(8)
})

export const createRoomInput = z.object({
    roomName : z.string()
})
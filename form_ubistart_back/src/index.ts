import express, { Request, Response } from 'express'
import cors from "cors"


import { UserController } from './controller/UserController'



const app = express()
app.use(express.json())
app.use(cors())

const controller = new UserController()

app.get("/user", controller.getUser)
app.post("/user", controller.createUser)
app.put("/user/:id", controller.updateUser)




app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");

})
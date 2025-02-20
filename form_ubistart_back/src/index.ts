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

// ___________________________________________________________

// app.put('/user/:id', async (req: Request, res: Response) => {

//     try {

//         //CONTROLLER


//         const idToEdit = req.params.id

//         const newName = req.body.name as string | undefined
//         const newEmail = req.body.email as string | undefined
//         const newCep = req.body.cep as string | undefined



//         const [user] = await db.select("*").from("user").where({ id: idToEdit })
//         if (user) {


//             await db.update({
//                 name: newName || user.name,
//                 email: newEmail || user.email,
//                 user_cep: newCep || user.user_cep
//             }).from("user").where({ id: idToEdit })

//         } else {
//             res.status(404)
//             throw new Error("'id' não encontrada")
//         }

        

//         res.status(200).send("Atualização realizada com sucesso")
//     } catch (error: any) {
//         console.log(error)

//         if (res.statusCode === 200) {
//             res.status(500)
//         }
//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }

// })




app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");

})
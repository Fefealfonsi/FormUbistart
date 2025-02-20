import { UserBusiness } from "../business/UserBusiness"
import { Request, Response } from "express"
import { CreateUserDB } from "../Interfaces/types"
export class UserController {

    getUser = async (req: Request, res: Response) => {
        try {
            const business = new UserBusiness()

            const result = await business.getUser()

            res.status(200).send(result)

        } catch (error: any) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
    createUser = async (req: Request, res: Response) => {
        try {

            const { name, email, user_cep } = req.body
            const input: CreateUserDB = {
                name: name,
                email: email,
                user_cep: user_cep
            }
            const business = new UserBusiness()

            await business.createUser(input)

            res.status(200).send("Usuário cadastrado com sucesso")

        } catch (error: any) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {

            const idToEdit = req.params.id
            const input: CreateUserDB | undefined = {

                name: req.body.name,
                email: req.body.email, 
                user_cep: req.body.cep
            }


            const business = new UserBusiness()

            const result = await business.updateUser(input, idToEdit)

            res.status(200).send("Seus dados foram atualizados")

        } catch (error: any) {
            console.log(error)

            if (res.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }


}
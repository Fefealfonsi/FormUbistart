import express, { Request, Response } from 'express'
import cors from "cors"
import { db } from "./database/knex"
import axios from 'axios'


export type User = {
    id: string,
    name: string,
    email: string,
    user_cep: string,
}
export type Address = {
    cep: string,
    state: string,
    city: string,
    neighborhood: string,
    street: string,
    service: string
}

const app = express()
app.use(express.json())
app.use(cors())


app.post('/user', async (req: Request, res: Response) => {
    try {
        const id = String(Date.now())
        const { name, email, user_cep } = req.body

        if (!name.match(/^([áàâãéèêíïóôõöúçñ ]|[a-z]\p{M}?)+$/iu)) {
            throw new Error("Nome deve conter apenas letras, verifique!")
        }
        if (!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi)) {
            throw new Error("O formato do email não é valido")
        }
        if (isNaN(user_cep)) {
            throw new Error("Verifique se há apenas números no seu cep")
        }
        if (user_cep.length !== 8) {
            throw new Error("Cep deve ter 8 números")
        }

        const users = await db.select("*").from("user")
        for (const user of users) {
            if (email === user.email) {
                throw new Error("email já foi cadastrado")
            }
        }

        const cepVerify: Address = await axios.get(`https://brasilapi.com.br/api/cep/v1/${user_cep}`)
            .then((res) => { return res.data })
            .catch((err) => { throw new Error("Cep não encontrado") })

        const addresses = await db.select("*").from("address")

        const addressExiste = addresses.find((address: Address) => address.cep === cepVerify.cep)


        !addressExiste && await db.insert({
            cep: cepVerify.cep,
            state: cepVerify.state,
            city: cepVerify.city,
            neighborhood: cepVerify.neighborhood,
            street: cepVerify.street,
            service: cepVerify.service
        }).into("address")

        const newUser: User = {
            id: id,
            name: name,
            email: email,
            user_cep: user_cep
        }
        await db.insert(
            newUser
        ).into("user")


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

})
app.get('/user', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
        SELECT * FROM address 
        INNER JOIN user
        ON user.user_cep = address.cep;
    `)

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
})

app.put('/user/:id', async (req: Request, res: Response) => {

    try {


        const idToEdit = req.params.id

        const newName = req.body.name as string | undefined
        const newEmail = req.body.email as string | undefined
        const newCep = req.body.cep as string | undefined



        const [user] = await db.select("*").from("user").where({ id: idToEdit })
        if (user) {


            await db.update({
                name: newName || user.name,
                email: newEmail || user.email,
                user_cep: newCep || user.user_cep
            }).from("user").where({ id: idToEdit })

        } else {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        // testar logiga de Update 

        res.status(200).send("Atualização realizada com sucesso")
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

})




app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");

})
import Fastify from "fastify";
import cors from '@fastify/cors';
import { routes } from "./routes";

const app = Fastify({ logger:true })

const port = process.env.PORT || 3333;

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({message: error.message})
})

const start = async () => {

    await app.register(cors);
    await app.register(routes);
    try{
        await app.listen(port, () => {
              console.log(`Example app listening on port ${port}`)
            }
        )
    }catch(err){
        process.exit(1)
    }
}


start();

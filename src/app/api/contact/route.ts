import axios from "axios";
import { NextResponse } from "next/server"
import { z } from "zod";


const bodySchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  mensagem: z.string()
});



const WENHOOK_URL = process.env.WEBHOOK_URL!

export async function POST(request:Request) {
  /* try { */
    const body = await request.json();
    const {nome, email, mensagem} = bodySchema.parse(body)
    const messageData =   {

      "embeds": [
        {
          
          "title": "Mensagem de Contacto",
          "color": 2326507,
          "fields": [
            {
             
              "name": "Nome",
              "value": nome,
              "inline": true
            },
            {
             
              "name": "E-mail",
              "value": email,
              "inline": true
            },
            {
              
              "name": "Mensagem",
              "value": mensagem
            }
          ]
        }
      ]
    }

    await axios.post(WENHOOK_URL, messageData)
    return NextResponse.json({
      message: "Mensagem enviada com sucesso!"
    })

  /* } catch (error) {
    console.log(error)
    return NextResponse.error()
  } */
}
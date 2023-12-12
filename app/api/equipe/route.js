//importe dos itens necessários
import axios from "axios";

import { NextResponse } from "next/server";

//chamada base url para API
const url = process.env.BASE_URL + "/equipe";

//exporte na função GET
export async function GET() {
  try {
    const resposta = await axios.get(url);

//retornar dados
    return NextResponse.json(resposta.data);
  } catch (error) {
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}

//exporte na função POST
export async function POST(request) {
  const params = await request.json();

  try {
    const resposta = await axios.post(url, params);

//retornar dados
    return NextResponse.json(resposta.data);
  } catch (error) {
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}
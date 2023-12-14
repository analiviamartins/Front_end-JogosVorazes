////importe dos itens necessários
import axios from "axios";

import { NextResponse } from "next/server";

//definindo a URL base
const url = process.env.BASE_URL + "/equipe";

//definindo uma função assíncrona para o método GET
export async function GET() {
  try {
    const response = await axios.get(url);

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}

//definindo uma função assíncrona para o método POST
export async function POST(request) {
  const params = await request.json();

  try {
    //fazendo uma solicitação POST
    const resposta = await axios.post(url, params);

    //retornando dados
    return NextResponse.json(resposta.data);
  } catch (error) {
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}
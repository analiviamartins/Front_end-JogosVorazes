//importe dos itens necessários
import axios from "axios";

import { NextResponse } from "next/server";

//definindo a URL base para a API
const url = process.env.BASE_URL  + "/equipe";

//definindo uma função assíncrona para o método GET
export async function GET(request, { params }) {
  const { id } = params;

  try {
    //fazendo uma solicitação GET 
    const response = await axios.get(`${url}/${id}`);

    //retornando dados
    return NextResponse.json(response.data);
  } catch (error) {
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}

//definindo uma função assíncrona para o método PUT
export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  try {
    //fazendo solicitação PUT
    const response = await axios.put(`${url}/${id}`, body);

    //retornando dados
    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[ORDER_PUT]", error);
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}

//definindo uma função assíncrona para o método DELETE
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    //fazendo solicitação DELETE
    const response = await axios.delete(`${url}/${id}`);

    //retornando dados
    return NextResponse.json(response.data);
  } catch (error) {
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}
//importe dos itens necessários
import axios from "axios";

import { NextResponse } from "next/server";

//chamada  base url para API
const url = process.env.BASE_URL  + "/equipe";

//definir função GET
export async function GET(request, { params }) {
  //puxar id do parametro
  const { id } = params;

  //fazer uma requisição do get para a API
  try {
    const response = await axios.get(`${url}/${id}`);

    //retornar dados
    return NextResponse.json(response.data);
  } catch (error) {
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}

//definir funçao PUT
export async function PUT(request, { params }) {
  //puxar id do parametro e do body
  const { id } = params;
  const body = await request.json();

//fazer uma requisição do PUT
  try {
    const response = await axios.put(`${url}/${id}`, body);

//retornar dados
    return NextResponse.json(response.data);
  } catch (error) {
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}

//definir funçao DELETE
export async function DELETE(request, { params }) {
  //puxar id do parametro
  const { id } = params;
  try {
    const response = await axios.delete(`${url}/${id}`);

  //retornar dados
    return NextResponse.json(response.data);
  } catch (error) {
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}
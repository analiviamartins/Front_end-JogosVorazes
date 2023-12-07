import axios from "axios"

import { NextResponse } from "next/server";

const url = process.env.BASE_URL + "/vorazes";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const resposta = await axios.get(`${url}/${id}`);

    return NextResponse.json(resposta.data);
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}

export async function POST(request, { params }) {
  const { id } = params;
  const body = await request.json();

  try {
    const resposta = await axios.post(`${url}/${id}`, body);

    return NextResponse.json(resposta.data);
  } catch (error) {
    console.log("[ORDER_POST]", error);
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}

export async function DELETE (request, { params }) {
  const { id } = params;

  try {
    const resposta = await axios.delete(`${url}/${id}`);

    return NextResponse.json(resposta.data);
  } catch (error) {
    console.log("[ORDER_DELETE]", error);
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}



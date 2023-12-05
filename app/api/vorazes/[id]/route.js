import axios from "axios";

import { NextResponse } from "next/server";

const url = process.env.BASE_URL;

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const response = await axios.get(`${url}/${id}`);

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  try {
    const response = await axios.put(`${url}/${id}`, body);

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[ORDER_PUT]", error);
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const response = await axios.delete(`${url}/${id}`);

    return NextResponse.json(response.data);
  } catch (error) {
    if (error.response) {
      console.log("[ORDER_DELETE]", error.response.data);
      console.log("[ORDER_DELETE]", error.response.status);
      console.log("[ORDER_DELETE]", error.response.headers);
    } else if (error.request) {
      console.log("[ORDER_DELETE]", error.request);
    } else {
      console.log("[ORDER_DELETE]", error.message);
    }
    console.log("[ORDER_DELETE]", error.config);
     return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}
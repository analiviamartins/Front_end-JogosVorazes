import axios from "axios"

import { NextResponse } from "next/server";

const url = process.env.BASE_URL + "/vorazes";

export async function GET(request) {
  const { searchParams } =  new URL(request.url);
  const nome = searchParams.get("nome");
  const distrito = searchParams.get("distrito");
  const profissao = searchParams.get("profissao");

  try {
    if(nome || distrito || profissao){
      const nomeCondicao = nome == undefined || nome == null ? '' : `nome=${nome}`
      const distritoCondicao = distrito == undefined || distrito == null ? '' : `&distrito=${distrito}`
      const profissaoCondicao = profissao == undefined || profissao == null ? '' : `&profissao=${profissao}`

      const response = await axios.get(`${url}?${nomeCondicao}${distritoCondicao}${profissaoCondicao}`)

      return NextResponse.json(response.data)
    } else{
      const resposta = await axios.get(url);
      return NextResponse.json(resposta.data);
    }

  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}

export async function POST(request) {
  const params = await request.json();

  try {
    const resposta = await axios.post(url, params);

    return NextResponse.json(resposta.data);
  } catch (error) {
    console.log("[ORDER_POST]", error);
    return new NextResponse("Erro interno do servidor!", { status: 500 });
  }
}



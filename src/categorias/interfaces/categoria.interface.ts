import { Document } from "mongoose"
import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export interface Categoria extends Document{

    readonly categoria : string
    descricao : string
    envento : Array<Evento>
    jogadores: Array<Jogador>
}

export interface Evento{
    nome: string
    opercao: string
    valor: number
}
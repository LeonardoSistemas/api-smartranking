import * as Mongoose from "mongoose";

export const JogadorSchema = new Mongoose.Schema({

    telefoneCelular : {type : String},
    email : {type : String, unique: true},
    nome : {type : String},
    ranking: {type : String},
    posicaoRanking: {type : Number},
    urlFotoJogador: {type : String},
},{timestamps:true, collection:'colJogadores'})
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel : Model<Jogador>){}

    /* private readonly logger = new Logger(JogadoresService.name)  */   

    async consultarTodosJogadores() : Promise<Jogador[]>{

        return await this.jogadorModel.find().exec()
    }

    async consultarJogadorPeloEmail(email : string) : Promise<Jogador>{

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec()

        if(!jogadorEncontrado)
            throw new NotFoundException(`Jogador com email ${email} não foi encontrado`)
        
        return jogadorEncontrado
    }

    async deletarJogador(email : string) : Promise<any>{

        return await this.jogadorModel.remove({email}).exec()
    }

    async criarAtualizarJogador(criarJogadorDto : CriarJogadorDto) : Promise<Jogador> {
        
        const { email } = criarJogadorDto

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec()

        if(jogadorEncontrado) 
            return this.atualizar(criarJogadorDto)
        else
            return this.criar(criarJogadorDto)
    }

    private async atualizar(criarJogadorDto : CriarJogadorDto) : Promise<Jogador>{

        const {email} = criarJogadorDto
        return await this.jogadorModel.findOneAndUpdate({email},{$set: criarJogadorDto}).exec()
    }

    private async criar(criarJogadorDto : CriarJogadorDto) : Promise<Jogador>{
        
        const jogadorCriado = new this.jogadorModel(criarJogadorDto)

        return await jogadorCriado.save()
        
    }    
}

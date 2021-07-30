import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import e from 'express';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresServices : JogadoresService){}

    @Post()
    async criarAtualizarJogador(
        @Body() criarJogadorDto : CriarJogadorDto){

        await this.jogadoresServices.criarAtualizarJogador(criarJogadorDto)
    }

    @Get()
    async consultarJogadores(@Query('email') email : string) : Promise<Jogador[] | Jogador>{

        if(email){

            return this.jogadoresServices.consultarJogadorPeloEmail(email)
        }
        else
            return this.jogadoresServices.consultarTodosJogadores()

    }

    @Delete()
    async deletarJogadores(@Query('email') email : string):Promise<void>{

        return this.jogadoresServices.deletarJogador(email)
    }
}

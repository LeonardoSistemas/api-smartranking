import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { ValidacaoParametrosPipe } from '../common/pipes/validation-parametros.pipe'

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresServices: JogadoresService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto) : Promise<Jogador> {
        return await this.jogadoresServices.criarJogador(criarJogadorDto)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() atualizarJogadorDto: AtualizarJogadorDto, 
        @Param('_id', ValidacaoParametrosPipe) _id : string) : Promise<void> {
        await this.jogadoresServices.atualizarJogador(atualizarJogadorDto, _id)
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[] | Jogador> {
        return this.jogadoresServices.consultarTodosJogadores()
    }

    @Get('/:_id')
    async consultarJogadoresPeloId(@Param('_id', ValidacaoParametrosPipe) _id: string): Promise<Jogador[] | Jogador> {
        return this.jogadoresServices.consultarJogadorPeloId(_id)
    }

    @Delete('/:_id')
    async deletarJogadores(@Param('_id', ValidacaoParametrosPipe) _id: string): Promise<void> {
        return this.jogadoresServices.deletarJogador(_id)
    }
}

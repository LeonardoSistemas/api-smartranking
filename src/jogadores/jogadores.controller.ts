import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresServices : JogadoresService){}

    @Post()
    async criarAtualizarJogador(
        @Body() criarJogadorDto : CriarJogadorDto){

        await this.jogadoresServices.criarAtualizarJogador(criarJogadorDto)
    }
}

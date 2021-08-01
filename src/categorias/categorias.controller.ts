import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria-dto';
import { CriarCategoriaDto } from './dtos/criar-categoria-dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {
    constructor(private readonly categoriasServices : CategoriasService){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto) : Promise<Categoria>{

        return await this.categoriasServices.criarCategoria(criarCategoriaDto)
    }

    @Get()
    async consultarCategoria() : Promise<Array<Categoria>> {
        
        return await this.categoriasServices.consultarTodasCategorias()
    }

    @Get('/:categoria')
    async consultarCategoriaPeloId(@Param('categoria') categoria : string) : Promise<Categoria> {
        
        return await this.categoriasServices.consultarCategoriaPeloId(categoria)
    }

    @Put('/:categoria')
    @UsePipes(ValidationPipe)
    async atualizarCategoria(@Body() atualizarCategoriaDto : AtualizarCategoriaDto, @Param('categoria') categoria : string) : Promise<void> {
        
        await this.categoriasServices.atualizarCategoria(categoria, atualizarCategoriaDto)
    }

    @Post('/:categoria/jogadores/:idJogador')
    async atribuirCategoriaJogador(@Param() params : string[]) : Promise<void>{

        return await this.categoriasServices.atribuirCategoriaJogador(params)
    }
}

import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
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
}

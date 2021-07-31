import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

    async consultarTodosJogadores(): Promise<Jogador[]> {

        return await this.jogadorModel.find().exec()
    }

    async jogadorEncontrado(_id: string) : Promise<Jogador>{

        const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec()
        return jogadorEncontrado
    }

    async consultarJogadorPeloId(_id: string): Promise<Jogador> {

        const jogadorEncontrado = await this.jogadorEncontrado(_id)

        if (!jogadorEncontrado)
            throw new NotFoundException(`Jogador com ID ${_id} não foi encontrado`)

        return jogadorEncontrado
    }

    async deletarJogador(_id: string): Promise<any> {

        const jogadorEncontrado = await this.jogadorEncontrado(_id)
        if (!jogadorEncontrado)
            throw new NotFoundException(`Jogador com ID ${_id} não foi encontrado`)

        return await this.jogadorModel.deleteOne({ _id }).exec()
    }

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {

        const { email } = criarJogadorDto

        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec()

        if (jogadorEncontrado)
            throw new BadRequestException(`Jogador com email ${email} já cadastrado`)

        const jogadorCriado = new this.jogadorModel(criarJogadorDto)

        return await jogadorCriado.save()
    }

    async atualizarJogador(atualizarJogadorDto: AtualizarJogadorDto, _id: string): Promise<Jogador> {

        const jogadorEncontrado = await this.jogadorEncontrado(_id)

        if (!jogadorEncontrado)
            throw new NotFoundException(`Jogador com o Id ${_id} não encontrado`)

        return await this.jogadorModel.findOneAndUpdate({ _id }, { $set: atualizarJogadorDto }).exec()

    }
}

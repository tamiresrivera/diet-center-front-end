import { CategoriaReceita } from "./categoria-receita.model";

export class Receita {
    constructor(
        public titulo: string,
        public descricao: string,
        public profissionalId: string,
        public categoriaReceitaId: string,
        public id?: string,
        public categoriaReceitaDescricao?: string
    ){}
}
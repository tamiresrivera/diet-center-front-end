export class Paciente {

    constructor(
        public nome: string,
        public email: string,
        public cpf: string,
        public telefone: string,
        public observacao?: string,
        public categoriaReceitaId?: string,
        public usuarioId?: string,
        public id?: string,
        public senha?: string
    ) {
    }

}
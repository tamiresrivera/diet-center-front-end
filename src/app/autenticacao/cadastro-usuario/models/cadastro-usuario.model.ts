export class CadastroUsuario {
    constructor(
        public id: string,
        public nome: string,
        public email: string,
        public nomeUsuario: string,
        public senha: string,
        public cpf: string,
        public telefone: string,
        public perfil: string
    ){}
}
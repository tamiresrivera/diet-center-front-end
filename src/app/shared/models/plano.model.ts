export class Plano {
    constructor(
        public hora: string,
        public descricao: string,
        public categoriaPlanoAlimentarId: string,
        public profissionalId: string,
        public pacienteId: string,
        public observacao?: string,
        public descricaoCategoria?: string,
        public id?: string,
        public usuarioPacienteId?: string
    ){}
}
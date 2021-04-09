export class Agenda {

    constructor(
        public dataHora: string,
        public profissionalId: string,
        public pacienteId: string,
        public nomePaciente?: string,
        public id?: string
    ) {
    }

}
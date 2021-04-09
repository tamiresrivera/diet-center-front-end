import { AvaliacaoAntropometricaCircunferencia, AvaliacaoAntropometricaPrega, AvaliacaoAntropometricaDiametroOsseo } from  '.';

export class AvaliacaoAntropometrica {
    constructor(
        public pacienteId: string,
        public dataHora: string,
        public altura: string,
        public peso: string,
        public imc: string,
        public percentualMassaGorda: string,  
        public percentualMassaMagra: string,
        public massaGorda: string,
        public massaMagra: string,
        public pesoOsseo?: string,
        public pesoResidual?: string,
        public pesoMuscular?: string,
        public areaMuscularBraco?: string,
        public areaGorduraBraco?: string,
        public circunferencias?: AvaliacaoAntropometricaCircunferencia[],
        public pregas?: AvaliacaoAntropometricaPrega[],
        public diametros?: AvaliacaoAntropometricaDiametroOsseo[],
        public id?: string
    ){}
}
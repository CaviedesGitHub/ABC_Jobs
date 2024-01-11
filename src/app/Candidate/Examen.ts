export class Examen {
    id: number;
    id_cand: number;
    id_habil: number;
    nota: number;
    resultado: string;
    
    constructor(id: number, id_cand: number, id_habil: number, nota: number, resultado: string){
        this.id=id;
        this.id_cand = id_cand;
        this.id_habil = id_habil;
        this.nota = nota;
        this.resultado = resultado;
    }
}

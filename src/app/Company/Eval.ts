export class Eval {
    id: number;
    id_cand: number;
    idPerfilProy: number;
    anno: number;
    strmes: string;
    mes: number;
    calificacion: string;
    valoracion: number;
    nota: string;

    constructor(id: number, id_cand: number, idPerfilProy: number, anno: number, strmes: string, mes: number,
        calificacion: string, valoracion: number, nota: string,){
        this.id=id;
        this.id_cand= id_cand;
        this.idPerfilProy= idPerfilProy;
        this.anno= anno;
        this.strmes= strmes;
        this.mes= mes;
        this.calificacion= calificacion;
        this.valoracion= valoracion;
        this.nota= nota;
      }
}

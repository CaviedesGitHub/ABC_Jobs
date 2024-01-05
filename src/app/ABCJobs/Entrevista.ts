export class Entrevista {
    id: number;
    id_cand: number;
    idPerfilProy: number;
    fecha: string;
    hora: string;
    contacto: string;
    calificacion: string;
    valoracion: number;
    anotaciones: string;

    constructor(id: number, id_cand: number, idPerfilProy: number,
        fecha: string, hora: string, contacto: string, calificacion: string,
        valoracion: number, anotaciones: string){
        this.id=id;
        this.id_cand=id_cand;
        this.idPerfilProy=idPerfilProy;
        this.fecha=fecha;
        this.hora=hora;
        this.contacto=contacto;
        this.calificacion=calificacion;
        this.valoracion=valoracion;
        this.anotaciones=anotaciones;
    } 
}

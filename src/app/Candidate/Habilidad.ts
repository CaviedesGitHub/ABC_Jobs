export class Habilidad {
    id_ph: number;
    id_perfil: number;
    valoracion: string;
    calificacion: number;    
    id_habil: number;
    nombre: string;
    tipo: string;


    constructor(id_ph: number, id_perfil: number, calificacion: number, valoracion: string, 
                id_habil: number, nombre: string, tipo:string){
        this.id_ph = id_ph;
        this.id_perfil = id_perfil;
        this.calificacion = calificacion;
        this.valoracion = valoracion;
        this.id_habil = id_habil;
        this.nombre = nombre;
        this.tipo = tipo;
      }    
}
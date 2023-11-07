export class Habilidad {
    id_ph: number;
    valoracion: string;
    id: number;
    nombre: string;
    tipo: string;

    constructor(id_ph: number, valoracion: string, id: number, nombre: string, tipo:string){
        this.id_ph=id_ph;
        this.valoracion = valoracion;
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
      }    
}

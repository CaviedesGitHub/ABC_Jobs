export class Project {
    id: number;
    id_emp: number;
    nombre: string;
    descripcion: string;
    
    constructor(id: number, id_emp: number, nombre: string, descripcion: string){
        this.id=id;
        this.id_emp = id_emp;
        this.nombre = nombre;
        this.descripcion = descripcion;
      }
  
  }
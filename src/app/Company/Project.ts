export class Project {
    id: number;
    id_emp: number;
    nombre: string;
    fecha_inicio: Date;
    descripcion: string;
    
    constructor(id: number, id_emp: number, nombre: string, fecha_inicio: Date, descripcion: string){
        this.id=id;
        this.id_emp = id_emp;
        this.nombre = nombre;
        this.fecha_inicio=fecha_inicio;
        this.descripcion = descripcion;
      }
  
  }
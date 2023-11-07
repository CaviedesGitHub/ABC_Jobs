import { Project } from "./Project";
import { Perfil } from "./Perfil";

export class ProjectDetail extends Project{
    empresa: string;
    perfiles: Array<Perfil> = [];

    constructor(id: number, id_emp: number, nombre: string, 
        descripcion: string, empresa: string, perfiles: Array<Perfil>){
        super(id, id_emp, nombre, descripcion)
        this.empresa=empresa;
        this.perfiles=perfiles;
      }
}


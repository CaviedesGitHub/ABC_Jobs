import { Company } from "./Company";
import { Project } from "./Project";

export class CompanyDetail extends Company{
  proyectos: Array<Project> = [];

  constructor(id: number, nombre: string, tipo: string, correo: string, celular: string,
    contacto: string, pais: string, ciudad: string, direccion: string,
    id_usuario: number, is_active: boolean, estado: string, proyectos: Array<Project>){
      super(id, nombre, tipo, correo, celular, contacto,
                pais, ciudad, direccion, id_usuario, is_active, estado)
      this.proyectos=proyectos;
    }

}

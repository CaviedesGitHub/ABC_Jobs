export class Candidato {
    id: number;
    nombres: string;
    apellidos: string;
    direccion: string;
    email: string;
    phone: string;
    ciudad: string;
    id_perfil: number;
    calificacion: number;
    
    constructor(id: number, nombres: string, apellidos: string, direccion: string, 
                email: string, phone: string, ciudad: string, id_perfil: number, 
                calificacion: number){
        this.id=id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.email = email;
        this.phone = phone;
        this.ciudad = ciudad;
        this.id_perfil = id_perfil;
        this.calificacion = calificacion;
      }
}
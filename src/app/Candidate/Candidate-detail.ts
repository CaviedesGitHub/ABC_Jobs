import { Habilidad } from "./Habilidad";

export class CandidateDetail {
    id: number;
    nombres: string;
    apellidos: string;
    documento: number;
    fecha_nac: Date;    
    direccion: string;
    email: string;
    phone: string;
    ciudad: string;
    num_perfil: number;
    id_usuario: number;
    imagen: string;
    lstHabils: Array<Habilidad>;
    
    constructor(id: number, nombres: string, apellidos: string, direccion: string, 
                documento: number, fecha_nac: Date,        
                email: string, phone: string, ciudad: string, num_perfil: number, 
                id_usuario: number, imagen: string, lstHabils: Array<Habilidad>){
        this.id=id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.documento = documento;
        this.fecha_nac = fecha_nac;        
        this.direccion = direccion;
        this.email = email;
        this.phone = phone;
        this.ciudad = ciudad;
        this.num_perfil = num_perfil;
        this.id_usuario = id_usuario;
        this.imagen = imagen;
        this.lstHabils = lstHabils;
    }
}
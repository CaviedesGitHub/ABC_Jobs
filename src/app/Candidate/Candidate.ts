export class Candidate {
    id: number;
    nombres: string;
    apellidos: string;
    documento: number;
    fecha_nac: Date;
    direccion: string;
    email: string;
    phone: string;
    ciudad: string;
    id_perfil: number;
    id_usuario: number;
    imagen: string;
    
    constructor(id: number, nombres: string, apellidos: string, direccion: string, 
                documento: number, fecha_nac: Date,
                email: string, phone: string, ciudad: string, id_perfil: number, 
                id_usuario: number, imagen: string){
        this.id=id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.documento = documento;
        this.fecha_nac = fecha_nac;        
        this.direccion = direccion;
        this.email = email;
        this.phone = phone;
        this.ciudad = ciudad;
        this.id_perfil = id_perfil;
        this.id_usuario= id_usuario;
        this.imagen = imagen;
    }
}
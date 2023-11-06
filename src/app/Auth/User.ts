export class User {
    nombre: string;
    password: string;
    password2: string;
    tipo: string;
  
    constructor(nombre: string, password: string, password2: string, tipo: string){
        this.nombre = nombre;
        this.password = password;
        this.password2 = password2;
        this.tipo = tipo;
      }
  
  }
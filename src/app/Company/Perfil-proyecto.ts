export class PerfilProyecto {
    nombre: string;
    lstHabils: string;
    lstHabTec: string;
    lstHabBlan: string;
    lstHabPers: string;


    constructor(nombre: string, lstHabils: string, lstHabTec: string, lstHabBlan: string, lstHabPers: string){
        this.nombre=nombre;
        this.lstHabils = lstHabils;
        this.lstHabTec = lstHabTec;
        this.lstHabBlan = lstHabBlan;
        this.lstHabPers = lstHabPers;
      }
}

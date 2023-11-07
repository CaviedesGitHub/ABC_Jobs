import { Habilidad } from "./Habilidad";

export class Perfil {
    id: number;
    nombre: string;
    id_proy: number;
    id_perfil: number;
    id_cand: number;
    candidato: string;
    lstHT: Array<Habilidad>;
    lstHB: Array<Habilidad>;
    lstHP: Array<Habilidad>;

    constructor(id: number, nombre: string, id_proy: number, id_perfil: number,
        id_cand: number, candidato: string,
        lstHT: Array<Habilidad>, lstHB: Array<Habilidad>, lstHP: Array<Habilidad>){

        this.id=id;
        this.nombre=nombre
        this.id_proy=id_proy
        this.id_perfil=id_perfil
        this.id_cand=id_cand
        this.candidato=candidato
        this.lstHT = lstHT;
        this.lstHB = lstHB;
        this.lstHP = lstHP;
      }

}
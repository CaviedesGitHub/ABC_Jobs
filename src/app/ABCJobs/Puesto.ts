export class Puesto {
    nom_empresa: string;
    nom_proyecto: string;
    nom_perfil: string;
    id: number;
    id_perfil: number;
    id_cand: number;
    candidato: string;

    constructor(nom_empresa: string, nom_proyecto: string, nom_perfil: string,
                id: number, id_perfil: number, id_cand: number, candidato: string){
        this.nom_empresa=nom_empresa;
        this.nom_proyecto=nom_proyecto;
        this.nom_perfil=nom_perfil;
        this.id=id;
        this.id_perfil=id_perfil;
        this.id_cand=id_cand;
        this.candidato=candidato;
    } 
}

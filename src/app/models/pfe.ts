export class Pfe {
    sujet: string;
    rapport:string;
    entreprise:string;
    mission:string;
    motsCles:string[];
    valid:boolean;

    static PFEList: Pfe[] = [];


    constructor(pfeJson: {}){
      //@ts-ignore
      this.sujet = pfeJson.sujet;
      //@ts-ignore
      this.entreprise = pfeJson.entreprise;
      //@ts-ignore
      this.mission = pfeJson.mission;
      //@ts-ignore
      this.motsCles = pfeJson.motsCles;
      //@ts-ignore
      this.rapport = pfeJson.rapport;
    }

}

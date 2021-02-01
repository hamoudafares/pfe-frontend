export class Professor {


  private _id: number;
  private _firstName: string;
  private _familyName: string;
  private _CIN: string;
  private _email: string;
  private _speciality: string;
  private _anneUniversitaire: string;
  private _profilePicUrl: string;

  private _etudiantsEncadre: any[];

  private _linkedInLink: string ='';




  constructor(profJson: {id, firstName, familyName, CIN, email, speciality, anneeUniversitaire, profilePicUrl}){
    this._firstName = profJson.firstName;
    this._familyName = profJson.familyName;
    this._CIN = profJson.CIN;
    this._email = profJson.email;
    this._speciality = profJson.speciality;
    this._anneUniversitaire = profJson.anneeUniversitaire;
    this._id = profJson.id;
    this._profilePicUrl = profJson.profilePicUrl;
  }

  get etudiantsEncadre(): any[] {
    return this._etudiantsEncadre;
  }

  set etudiantsEncadre(value: any[]) {
    this._etudiantsEncadre = value;
  }

  get linkedInLink(): string {
    return this._linkedInLink;
  }

  set linkedInLink(value: string) {
    this._linkedInLink = value;
  }

  get profilePicUrl(): string {
    return this._profilePicUrl;
  }

  set profilePicUrl(value: string) {
    this._profilePicUrl = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }



  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get familyName(): string {
    return this._familyName;
  }

  set familyName(value: string) {
    this._familyName = value;
  }

  get CIN(): string {
    return this._CIN;
  }

  set CIN(value: string) {
    this._CIN = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get speciality(): string {
    return this._speciality;
  }

  set speciality(value: string) {
    this._speciality = value;
  }

  get anneUniversitaire(): string {
    return this._anneUniversitaire;
  }

  set anneUniversitaire(value: string) {
    this._anneUniversitaire = value;
  }
}

import {Student} from "./student";
import {ProfessorService} from "../professor-service/professor.service";

export class Professor {


  private _id: string;
  private _firstName: string;
  private _familyName: string;
  private _CIN: string;
  private _email: string;
  private _speciality: string;
  private _anneUniversitaire: string;

  private _profilePicUrl: string;

  private _etudiantsEncadre: Student[] = [];

  private _linkedInLink: string ='';

  annee:string;




  constructor(profJson: {}){
    // @ts-ignore
    this._firstName = profJson.firstName;
    // @ts-ignore
    this._familyName = profJson.familyName;
    // @ts-ignore
    this._CIN = profJson.CIN;
    // @ts-ignore
    this._email = profJson.email;
    // @ts-ignore
    this._speciality = profJson.speciality;
    // @ts-ignore
    this._anneUniversitaire = profJson.anneeUniversitaire;
    // @ts-ignore
    this._id = profJson.id;
    // @ts-ignore
    this._profilePicUrl = profJson.profilePicUrl;
    // @ts-ignore
    this.annee = profJson.annee;

    // temporary
  }

  static castToProfessor(profJson:{}): Professor{
    // @ts-ignore
    let speciality = profJson.speciality;
    // @ts-ignore
    let annee = profJson.annee;

    // @ts-ignore
    let prof = new Professor(profJson.user);
    prof.annee = annee;
    prof.speciality = speciality;
    return prof;
  }



  encadrer(student: Student): void{
    this.etudiantsEncadre.push(student);
    student.encadrant = this;
  }

  isEncadrantTo(student: Student): boolean{

    return student.encadrant?.id == this.id;
  }

  toString(): string{
    return this.firstName + " " + this.familyName;
  }

  //everything below this are getters and setters

  get etudiantsEncadre(): Student[] {
    return this._etudiantsEncadre;
  }

  set etudiantsEncadre(value: Student[]) {
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

  get id(): string {
    return this._id;
  }

  set id(value: string) {
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

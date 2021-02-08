
import {ignore} from "selenium-webdriver/testing";
import {StudentService} from "../student-service/student.service";
import {Soutenance} from "../soutenance";
import {Pfe} from "./pfe";
import {Professor} from "./professor";

export class Student {

  private _id: string;
  private _firstName: string;
  private _familyName: string;
  private _CIN: string;
  private _studentNumber: string;
  private _Option: string;
  private _email: string;
  private _speciality: string;
  private _anneUniversitaire: string;
  private _profilePicUrl: string;
  private _linkedInLink: string ='';

  annee:string;

  private _encadrant: Professor;

  private _soutenance: Soutenance;
  private _pfe: Pfe;

  constructor(studJson: {}){

    //@ts-ignore temporary
    let s = StudentService.getStudentById(studJson.id);
    if(s != null){
      console.log("already exist! returning...");
      return s;
    }
    //@ts-ignore
    this.id = studJson.id;
    //@ts-ignore
    this.firstName = studJson.firstName;
    //@ts-ignore
    this.CIN = studJson.CIN;
    //@ts-ignore
    this.studentNumber = studJson.studentNumber;
    //@ts-ignore
    this.Option = studJson.Option;
    //@ts-ignore
    this.email = studJson.email;
    //@ts-ignore
    this.speciality = studJson.speciality;
    //@ts-ignore
    this.anneUniversitaire = studJson.anneUniversitaire;
    //@ts-ignore
    this.profilePicUrl = studJson.profilePicUrl;

    // temporary

  }

  static castToStudent(studJson:{}){
    //@ts-ignore
    let newJson:{} = studJson.user;

    //@ts-ignore
    newJson.studentNumber =studJson.studentNumber;
    //@ts-ignore
    newJson.option =studJson.option;
    //@ts-ignore
    newJson.speciality =studJson.speciality;
    //@ts-ignore

    let student = new Student(newJson);

    //@ts-ignore

    student.annee = studJson.annee;

    //@ts-ignore
    if(studJson.supervisor != null){
      //@ts-ignore
      student.encadrant = Professor.castToProfessor(studJson.supervisor);
    }

    //@ts-ignore
    if(studJson.pfe != null){
      //@ts-ignore
      student.pfe = new Pfe(studJson.pfe);
    }

    return student;
  }

  public toString(): string {
    return this.firstName + " " + this.familyName;
  }




  set soutenance(value: Soutenance) {
    this._soutenance = value;
    value.student = this;
  }

  set pfe(value: Pfe) {
    this._pfe = value;
  }
  // everything below this comment are typical setters and getters

  get soutenance(): Soutenance {
    return this._soutenance;
  }


  get pfe(): Pfe {
    return this._pfe;
  }



  get encadrant(): Professor {
    return this._encadrant;
  }

  set encadrant(value: Professor) {
    this._encadrant = value;
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

  get studentNumber(): string {
    return this._studentNumber;
  }

  set studentNumber(value: string) {
    this._studentNumber = value;
  }

  get Option(): string {
    return this._Option;
  }

  set Option(value: string) {
    this._Option = value;
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

  get profilePicUrl(): string {
    return this._profilePicUrl;
  }

  set profilePicUrl(value: string) {
    this._profilePicUrl = value;
  }

  get linkedInLink(): string {
    return this._linkedInLink;
  }

  set linkedInLink(value: string) {
    this._linkedInLink = value;
  }
}

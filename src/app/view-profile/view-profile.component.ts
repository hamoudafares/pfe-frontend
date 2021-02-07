import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfessorService} from "../professor-service/professor.service";
import {Professor} from "../models/professor";
import {Student} from "../models/student";
import {StudentService} from "../student-service/student.service";
import {AuthenticationService} from "../services/authentication.service";
import {Role} from "../models/role";
import {RequestService} from "../request-service/request.service";
import {User} from "../models/user";
import {RequestEncadrement, statusEnum} from "../models/request";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  mode: string;
  professor: Professor = null;
  student: Student = null;
  noSuchPerson: boolean = false;
  requestSent: boolean = false;
  requestReceived: boolean = false;
  userIsStudent: boolean = false;
  userIsProfessor: boolean = false;
  personIsEncadre: boolean = false;

  user: User;

  constructor(private professorService: ProfessorService, private activatedRoute: ActivatedRoute, private router: Router,
              private  studentService: StudentService, private authService: AuthenticationService, private requestService: RequestService) {
    let urlMode = this.router.url.split('/')[2];


    // if viewing a professor:

    if(urlMode.toLowerCase() == 'professor'){
      this.mode = 'professor';
      activatedRoute.params.subscribe( params => {
        let id = params['id'];
        professorService.getProfessorById(id).subscribe( (profData) => {
          this.professor = Professor.castToProfessor(profData);
          if(this.professor == null){
            this.noSuchPerson = true;
          }

          else {

            this.user = this.authService.user;
            console.log(this.user);
            if (this.user?.role == Role.Student){

              this.userIsStudent = true;


              let idStud = this.user.id;

              let request = this.requestService.getRequestWithStudentAndProfessor(idStud, this.professor.id);


              this.requestSent = request != null;

              //MUSTREMOVE

              console.log(RequestEncadrement.requests);


            }

            else if(this.user?.role == Role.Professor){
              this.userIsProfessor = true;

            }

          }

        }, (error=>{
          this.noSuchPerson = true;
        }));


      });
    }

    // if viewing a student

    else if(urlMode.toLowerCase() == 'student') {
      this.mode = 'student';

      activatedRoute.params.subscribe(params => {
        let id = params['id'];
        studentService.getStudentById(id).subscribe((studentData) =>{
           this.student = Student.castToStudent(studentData);

          if (this.student == null) {
            this.noSuchPerson = true;
          }

          else {

            this.user = this.authService.user;

            if(this.user?.role == Role.Professor){
              this.userIsProfessor = true;

              console.log(this.user);

              let idProf = this.user.id;


              // let request = this.requestService.getRequestWithStudentAndProfessor(this.student.id, idProf);
              //
              // this.requestReceived = (request != null) && (request?.requestStatus == statusEnum.pending);

              let prof: Professor;
              this.professorService.getProfessorById(this.user.id).subscribe( (profData)=>{
                prof = Professor.castToProfessor(profData);

                this.personIsEncadre = prof.isEncadrantTo(this.student);
              });




              //MUSTREMOVE

              console.log(RequestEncadrement.requests);

            }

          }
        });


      });
    }

  }

  ngOnInit(): void {
  }

  sendRequestToProfessor(){
    // this.requestService.createRequest(this.studentService.getStudentById(this.user.id),this.professor);
    //
    // let request = this.requestService.getRequestWithStudentAndProfessor(this.user.id, this.professor.id);
    //
    // this.requestSent = request != null;

  }

  cancelRequestToProfessor(){
    // this.requestService.deleteRequest(this.user.id, this.professor.id);
    //
    // let request = this.requestService.getRequestWithStudentAndProfessor(this.user.id, this.professor.id);
    //
    // this.requestSent = request != null;


  }

  professorAcceptRequest(){
    // let request  = this.requestService.getRequestWithStudentAndProfessor(this.student.id, this.user.id);
    //
    // request.requestStatus = statusEnum.accepted;
    //
    // let prof = this.professorService.getProfessorById(this.user.id);
    //
    // prof.encadrer(this.student);
    //
    //
    // let requestConfirm = this.requestService.getRequestWithStudentAndProfessor(this.student.id, this.user.id);
    //
    // this.requestReceived = requestConfirm != null;
    //
    //
    // this.personIsEncadre = prof.isEncadrantTo(this.student);


  }

  professoRefuseRequest(){
    // let request  = this.requestService.getRequestWithStudentAndProfessor(this.student.id, this.user.id);
    //
    // request.requestStatus = statusEnum.refused;
    //
    // let requestConfirm = this.requestService.getRequestWithStudentAndProfessor(this.student.id, this.user.id);
    //
    // this.requestReceived = requestConfirm != null;
    //
    // console.log(requestConfirm);
    //
    // console.log(RequestEncadrement.requests);

  }

}

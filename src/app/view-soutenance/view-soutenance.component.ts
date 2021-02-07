import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-view-soutenance',
  templateUrl: './view-soutenance.component.html',
  styleUrls: ['./view-soutenance.component.css']
})
export class ViewSoutenanceComponent implements OnInit {
  presentation = {
    jury: [
      {
        _id: '601138a2985d802b900a2080',
        speciality: 'gl',
        annee: '2016/2017',
        user: {
          _id: '601138a0985d802b900a207f',
          familyName: "teacher",
          firstName: "chedy",
          cin: "15011232",
          email: "chedy@email.com",
          __v: 0
        },
        __v: 0
      },
      {
        _id: "60113b2d23b7fc0a64dfceb3",
        speciality: "gl",
        annee: "2016/2017",
        user: {
          _id: "60113b2c23b7fc0a64dfceb2",
          familyName: "teacher",
          firstName: "chedy",
          cin: "15011232",
          email: "chedy@email.com",
          __v: 0
        },
        __v: 0
      }
    ],
    _id: "6011e7bb6db20017a8ed1422",
    room: "201",
    datetime: "2012-04-23T18:25:43.511Z",
    __v: 2,
    president: {
      _id: "6011329dc41e2a18e4a462b5",
      speciality: "gl",
      annee: "2016/2017",
      user: {
        _id: "60113292c41e2a18e4a462b4",
        familyName: "teacher",
        firstName: "chedy",
        cin: "15011232",
        email: "chedy@email.com",
        __v: 0
      },
      __v: 0
    },
    session: {
      _id: "6012053f3e23391cacd4c8bc",
      anneeUniversitaire: "2021",
      __v: 0,
      president: {
        _id: "6011384f985d802b900a207e",
        speciality: "gl",
        annee: "2016/2017",
        user: {
          _id: "6011384e985d802b900a207d",
          familyName: "teacher",
          firstName: "chedy",
          cin: "15011232",
          email: "chedy@email.com",
          __v: 0
        },
        __v: 0
      }
    },
    student: {
      _id: "600b1780cd34f6180c9d76ac",
      studentNumber: 123456,
      speciality: "gl",
      option: "security",
      annee: "2016/2017",
      user: {
        _id: "600b1780cd34f6180c9d76ab",
        familyName: "karoui",
        firstName: "nour",
        cin: "150111111",
        email: "ee",
        __v: 0
      },
      pfe: {
        mission: [
          "kill him"
        ],
        motsCles: [
          "nourkaroui"
        ],
        valid: true,
        _id: "6014004de6d21635c45c6b92",
        sujet: "base de donnees",
        entreprise: "nouros",
        rapport: "http://localhost:3000/uploads/PPP-GL4-2020.docx"
      },
      __v: 0,
      supervisor: {
        _id: "6011329dc41e2a18e4a462b5",
        speciality: "gl",
        annee: "2016/2017",
        user: {
          _id: "60113292c41e2a18e4a462b4",
          familyName: "teacher",
          firstName: "chedy",
          cin: "15011232",
          email: "chedy@email.com",
          __v: 0
        },
        __v: 0
      }
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

  exportAsPDF(div_id)
  {
    const data = document.getElementById(div_id);
    html2canvas(data).then(canvas => {
      const htmlWidth = canvas.width;
      const htmlHeight = canvas.height;
      const pdfWidth = htmlWidth + 30;
      const pdfHeight = pdfWidth * 1.5 + 30;
      const totalPDFPages = Math.ceil(htmlHeight / pdfHeight) - 1;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'pt', [pdfWidth, pdfHeight]); // Generates PDF in landscape mode
      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage();
        pdf.addImage(contentDataURL, 'JPG', 30, -(pdfHeight * i) + (30 * 4), htmlWidth, htmlHeight);
      }

      pdf.addImage(contentDataURL, 0, 0, canvas.width, canvas.height);
      pdf.save('rapport.pdf');
    });
  }

}

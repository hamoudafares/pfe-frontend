import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-export-as-pdf',
  templateUrl: './export-as-pdf.component.html',
  styleUrls: ['./export-as-pdf.component.css']
})
export class ExportAsPdfComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  exportAsPDF(div_id)
  {
    const data = document.getElementById(div_id);
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('l', 'pt', [canvas.width, canvas.height]); // Generates PDF in landscape mode
      // const pdf = new jspdf('landscape', 'cm', 'a4'); // Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 0, 0, canvas.width, canvas.height);
      pdf.save('Filename.pdf');
    });
  }
}

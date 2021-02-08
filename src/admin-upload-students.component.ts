import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';

const acceptableExtensions: string[] = ['xls','xlsx'];

@Component({
  selector: 'app-admin-upload-students',
  templateUrl: './admin-upload-students.component.html',
  styleUrls: ['./admin-upload-students.component.css']
})
export class AdminUploadStudentsComponent implements OnInit {

  @ViewChild("fileDrop",{static: false}) fileDropEl: ElementRef;

  files: any[] = [];

  atLeastOneFile: boolean = false;

  notExcelFileWarning: boolean = false;

  noFileSubmitted: boolean = false;

  excelToJson;



  constructor() { }

  ngOnInit(): void {


  }

  onFileDropped($event) {
    this.noFileSubmitted = false;
    this.prepareFilesList($event);
  }

  fileBrowseHandler(files) {
    this.noFileSubmitted = false;
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
    if(this.files.length==0){
      this.atLeastOneFile = false;
    }
    for (const item of this.files) {
      let name: string = item.name;
      let fileExt = item.name.split('.').pop();

      if (acceptableExtensions.indexOf(fileExt) == -1 || !name.includes('.')) {
        this.notExcelFileWarning = true;
        return;
      }
    }
    this.notExcelFileWarning = false;
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      let name: string = item.name;
      let fileExt = item.name.split('.').pop();
      if(acceptableExtensions.indexOf(fileExt) == -1 || !name.includes('.')){
        this.notExcelFileWarning = true;
      }
    }

    //let fileExt = filename.split('.').pop();

    if(files.length>0) this.atLeastOneFile = true;

    this.fileDropEl.nativeElement.value = "";
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  convertFiles(event: Event){
    this.noFileSubmitted = false;
    event.preventDefault();
    let JSONs = [];
    let i = 0;
    for(let file of this.files){

      let name: string = file.name;
      let fileExt = name.split('.').pop();
      if(acceptableExtensions.indexOf(fileExt) == -1 || !name.includes('.')){
        continue;
      }
      let reader = new FileReader();

      reader.onload = (event) => {
        let workBook = null;
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        let jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        const dataString = JSON.stringify(jsonData);
        console.log(dataString);
      };

      JSONs[i] =  reader.readAsBinaryString(file);
      console.log(JSONs[i]);
      i++;
    }
    if(i==0){
      this.noFileSubmitted = true;
    }
  }

}

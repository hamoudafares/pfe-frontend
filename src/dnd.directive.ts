import {Directive, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {

  @HostBinding('class.fileover') fileOver: boolean = false;
  @Output() fileDropped = new EventEmitter<any>();

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();

    this.fileOver = true;

    console.log("over");
  }


  @HostListener('dragleave', ['$event']) onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();

    this.fileOver = false;

    console.log("left");
  }


  @HostListener('drop', ['$event']) onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();

    const files = evt.dataTransfer.files;
    this.fileOver = false;

    if(files.length>0){
      this.fileDropped.emit(files);
    }

    console.log("dropped");
  }

}

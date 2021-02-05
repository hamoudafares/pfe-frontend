import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Pfe } from '../models/pfe';
import { PfeService } from '../services/pfe.service';

@Component({
  selector: 'app-pfe',
  templateUrl: './pfe.component.html',
  styleUrls: ['./pfe.component.css']
})
export class PfeComponent implements OnInit {
  pfes: Pfe[]=[];
  searchText: any;
  len:any;

  constructor(private pfeService: PfeService) { }
 
  ngOnInit(): void {
        this.pfeService.getAll().pipe(first()).subscribe(pfes => {
          this.pfes = pfes;
          this.len=pfes.length;
    });
   }
}

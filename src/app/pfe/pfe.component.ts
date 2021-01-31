import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pfe } from '../models/pfe';
import { PfeService } from '../services/pfe.service';

@Component({
  selector: 'app-pfe',
  templateUrl: './pfe.component.html',
  styleUrls: ['./pfe.component.css']
})
export class PfeComponent implements OnInit {
  pfes: Observable<Pfe[]>;

  constructor(private pfeService: PfeService, private router: Router) { }
  searchText: any;
  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.pfes = this.pfeService.getAll();
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pfe } from '../models/pfe';
import {Observable, of} from "rxjs";


const baseUrl = `${environment.apiUrl}/pfes`;

@Injectable({
  providedIn: 'root'
})
export class PfeService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Pfe[]>(baseUrl);
  }



}

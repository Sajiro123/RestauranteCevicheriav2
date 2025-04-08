import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Mesa } from '../../model/Mesa';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class HomeService {
    private apiUrl = 'http://localhost:3000/post';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    getMesas(): Observable<any> {
        debugger;
        const query = 'select * from mesa c where c.deleted is  null;';
        return this.http.post<any>(this.apiUrl, { query });
    }
}

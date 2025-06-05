import { Injectable } from '@angular/core';
import { catchError, mergeMap, Observable, switchMap, throwError } from 'rxjs';
import { Mesa } from '../../model/Mesa';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NuevoPedido } from '../../model/NuevoPedido';
import { NuevoPedidodetalle } from '../../model/NuevoPedidodetalle';
import { Pedido } from '../../model/Pedido';

@Injectable({ providedIn: 'root' })
export class AperturaService {
    private apiUrl = 'http://localhost:3000/post';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    ListarAperturaHoy() {
        const query = `SELECT * FROM apertura WHERE fecha=CURDATE() AND deleted IS null;`;
        return this.http.post<any>(this.apiUrl, { query });
    }

    registrarCaja(value: any) {
        const query = `SELECT * FROM apertura WHERE fecha=CURDATE() AND deleted IS null;`;
        return this.http.post<any>(this.apiUrl, { query });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ConfiguracionService {
    private apiUrl = 'http://localhost:3000/post';

    constructor(private http: HttpClient) {}

    ListarToppingPedido() {
        const query = `SELECT * FROM toppings;`;
        return this.http.post<any>(this.apiUrl, { query });
    }
}

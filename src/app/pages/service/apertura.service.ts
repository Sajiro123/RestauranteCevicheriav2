import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AperturaService {
    private apiUrl = 'http://localhost:3000/post';

    constructor(private http: HttpClient) {}

    ListarAperturaHoy() {
        const query = `SELECT * FROM apertura WHERE fecha=CURDATE() AND deleted IS null;`;
        return this.http.post<any>(this.apiUrl, { query });
    }
    ListCategoriasGastos() {
        const query = `SELECT * FROM categoriagastos;`;
        return this.http.post<any>(this.apiUrl, { query });
    }

    registrarCaja(value: any) {
        var date = new Date();
        var fecha = date.toISOString().split('T')[0]; // "2025-02-20" (UTC)
        var query = `INSERT INTO apertura
        (fecha
        ,total
        ,estado
        ,created_at
        ,id_created_at
        ,responsable
        )
        VALUES (
        '${fecha}'
        ,'${value.monto}',
        1,
        CURRENT_TIMESTAMP(),
        1
        ,'${value.responsable}')`;

        return this.http.post<any>(this.apiUrl, { query });
    }

    registrarGastos(value: any) {
        var date = new Date();
        var created_at = date.toISOString().split('T')[0]; // "2025-02-20" (UTC)
        var query = `INSERT INTO gastos
        (descripcion,
        idcategoriagatos,
        monto,
        fecha
        ,notas
        ,created_at
        ,id_created_at)
        VALUES ('${value.descripcion}',
        '${value.categoria}',
        '${value.monto}',
        '${value.fecha}',
        '${value.notas}',
        CURRENT_TIMESTAMP(),
        1)`;

        return this.http.post<any>(this.apiUrl, { query });
    }

    cerrarCaja(value: any) {
        var date = new Date();
        var fecha = date.toISOString().split('T')[0]; // "2025-02-20" (UTC)
        var query = `UPDATE apertura a
        SET a.estado=2
        WHERE a.fecha=CURDATE()
         AND a.deleted IS NULL;`;
        return this.http.post<any>(this.apiUrl, { query });
    }
}

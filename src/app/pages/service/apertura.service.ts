import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AperturaService {
    private apiUrl = 'http://localhost:3000/post';

    constructor(private http: HttpClient) {}

    ListarAperturaHoy() {
        // Obtener fecha y hora actual de Perú
        const now = new Date();
        const fechaPeru = now.toLocaleDateString('en-CA', {
            timeZone: 'America/Lima'
        });

        const horaPeru = now.toLocaleString('es-PE', {
            timeZone: 'America/Lima',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const fechaHoraPeru = `${fechaPeru} ${horaPeru}`;

        const query = `SELECT * FROM apertura_caja WHERE fecha='${fechaPeru}' AND deleted IS null;`;
        return this.http.post<any>(this.apiUrl, { query });
    }
    ListCategoriasGastos() {
        const query = `SELECT * FROM categoriagastos;`;
        return this.http.post<any>(this.apiUrl, { query });
    }

    ListGastos(fecha: string) {
        const query = `SELECT * FROM gastos g WHERE g.fecha='${fecha}'  AND deleted IS NULL;`;
        return this.http.post<any>(this.apiUrl, { query });
    }

    registrarCaja(value: any) {
        // Obtener fecha y hora actual de Perú
        const now = new Date();
        const fechaPeru = now.toLocaleDateString('en-CA', {
            timeZone: 'America/Lima'
        });

        const horaPeru = now.toLocaleString('es-PE', {
            timeZone: 'America/Lima',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const fechaHoraPeru = `${fechaPeru} ${horaPeru}`;

        var query = `INSERT INTO apertura_caja
        (fecha
        ,total
        ,estado
        ,created_at
        ,id_created_at
        ,responsable
        )
        VALUES (
        '${fechaPeru}',
        '${value.monto}',
        1,
        '${fechaHoraPeru}',
        1,
        '${value.responsable}')`;

        return this.http.post<any>(this.apiUrl, { query });
    }

    registrarGastos(value: any) {
        const now = new Date();
        const fechaPeru = now.toLocaleDateString('en-CA', {
            timeZone: 'America/Lima'
        });

        const horaPeru = now.toLocaleString('es-PE', {
            timeZone: 'America/Lima',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const fechaHoraPeru = `${fechaPeru} ${horaPeru}`;

        var date = new Date();
        var created_at = date.toISOString().split('T')[0]; // "2025-02-20" (UTC)
        var query = `INSERT INTO gastos
        (descripcion,
        idcategoriagastos,
        monto,
        fecha
        ,notas
        ,created_at
        ,id_created_at)
        VALUES ('${value.descripcion}',
        '${value.categoria}',
        '${value.monto}',
        '${fechaPeru}',
        '${value.notas}',
        '${fechaHoraPeru}',
        1)`;

        return this.http.post<any>(this.apiUrl, { query });
    }

    cerrarCaja(value: any) {
        // Obtener fecha y hora actual de Perú
        const now = new Date();
        const fechaPeru = now.toLocaleDateString('en-CA', {
            timeZone: 'America/Lima'
        });

        const horaPeru = now.toLocaleString('es-PE', {
            timeZone: 'America/Lima',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const fechaHoraPeru = `${fechaPeru} ${horaPeru}`;

        var date = new Date();
        var fecha = date.toISOString().split('T')[0]; // "2025-02-20" (UTC)
        var query = `UPDATE apertura_caja
        SET estado='2'
        WHERE fecha='${fechaPeru}'
         AND deleted IS NULL;`;
        return this.http.post<any>(this.apiUrl, { query });
    }
}

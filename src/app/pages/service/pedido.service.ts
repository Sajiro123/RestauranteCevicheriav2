import { Injectable } from '@angular/core';
import { catchError, mergeMap, Observable, switchMap, throwError } from 'rxjs';
import { Mesa } from '../../model/Mesa';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NuevoPedido } from '../../model/NuevoPedido';
import { NuevoPedidodetalle } from '../../model/NuevoPedidodetalle';

@Injectable({ providedIn: 'root' })
export class PedidoService {
    async EditarPedido(arraypedido: NuevoPedido, comentario: string) {
        const date = new Date();
        const fecha = date.toISOString().split('T')[0];

        // Calcular el total
        const total = arraypedido.pedidodetalle.reduce((sum: number, product: { preciounitario: number; cantidad: number }) => sum + product.preciounitario * product.cantidad, 0);

        // Consulta SQL con valores directamente interpolados (asegúrate de sanitizarlos)
        const updatePedidoQuery = `
            UPDATE pedido
            SET comentario = '${this.escapeSqlValue(comentario)}',
                total_pedidos = ${arraypedido.pedidodetalle.length},
                updated_at = '${fecha}',
                total = ${total}
            WHERE idpedido = '${arraypedido.idpedido}'`;

        // Consulta para marcar como eliminados los detalles
        const deleteDetallesQuery = `
            UPDATE pedidodetalle
            SET deleted = 1
            WHERE idpedido = '${arraypedido.idpedido}'`;

        // Ejecutar secuencialmente
        return this.http.post(this.apiUrl, { query: updatePedidoQuery }).pipe(
            switchMap(() => this.http.post(this.apiUrl, { query: deleteDetallesQuery })),
            catchError((error) => {
                console.error('Error al editar pedido:', error);
                return throwError(error);
            })
        );
    }

    // Método helper para escapar valores SQL (básico)
    private escapeSqlValue(value: string): string {
        if (!value) return '';
        return value.replace(/'/g, "''");
    }

    private apiUrl = 'http://localhost:3000/post';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    ListarPedidosMesa(): Observable<any> {
        const query = `select
        DATE_FORMAT(p.created_at,'%H:%i:%s') as pedido_hora,
        p.comentario,
        p.descuento,
         p2.idproducto,
         p1.lugarpedido,
         p2.acronimo,
          p.idpedido,
          p1.cantidad,
          p2.nombre,
          p1.cantidad,
          p1.precioU,
          p1.total,
          p.mesa,
          c.nombre categoria,
          p.total totalidad ,
          p1.pedido_estado,
          p1.idpedidodetalle FROM pedido p
            INNER JOIN pedidodetalle p1 ON p.idpedido=p1.idpedido
            INNER JOIN producto p2 ON p1.idproducto=p2.idproducto
            INNER JOIN categoria c ON c.idcategoria=p2.idcategoria
        WHERE p.estado=1  AND p.deleted  IS null  AND p1.deleted  IS null ORDER BY p1.idpedido desc;`;
        return this.http.post<any>(this.apiUrl, { query });
    }

    BuscarPlatoSearch(value: any, type: string): Observable<any> {
        var query = `select * FROM producto p WHERE p.preciounitario IS NOT null and deleted is null `;
        if (type == 'nombre') {
            query += ` and p.nombre LIKE '%${value}%'`;
        } else if (type) {
            query += ` and ${type} = '${value}'`;
        }
        return this.http.post<any>(this.apiUrl, { query });
    }

    insertPedido(arraypedido: NuevoPedido, mesa: string, comentario: string): Observable<any> {
        const date = new Date();
        const fecha = date.toISOString().split('T')[0]; // "2025-02-20" (UTC)
        var total = arraypedido.pedidodetalle.reduce((sum: number, product: { preciounitario: number; cantidad: number }) => sum + product.preciounitario * product.cantidad, 0);
        const insertQuery = `INSERT INTO pedido (created_at,
        total,
         total_pedidos,
         estado,
         mesa,
         fecha,
         comentario )
        VALUES (CURRENT_TIMESTAMP(),
        '${total}',
         '${arraypedido.pedidodetalle.length}',
         1,
         '${mesa}',
         '${fecha}',
          '${comentario}')`;
        const selectQuery = `SELECT LAST_INSERT_ID() AS id;`;

        return this.http.post(this.apiUrl, { query: insertQuery }).pipe(switchMap(() => this.http.post(this.apiUrl, { query: selectQuery })));
    }

    insertPedidoDetalle(arraypedido: NuevoPedidodetalle): Observable<any> {
        debugger;
        const date = new Date();
        const fecha = date.toISOString().split('T')[0]; // "2025-02-20" (UTC)
        const insertQuery = `insert INTO pedidodetalle
        (idpedido
        ,idproducto
        ,cantidad
        ,precioU
        ,total
        ,lugarpedido
        ,created_at
        ,id_created_at
        )
        VALUES (${arraypedido.idpedido},
        ${arraypedido.idproducto},
        ${arraypedido.cantidad},
        ${arraypedido.preciounitario},
        ${arraypedido.total},
        ${arraypedido.lugarpedido},
        CURRENT_TIMESTAMP(),
        ${arraypedido.id_created_at})`;

        const selectQuery = `SELECT LAST_INSERT_ID() AS id;`;

        return this.http.post(this.apiUrl, { query: insertQuery }).pipe(switchMap(() => this.http.post(this.apiUrl, { query: selectQuery })));
    }
}

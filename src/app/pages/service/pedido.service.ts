import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Mesa } from '../../model/Mesa';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PedidoService {
    private apiUrl = 'http://localhost:3000/post';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    getPedidos(): Observable<any> {
        debugger;
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
          u.nombre usuario,
          p1.pedido_estado,
          p1.idpedidodetalle FROM pedido p
            INNER JOIN pedidodetalle p1 ON p.idpedido=p1.idpedido
            INNER JOIN producto p2 ON p1.idproducto=p2.idproducto
            INNER JOIN categoria c ON c.idcategoria=p1.idcategoria
            INNER JOIN usuario u ON p.id_created_at=u.idusuario
        WHERE p.estado=1  AND p.deleted  IS null  AND p1.deleted  IS null ORDER BY p1.idpedido desc;`;
        return this.http.post<any>(this.apiUrl, { query });
    }
}

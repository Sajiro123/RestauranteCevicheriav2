import { Injectable } from '@angular/core';
import { catchError, mergeMap, Observable, switchMap, throwError, from } from 'rxjs';
import { Mesa } from '../../model/Mesa';
import { SupabaseService } from '../../services/supabase.service';
import { Router } from '@angular/router';
import { NuevoPedido } from '../../model/NuevoPedido';
import { NuevoPedidodetalle } from '../../model/NuevoPedidodetalle';
import { Pedido } from '../../model/Pedido';

@Injectable({ providedIn: 'root' })
export class PedidoService {
    deletePedido(id: number, motivo: string, responsable: string): Observable<any> {
        return from(this.supabaseService.deletePedido(id, motivo, responsable));
    }

    CobrarPedido(productos: Pedido): Observable<any> {
        const updateData = {
            estado: 3,
            yape: productos.yape,
            visa: productos.visa,
            efectivo: productos.efectivo,
            plin: productos.plin,
            updated_at: new Date().toISOString()
        };
        
        return from(this.supabaseService.updatePedido(productos.idpedido, updateData));
    }

    ShowProductosPdf(id: any): Observable<any> {
        return from(this.supabaseService.client
            .from('pedido')
            .select(`
                cliente,
                created_at,
                descuento,
                comentario,
                idpedido,
                mesa,
                total,
                pedidodetalle:pedidodetalle(
                    toppings,
                    lugarpedido,
                    idproducto,
                    cantidad,
                    precioU,
                    total,
                    producto:idproducto(
                        nombre,
                        acronimo,
                        categoria:idcategoria(nombre)
                    )
                )
            `)
            .eq('estado', 1)
            .eq('idpedido', id)
            .eq('deleted', 0)
            .order('mesa')
            .then(({ data, error }) => ({ success: !error, data, error }))
        );
    }

    ReporteDiario(fecha: string): Observable<any> {
        return from(this.supabaseService.getReporteDiario(fecha));
    }
    
    ValidarCierre(fecha: string): Observable<any> {
        return from(this.supabaseService.client
            .from('apertura_caja')
            .select('*')
            .eq('fecha', fecha)
            .eq('estado', 2)
            .then(({ data, error }) => ({ success: !error, data: data && data.length > 0 ? data[0] : null, error }))
        );
    }

    showRerporte(parameters: any = {}): Observable<any> {
        return from(this.supabaseService.getReporteRango(parameters.fechainicio, parameters.fechafin));
    }

    ShowPedidosFecha(parameters: string): Observable<any> {
        return from(this.supabaseService.client
            .from('pedido')
            .select('mesa, idpedido, fecha, descuento, total, total_pedidos, yape, plin, efectivo, visa, created_at')
            .eq('estado', 3)
            .eq('fecha', parameters)
            .order('idpedido', { ascending: false })
            .then(({ data, error }) => {
                if (data) {
                    data.forEach((item: any) => {
                        const date = new Date(item.created_at);
                        item.hora = date.toLocaleTimeString('es-PE', { 
                            hour: '2-digit', 
                            minute: '2-digit',
                            hour12: false 
                        });
                    });
                }
                return { success: !error, data, error };
            })
        );
    }

    ReporteProductoDetalle(parameters: string): Observable<any> {
        return from(this.supabaseService.client
            .from('pedido')
            .select(`
                descuento,
                comentario,
                idpedido,
                mesa,
                total,
                pedidodetalle:pedidodetalle(
                    pedido_estado,
                    lugarpedido,
                    idproducto,
                    cantidad,
                    precioU,
                    total,
                    producto:idproducto(nombre)
                )
            `)
            .eq('fecha', parameters)
            .eq('deleted', 0)
            .order('mesa')
            .then(({ data, error }) => ({ success: !error, data, error }))
        );
    }

    async EditarPedido(arraypedido: NuevoPedido, comentario: string): Promise<Observable<any>> {
        try {
            const total = arraypedido.pedidodetalle.reduce((sum: number, product: { preciounitario: number; cantidad: number }) => sum + product.preciounitario * product.cantidad, 0);
            
            // Update pedido
            const updateData = {
                comentario,
                total_pedidos: arraypedido.pedidodetalle.length,
                total,
                updated_at: new Date().toISOString()
            };
            
            const updateResult = await this.supabaseService.updatePedido(arraypedido.idpedido, updateData);
            
            if (!updateResult.success) {
                throw new Error(updateResult.error?.message);
            }
            
            // Mark existing details as deleted
            const { error: deleteError } = await this.supabaseService.client
                .from('pedidodetalle')
                .update({ deleted: 1 })
                .eq('idpedido', arraypedido.idpedido);
            
            if (deleteError) {
                throw new Error(deleteError.message);
            }
            
            return from(Promise.resolve({ success: true, data: updateResult.data }));
        } catch (error) {
            console.error('Error al editar pedido:', error);
            return throwError(error);
        }
    }


    constructor(
        private supabaseService: SupabaseService,
        private router: Router
    ) {}

    ListarPedidosMesa(): Observable<any> {
        return from(this.supabaseService.getPedidosHoy());
    }

    BuscarPlatoSearch(value: any, type: string): Observable<any> {
        if (type === 'nombre') {
            return from(this.supabaseService.searchProductos(value));
        } else {
            return from(this.supabaseService.getProductos());
        }
    }

    ListarToppings(): Observable<any> {
        return from(this.supabaseService.getToppings());
    }

    insertPedido(arraypedido: NuevoPedido, mesa: string, comentario: string): Observable<any> {
        arraypedido.pedidodetalle = arraypedido.pedidodetalle.filter((element: any) => element.idproducto !== 0);

        const total = arraypedido.pedidodetalle.reduce((sum: number, product: { preciounitario: number; cantidad: number }) => sum + product.preciounitario * product.cantidad, 0);
        const total_pedidos = arraypedido.pedidodetalle.reduce((sum: number, product: { cantidad: number }) => sum + product.cantidad, 0);
        
        const pedidoData = {
            cliente: arraypedido.cliente,
            total,
            total_pedidos,
            estado: 1,
            mesa: parseInt(mesa),
            fecha: new Date().toISOString().split('T')[0],
            comentario
        };
        
        return from(this.supabaseService.insertPedido(pedidoData));
    }

    insertPedidoDetalle(arraypedido: NuevoPedidodetalle): Observable<any> {
        let toppings = '';
        if (arraypedido.idtopings.length > 0) {
            arraypedido.idtopings.forEach((element: any, index: number) => {
                toppings += `${element.idtopings},`;
            });
        }
        toppings = toppings.slice(0, -1); // Eliminar la última coma
        
        const detalleData = {
            idpedido: arraypedido.idpedido,
            idproducto: arraypedido.idproducto,
            cantidad: arraypedido.cantidad,
            precioU: arraypedido.preciounitario,
            total: arraypedido.total,
            lugarpedido: arraypedido.lugarpedido,
            toppings,
            id_created_at: 1
        };
        
        return from(this.supabaseService.insertPedidoDetalle(detalleData));
    }
}

export interface NuevoPedidodetalle {
    idpedido: number;
    categoria: string;
    idproducto: number;
    cantidad: number;
    precioU: number;
    total: number;
    lugarpedido: any;
    opciones: any;
    fecha: Date;
    pedido_estado: any;
    id_created_at: any;
}

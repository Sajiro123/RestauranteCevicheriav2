import { Pedido } from "./Pedido";

export interface Mesa {
    numero: number;
    estado: '1' | '0';
    pedidos: Pedido[];
  }

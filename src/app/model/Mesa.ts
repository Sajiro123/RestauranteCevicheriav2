import { Pedido } from "./Pedido";

export interface Mesa {
    numero: string;
    estado: '1' | '0';
    pedidos: Pedido[];
  }

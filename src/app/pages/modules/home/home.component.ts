import { Component } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { CommonModule } from '@angular/common';
import { Mesa } from '../../../model/Mesa';
import { Pedido } from '../../../model/Pedido';
import { PedidoService } from '../../service/pedido.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-home',
    imports: [CommonModule], // <-- Add this

    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    mesas: Mesa[] = [];
    Pedidos: Pedido[] = [];

    mesaSeleccionada: Mesa | null = null;
    pedido_mesa_status: boolean = false;

    constructor(
        private homeService: HomeService,
        private PedidoService: PedidoService
    ) {}

    ngOnInit(): void {
        this.cargarMesas();
    }

    cargarMesas(): void {
        this.homeService.getMesas().subscribe(
            (response) => {
                if (response.success) {
                    this.mesas = response.data;
                    this.ListarPedidos();
                } else {
                    alert('Error al intentar consultar');
                }
            },
            (error) => {
                console.error('Error al intentar consultar', error);
                alert('Hubo un problema al conectar con el servidor');
            }
        );
    }

    ListarPedidos(): void {
        this.PedidoService.ListarPedidosMesa().subscribe(
            (response) => {
                if (response.success) {
                    this.Pedidos = response.data;
                    this.mesas.forEach((element: any) => {
                        var hayPedidoEnMesa = true;
                        this.Pedidos.forEach((pedido: any) => {
                            if (pedido.mesa === element.numero) {
                                hayPedidoEnMesa = false; // Hay pedidos en esta mesa, se marca como ocupada (o estado 1)
                            }
                        });

                        if (!hayPedidoEnMesa) {
                            element.estado = '1'; // No hay pedidos en esta mesa, se marca como libre (o estado 0)
                        }
                    });
                } else {
                    alert('Error al intentar consultar');
                }
            },
            (error) => {
                console.error('Error al intentar consultar', error);
                alert('Hubo un problema al conectar con el servidor');
            }
        );
    }
    seleccionarMesa(mesa: Mesa): void {
        this.pedido_mesa_status = false;
        this.mesaSeleccionada = mesa;
        var status_array = this.Pedidos.filter((p) => p.mesa === mesa.numero);
        if (status_array.length > 0) {
            this.pedido_mesa_status = true;
        }
    }

    getPedidosDeMesa(numMesa: string) {
        if (this.mesaSeleccionada) {
            return this.Pedidos.filter((p) => p.mesa === numMesa);
        }
        return [];
    }
}

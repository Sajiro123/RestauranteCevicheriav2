import { Component } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { CommonModule } from '@angular/common';
import { Mesa } from '../../../model/Mesa';
import { Pedido } from '../../../model/Pedido';
import { PedidoService } from '../../service/pedido.service';

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

    constructor(
        private homeService: HomeService,
        private PedidoService: PedidoService
    ) {}

    ngOnInit(): void {
        this.cargarMesas();
        this.ListarPedidos();
    }

    cargarMesas(): void {
        this.homeService.getMesas().subscribe(
            (response) => {
                if (response.success) {
                    this.mesas = response.data;
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
// asc
    ListarPedidos(): void {
        this.PedidoService.getPedidos().subscribe(
            (response) => {
                if (response.success) {
                    debugger
                    // this.mesas = response.data;
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
        this.mesaSeleccionada = mesa;
    }
}

import { ChangeDetectorRef, Component } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { CommonModule } from '@angular/common';
import { Mesa } from '../../../model/Mesa';
import { Pedido } from '../../../model/Pedido';
import { PedidoService } from '../../service/pedido.service';
import * as _ from 'lodash';
import { ImportsModule } from '../../imports';
import { Products } from '../../../model/Products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NuevoPedido } from '../../../model/NuevoPedido';

@Component({
    selector: 'app-home',
    imports: [CommonModule, ImportsModule], // <-- Add this
    providers: [MessageService, ConfirmationService],

    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    products: Products[] = [];

    discount: number = 0;

    mesas: Mesa[] = [];
    Pedidos: Pedido[] = [];
    NuevoPedido: NuevoPedido[] = [];

    calculator_Dialog: boolean = false;
    displayModalCalculator = false;

    mesaSeleccionada: Mesa | null = null;
    pedido_mesa_status: boolean = false;

    numeroPlato: number | null = null;

    constructor(
        private homeService: HomeService,
        private PedidoService: PedidoService,
        private messageService: MessageService,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.cargarMesas();
    }

    setNumbersSelectDashboard(value: number | 'clear') {
        if (value === 'clear') {
            this.numeroPlato = null;
        } else {
            this.numeroPlato = Number(`${this.numeroPlato ?? ''}${value}`);
        }
    }

    ListarPedidoNumeroCalculadora() {
        this.PedidoService.BuscarPlatoSearch(this.numeroPlato, 'p.numero_carta').subscribe(
            (response) => {
                if (response.success) {
                    if (response.data) {
                        this.displayModalCalculator = false;
                        this.cd.detectChanges(); // Forzar detección de cambios
                        response.data[0].cantidad = 1; // Inicializar cantidad en 1
                        response.data[0].total = response.data[0].preciounitario; // Inicializar cantidad en 1

                        this.NuevoPedido.push(response.data[0]);
                    } else {
                        this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'No contiene informaciòn la consulta BuscarPlatoSearch' });
                    }
                } else {
                    alert('Hubo un problema al conectar con el servidor');
                }
            },
            (error) => {
                console.error('Error al intentar consultar', error);
                alert('Hubo un problema al conectar con el servidor');
            }
        );
    }
    incrementnewPedido(product: NuevoPedido) {
        product.cantidad++;
        product.total = product.cantidad * product.preciounitario;
    }

    decrementnewPedido(product: NuevoPedido) {
        if (product.cantidad > 1) {
            product.cantidad--;
            product.total = product.cantidad * product.preciounitario;
        }
    }
    remove(product: Products) {
        const index = this.products.indexOf(product);
        if (index > -1) {
            this.products.splice(index, 1);
        }
    }

    total() {
        return this.products.reduce((sum, product) => sum + product.preciounitario * product.cantidad, 0) - this.discount;
    }

    save() {
        // Logic for saving the order
        console.log('Order saved!', this.products);
    }
    cerrarModal() {
        // lógica para cerrar el modal (puede ser ocultar un flag tipo `showModal = false`)
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

    showModal() {
        this.displayModalCalculator = true;
        this.numeroPlato = null;
    }

    pricechange(pedidosnew: NuevoPedido) {
        debugger
        pedidosnew.total = pedidosnew.cantidad * pedidosnew.preciounitario;
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

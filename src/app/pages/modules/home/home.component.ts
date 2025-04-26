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
import { concat, forkJoin, switchMap } from 'rxjs';
import { NuevoPedidodetalle } from '../../../model/NuevoPedidodetalle';

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
    switchValue: boolean = false;

    mesas: Mesa[] = [];
    Pedidos: Pedido[] = [];
    NuevoPedido: NuevoPedido = {
        idpedido: 0,
        lugarpedido: undefined,
        pedido_estado: undefined,
        nombre: undefined,
        cantidad: 0,
        descripcion: '',
        estado: false,
        lugar: '',
        preciounitario: 0,
        total: 0,
        descuento: 0,
        comentario: '',
        pedidodetalle: []
    };

    calculator_Dialog: boolean = false;
    displayModalCalculator = false;

    mesaSeleccionada: Mesa | null = null;
    pedido_mesa_status: boolean = false;

    numeroPlato: number | null = null;
    comentarios: string = '';

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
                    debugger;

                    if (response.data) {
                        this.displayModalCalculator = false;
                        this.cd.detectChanges(); // Forzar detección de cambios
                        response.data[0].cantidad = 1; // Inicializar cantidad en 1
                        response.data[0].total = response.data[0].preciounitario; // Inicializar cantidad en 1
                        response.data[0].lugarpedido = '0'; // Inicializar cantidad en 1

                        this.NuevoPedido.pedidodetalle.push(response.data[0]);
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
    incrementnewPedido(product: NuevoPedidodetalle) {
        product.cantidad++;
        product.total = product.cantidad * product.preciounitario;
    }

    decrementnewPedido(product: NuevoPedidodetalle) {
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
        return this.NuevoPedido.pedidodetalle.reduce((sum, product) => sum + product.preciounitario * product.cantidad, 0) - this.discount;
    }

    RegistrarPedido() {
        if (this.mesaSeleccionada) {
            this.PedidoService.insertPedido(this.NuevoPedido, this.mesaSeleccionada.numero, this.comentarios)
                .pipe(
                    switchMap((pedidoResponse: any) => {
                        const pedidoId = pedidoResponse.data[0].id;

                        // Creamos un array de observables para los detalles
                        const detallesObservables = this.NuevoPedido.pedidodetalle.map((element) => {
                            element.idpedido = pedidoId;
                            return this.PedidoService.insertPedidoDetalle(element);
                        });

                        // Usamos forkJoin para esperar a que TODOS los detalles se completen
                        return forkJoin(detallesObservables);
                    })
                )
                .subscribe({
                    next: () => {
                        this.ListarPedidos();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Pedido registrado correctamente',
                            life: 3000
                        });
                    },
                    error: (error) => {
                        console.error('Error en el proceso completo:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Ocurrió un error al registrar el pedido',
                            life: 3000
                        });
                    }
                });
        } else {
            alert('Seleccione una mesa para crear el pedido');
        }
    }

    editar(mesa: Mesa): void {
        debugger;
        this.NuevoPedido = {
            idpedido: 0,
            lugarpedido: undefined,
            pedido_estado: undefined,
            nombre: undefined,
            cantidad: 0,
            descripcion: '',
            estado: false,
            lugar: '',
            preciounitario: 0,
            total: 0,
            descuento: 0,
            comentario: '',
            pedidodetalle: []
        };
        this.pedido_mesa_status = false;
        var status_array = this.Pedidos.filter((p) => p.mesa === mesa.numero);
        if (status_array.length > 0) {
            debugger
            this.NuevoPedido.pedidodetalle = status_array.map((pedido) => ({
                idpedido: pedido.idpedido || 0,
                nombre: pedido.nombre || '',
                idproducto: pedido.idproducto || 0,
                preciounitario: pedido.precioU || 0,
                cantidad: pedido.cantidad || 0,
                descripcion: pedido.descripcion || '',
                total: pedido.total || 0,
                estado: pedido.estado || false,
                lugarpedido: pedido.lugarpedido || '',
                comentario: pedido.comentario || ''
            }));

            this.comentarios = status_array[0].comentario;
        } else {
            alert('No hay pedidos en esta mesa');
        }
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

    pricechange(pedidosnew: NuevoPedidodetalle) {
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
        this.NuevoPedido = {
            idpedido: 0,
            lugarpedido: undefined,
            pedido_estado: undefined,
            nombre: undefined,
            cantidad: 0,
            descripcion: '',
            estado: false,
            lugar: '',
            preciounitario: 0,
            total: 0,
            descuento: 0,
            comentario: '',
            pedidodetalle: []
        };
        this.comentarios = '';
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
    onlyNumberKey(event: KeyboardEvent) {
        const charCode = event.which ? event.which : event.keyCode;
        // Solo permitir números (0-9)
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    }
}

import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { jsPDF } from 'jspdf';
import { Popover } from 'primeng/popover';
@Component({
    selector: 'app-home',
    imports: [CommonModule, ImportsModule, FormsModule], // <-- Add this
    providers: [MessageService, ConfirmationService],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    products: Products[] = [];
    @ViewChild('motivoTextarea') motivoTextarea!: ElementRef;
    @ViewChild('multiselect', { static: true }) multiselect!: ElementRef;
    @Input() isLoading: boolean = false; // Para activar/desactivar el loader

    selectedToppings: { idtopings: number; nombre: string }[] = []; // O puedes inicializar con algunos seleccionados
    isDropdownOpen = false;

    @ViewChild('responsableTextarea') responsableTextarea!: ElementRef;
    multiselectToppings: any[] = [];
    discount: number = 0;
    switchValue: boolean = false;
    pedidosSeleccionados: any[] = [];
    isPanelVisible = true;

    mesas: Mesa[] = [];
    Pedidos: Pedido[] = [];
    estadomesa = [
        {
            mesa: 0,
            value: 0
        }
    ];
    Pedido_cobrar: Pedido = {
        idpedido: 0,
        delivery: 0,
        yape: 0,
        efectivo: 0,
        visa: 0,
        plin: 0,
        idproducto: 0,
        lugarpedido: undefined,
        pedido_estado: undefined,
        nombre: undefined,
        categoria: '',
        cantidad: 0,
        descripcion: '',
        estado: false,
        lugar: '',
        precioU: 0,
        total: 0,
        total_pedidos: 0,
        mesa: '',
        descuento: 0,
        comentario: ''
    };
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
        pedidodetalle: [
            {
                idpedido: 0,
                idproducto: 0,
                nombre: '',
                cantidad: 1,
                preciounitario: 0,
                total: 0,
                pedido_estado: undefined,
                lugarpedido: '0',
                idtopings: [],
                id_created_at: undefined,
                idpedidodetalle: 0
            }
        ],
        visa: 0,
        yape: 0,
        plin: 0,
        efectivo: 0
    };

    calculator_Dialog: boolean = false;
    displayModalCalculator = false;

    mesaSeleccionada: Mesa | null = null;
    pedido_mesa_status: boolean = false;

    numeroPlato: number | null = null;
    comentarios: string = '';
    tipomodal: any = 'Registrar';
    Cobrar_Dialog: boolean = false;
    PDF_Dialog: boolean = false;
    pdfUrl: SafeResourceUrl | null = null;
    CocinaPdf_Dialog: boolean = false;
    eliminarPedidoDialog: boolean = false;
    motivo: any;
    responsable: any;
    imprimirPedidoDialog: boolean = false;
    estadopedido: number = 0;
    buscarPlato: any = '';

    constructor(
        private confirmationService: ConfirmationService,
        private homeService: HomeService,
        private PedidoService: PedidoService,
        private messageService: MessageService,
        private cd: ChangeDetectorRef,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        // LoaderComponent.isLoading = true; // Set loading state to true
        this.cargarMesas();
        this.ListarToppings();
    }

    setNumbersSelectDashboard(value: number | 'clear') {
        if (value === 'clear') {
            this.numeroPlato = null;
        } else {
            this.numeroPlato = Number(`${this.numeroPlato ?? ''}${value}`);
        }
    }

    getTotal(campo: string, value: number): number {
        if (this.NuevoPedido[campo as keyof NuevoPedido] !== undefined) {
            (this.NuevoPedido as any)[campo] = value;
        }
        return this.NuevoPedido[campo as keyof NuevoPedido] || 0;
    }

    hideDialog() {
        this.Cobrar_Dialog = false;
    }

    CobrarPedido(NuevoPedido: NuevoPedido) {
        const total_ingresado = Number(this.Pedido_cobrar.yape || 0) + Number(this.Pedido_cobrar.visa || 0) + Number(this.Pedido_cobrar.plin || 0) + Number(this.Pedido_cobrar.efectivo || 0);
        this.Pedido_cobrar.idpedido = NuevoPedido.idpedido;
        if (total_ingresado === NuevoPedido.total) {
            this.PedidoService.CobrarPedido(this.Pedido_cobrar).subscribe((response) => {
                this.LimpiarNuevoPedido();
                this.cargarMesas();
                this.Cobrar_Dialog = false;
                this.mesaSeleccionada = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Se ha cobrado correctamente el pedido',
                    life: 3000
                });
            });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Aviso importante',
                detail: 'No coincide los montos al cobrar con el total',
                life: 3000
            });
        }
    }

    CobrarDialog(mesa: Mesa): void {
        this.Pedido_cobrar = {
            idpedido: 0,
            delivery: 0,
            yape: 0,
            efectivo: 0,
            visa: 0,
            plin: 0,
            idproducto: 0,
            lugarpedido: undefined,
            pedido_estado: undefined,
            nombre: undefined,
            categoria: '',
            cantidad: 0,
            descripcion: '',
            estado: false,
            lugar: '',
            precioU: 0,
            total: 0,
            total_pedidos: 0,
            mesa: '',
            descuento: 0,
            comentario: ''
        };
        this.Cobrar_Dialog = true;
        this.mesaSeleccionada = mesa;
        var status_array = this.Pedidos.filter((p) => p.mesa === mesa.numero);
        if (status_array.length > 0) {
            this.NuevoPedido = this.getPedidoClick(status_array);
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
                        response.data[0].lugarpedido = '0'; // Inicializar cantidad en 1
                        response.data[0].idtopings = [{ idtopings: 0, nombre: '' }]; // Inicializar toppings
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
    cargarToppingsSeleccionados(pedidosdetalle: NuevoPedidodetalle) {
        const detalle = this.NuevoPedido.pedidodetalle.find((d) => d.idpedidodetalle === pedidosdetalle.idpedidodetalle);

        if (detalle && Array.isArray(detalle.idtopings)) {
            this.selectedToppings = (detalle.idtopings as { idtopings: number; nombre: string }[]).map((topping) => ({
                idtopings: topping.idtopings,
                nombre: topping.nombre
            }));
        } else {
            this.selectedToppings = [];
        }
    }
    agregarToppingsPedido(pedidosdetalle: NuevoPedidodetalle, op: Popover, index: number) {
        if (pedidosdetalle.idpedidodetalle != 0) {
            var detalleIndex = this.NuevoPedido.pedidodetalle.findIndex((d) => d.idpedidodetalle === pedidosdetalle.idpedidodetalle);
        } else {
            var detalleIndex = this.NuevoPedido.pedidodetalle[index] ? index : -1; // Buscar el índice del detalle en el array
        }

        if (this.selectedToppings.length > 0) {
            if (detalleIndex === -1) {
                // Si no existe, crear nuevo detalle
                const nuevoDetalle: NuevoPedidodetalle = {
                    idpedido: pedidosdetalle.idpedido,
                    idproducto: pedidosdetalle.idproducto,
                    nombre: pedidosdetalle.nombre,
                    cantidad: pedidosdetalle.cantidad,
                    preciounitario: pedidosdetalle.preciounitario,
                    total: pedidosdetalle.total,
                    pedido_estado: pedidosdetalle.pedido_estado,
                    lugarpedido: pedidosdetalle.lugarpedido,
                    idtopings: [{ idtopings: 0, nombre: '' }],
                    id_created_at: pedidosdetalle.id_created_at
                };
                this.NuevoPedido.pedidodetalle.push(nuevoDetalle);
                detalleIndex = this.NuevoPedido.pedidodetalle.length - 1;
            }

            // Asegurar que idtopings existe y es array
            if (!this.NuevoPedido.pedidodetalle[detalleIndex].idtopings) {
                this.NuevoPedido.pedidodetalle[detalleIndex].idtopings = [];
            }

            // Asignar los toppings (reemplazar existentes)
            this.NuevoPedido.pedidodetalle[detalleIndex].idtopings = [...this.selectedToppings];

            this.selectedToppings = [];
            this.isDropdownOpen = false;
        } else {
            if (typeof detalleIndex === 'number' && detalleIndex >= 0) {
                this.NuevoPedido.pedidodetalle[detalleIndex].idtopings = [];
            }
        }
        op.hide();
    }
    ListarToppings() {
        this.PedidoService.ListarToppings().subscribe(
            (response) => {
                if (response.success) {
                    if (response.data) {
                        this.multiselectToppings = response.data;
                        this.cd.detectChanges(); // Forzar detección de cambios
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
    BuscarPlatoSearchText(buscarPlato: string) {
        this.PedidoService.BuscarPlatoSearch(buscarPlato, 'nombre').subscribe((response) => {
            if (response.success) {
                if (response.data) {
                    // Construir el HTML para cada fila y agregarlo a la tabla
                    const table = document.getElementById('listarPlatos');
                    if (table) {
                        response.data.forEach((element: any) => {
                            const tr = document.createElement('tr');
                            tr.onclick = (event) => {
                                this.agregarProducto(element, true);
                            };
                            tr.innerHTML =
                                '<td class="align-middle"><span style="font-size: 20px; font-family: Poppins; font-weight: 600;">' +
                                (element.nombre || '') +
                                '</span>' +
                                '<br><span class="text-black-50" style="font-size: 90%;"> N° Carta ' +
                                (element.numero_carta || 'No tiene') +
                                '</span>' +
                                '</td>' +
                                '<td class="text-right font-semi-bold align-middle" style="min-width: 125px; font-size: 18px; font-weight:600">' +
                                'PEN ' +
                                (element.preciounitario || '') +
                                '</td>';
                            table.appendChild(tr);
                        });
                    }
                }
            }
        });
    }
    agregarProducto(element: any, arg1: boolean) {
        this.cd.detectChanges(); // Forzar detección de cambios
        this.NuevoPedido.pedidodetalle.push({
            nombre: element.acronimo || '',
            idproducto: element.idproducto || 0,
            preciounitario: element.preciounitario || 0,
            cantidad: 1,
            total: element.preciounitario || 0,
            pedido_estado: undefined,
            lugarpedido: '0',
            idpedido: 0,
            idtopings: [{ idtopings: 0, nombre: '' }]
        });
    }
    returntoMesas() {
        if (this.NuevoPedido.pedidodetalle.length > 0) {
            if (this.mesaSeleccionada) {
                this.seleccionarMesa(this.mesaSeleccionada);
            }
        }
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

    async EditarPedido() {
        if (this.mesaSeleccionada) {
            (await this.PedidoService.EditarPedido(this.NuevoPedido, this.comentarios))
                .pipe(
                    switchMap((pedidoResponse: any) => {
                        // Creamos un array de observables para los detalles
                        const detallesObservables = this.NuevoPedido.pedidodetalle.map((element) => {
                            element.idpedido = this.NuevoPedido.idpedido;
                            element.id_created_at = 0;
                            return this.PedidoService.insertPedidoDetalle(element);
                        });

                        // Usamos forkJoin para esperar a que TODOS los detalles se completen
                        return forkJoin(detallesObservables);
                    })
                )
                .subscribe({
                    next: () => {
                        this.cargarMesas();
                        if (this.mesaSeleccionada) {
                            this.seleccionarMesa(this.mesaSeleccionada);
                        }
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Pedido Modificado correctamente',
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

    trashPedido(pedido: NuevoPedidodetalle) {
        const index = this.NuevoPedido.pedidodetalle.indexOf(pedido);
        if (index > -1) {
            this.NuevoPedido.pedidodetalle.splice(index, 1);
        }

        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Se elimino correctamente',
            life: 3000
        });
    }

    async deletePedido() {
        if (!this.motivo) {
            this.motivoTextarea.nativeElement.focus();
            this.messageService.add({
                severity: 'warn',
                summary: 'Aviso',
                detail: 'Ingresar motivo de eliminaciòn',
                life: 3000
            });
            return;
        }
        if (!this.responsable) {
            this.responsableTextarea.nativeElement.focus();
            this.messageService.add({
                severity: 'warn',
                summary: 'Aviso',
                detail: 'Ingresar respopnsable de eliminaciòn',
                life: 3000
            });
            return;
        }
        (await this.PedidoService.deletePedido(this.NuevoPedido.idpedido, this.motivo, this.responsable)).subscribe((response) => {
            this.LimpiarNuevoPedido();
            this.cargarMesas();
            this.mesaSeleccionada = null;
            this.eliminarPedidoDialog = false;
            this.cd.detectChanges(); // Forzar detección de cambios
            this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Product Deleted',
                life: 3000
            });
        });
    }

    FunctionButtonPedido(pedido: NuevoPedido) {
        if (this.tipomodal === 'Registrar') {
            this.RegistrarPedido();
        } else if (this.tipomodal === 'Editar') {
            this.EditarPedido();
        }
    }

    RegistrarPedido() {
        this.isLoading = true; // Activar el loader
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
                    next: async () => {
                        await this.cargarMesas();

                        setTimeout(() => {
                            this.isLoading = false;
                            if (this.mesaSeleccionada) {
                                this.seleccionarMesa(this.mesaSeleccionada);
                            }
                        }, 1000);

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

    editar(mesa: Mesa, pedido: NuevoPedido): void {
        // this.LimpiarNuevoPedido();
        this.buscarPlato = '';
        this.pedido_mesa_status = false;
        var status_array = this.Pedidos.filter((p) => p.mesa === mesa.numero);
        this.NuevoPedido = this.getPedidoClick(status_array);
    }
    getPedidoClick(status_array: any): NuevoPedido {
        var idtopingsArray: { idtopings: number; nombre: string }[] = [];

        if (status_array.length > 0) {
            this.NuevoPedido = {
                idpedido: status_array[0]?.idpedido || 0,
                lugarpedido: undefined,
                pedido_estado: undefined,
                nombre: undefined,
                cantidad: status_array.length,
                descripcion: '',
                estado: false,
                lugar: '',
                preciounitario: 0,
                total: this.NuevoPedido.pedidodetalle.reduce((sum: number, product: { preciounitario: number; cantidad: number }) => sum + product.preciounitario * product.cantidad, 0),
                descuento: 0,
                comentario: '',
                pedidodetalle: [],
                visa: 0,
                yape: 0,
                plin: 0,
                efectivo: 0
            };
            this.NuevoPedido.pedidodetalle = status_array.map(
                (pedido: { idpedidodetalle: number; idpedido: any; nombre: any; idproducto: any; precioU: any; cantidad: any; descripcion: any; total: any; estado: any; lugarpedido: any; comentario: any }) => ({
                    idpedidodetalle: pedido.idpedidodetalle || 0,
                    idpedido: pedido.idpedido || 0,
                    nombre: pedido.nombre || '',
                    idproducto: pedido.idproducto || 0,
                    preciounitario: pedido.precioU || 0,
                    cantidad: pedido.cantidad || 0,
                    descripcion: pedido.descripcion || '',
                    total: pedido.total || 0,
                    estado: pedido.estado || false,
                    lugarpedido: pedido.lugarpedido || '',
                    comentario: pedido.comentario || '',
                    idtopings: idtopingsArray || []
                })
            );

            status_array.forEach((element: any) => {
                var toppings = element.toppings;
                if (toppings) {
                    var topings_ = toppings.split(',');
                    idtopingsArray = [];
                    topings_.forEach((elementopping: any) => {
                        const topping = this.multiselectToppings.find((t: any) => t.idtopings == elementopping);
                        if (topping) idtopingsArray.push({ idtopings: topping.idtopings, nombre: topping.nombre });
                        const lastDetalle = this.NuevoPedido.pedidodetalle.find((detalle) => detalle.idpedidodetalle == element.idpedidodetalle);
                        // Asegurarse de que lastDetalle no sea undefined
                        if (lastDetalle) {
                            lastDetalle.idtopings = [...idtopingsArray];
                        }
                    });
                }
            });

            this.comentarios = status_array[0].comentario;
        } else {
            // alert(2)
            // alert('No hay pedidos en esta mesa');
        }
        return this.NuevoPedido;
    }

    cargarMesas(): void {
        this.homeService.getMesas().subscribe(
            (response) => {
                if (response.success) {
                    this.mesas = response.data;
                    this.mesas.forEach((element: any) => {
                        this.estadomesa.push({ mesa: element.numero, value: 0 });
                    });
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
        if (pedidosnew.preciounitario > 0) {
            pedidosnew.total = pedidosnew.cantidad * pedidosnew.preciounitario;
        }
    }

    ListarPedidos(): void {
        this.Pedidos = [];
        this.PedidoService.ListarPedidosMesa().subscribe(
            (response) => {
                if (response.success) {
                    this.Pedidos = response.data;
                    if (response.data && response.data.length > 0) {
                        this.estadomesa.forEach((element: any) => {
                            const hayPedido = this.Pedidos.some((pedido: any) => pedido.mesa === element.mesa);
                            element.value = hayPedido ? 1 : 0;
                        });
                    } else {
                        this.LimpiarNuevoPedido();
                    }
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
        this.isLoading = true;

        if (this.tipomodal === 'Editar') {
            this.mesaSeleccionada = null;
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
                pedidodetalle: [],
                visa: 0,
                yape: 0,
                plin: 0,
                efectivo: 0
            };
        }
        this.tipomodal = 'Registrar';
        // this.LimpiarNuevoPedido();
        this.comentarios = '';
        this.pedido_mesa_status = false;
        this.mesaSeleccionada = mesa;
        if (this.Pedidos) {
            var status_array = this.Pedidos.filter((p) => p.mesa === mesa.numero);
            if (status_array.length > 0) {
                this.pedido_mesa_status = true;
                this.tipomodal = 'Editar';
            } else {
                this.tipomodal = 'Registrar';
            }
        }
        this.BuscarPlatoSearchText('');

        setTimeout(() => {
            this.isLoading = false;
        }, 300);
    }
    loadImageBase64(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = path;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) return reject('No se pudo obtener el contexto del canvas');
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL('image/png');
                resolve(dataURL);
            };
            img.onerror = (error) => reject(error);
        });
    }

    generatePDF(pedido: NuevoPedido) {
        this.loadImageBase64('assets/img/logo.png').then((base64Logo) => {
            this.PedidoService.ShowProductosPdf(pedido.idpedido).subscribe((response) => {
                var inicial = 115;
                var items = response.data.length;

                const increments = [
                    { threshold: 4, value: 3 },
                    { threshold: 5, value: 2 },
                    { threshold: 6, value: 2 },
                    { threshold: 7, value: 5 },
                    { threshold: 8, value: 6 },
                    { threshold: 9, value: 8 },
                    { threshold: 10, value: 5 },
                    { threshold: 11, value: 5 },
                    { threshold: 12, value: 5 },
                    { threshold: 13, value: 5 },
                    { threshold: 14, value: 5 },
                    { threshold: 15, value: 5 },
                    { threshold: 16, value: 5 },
                    { threshold: 17, value: 5 },
                    { threshold: 18, value: 5 },
                    { threshold: 19, value: 5 },
                    { threshold: 20, value: 5 }
                ];

                for (const increment of increments) {
                    if (items >= increment.threshold) {
                        inicial += increment.value;
                    }
                }

                const doc = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: [80, inicial] // Ticket en tamaño pequeño
                });

                let y = 10;
                const centerX = 40; // Mitad del ticket (80 mm de ancho)

                // Encabezado
                doc.setFontSize(12);
                doc.text('CEVICHERIA WILLY GOURMET', centerX, y, { align: 'center' });
                y += 3.5;
                doc.setFontSize(8);

                doc.text('Nota de Venta: 000-95', centerX, y, { align: 'center' });
                y += 3.5;
                doc.text('RUC.: 01234567A', centerX, y, { align: 'center' });
                y += 3.5;
                doc.text('Av.Victor Malazques Mr Lt10 Pachamac-Manchay', centerX, y, { align: 'center' });
                y += 3.5;
                doc.text('TEL: 991 687 503', centerX, y, { align: 'center' });
                doc.addImage(base64Logo, 'PNG', 27, 25, 29, 28);
                y += 33;
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(10);
                var date = new Date(response.data[0].created_at);
                const datePart = date.toLocaleDateString('en-US');
                const timePart = date.toLocaleTimeString('en-US');
                // Datos
                doc.text('Fecha: ' + datePart + ' ' + timePart, 6, y);
                y += 5;
                doc.text('Mesa: ' + response.data[0].mesa, 6, y);
                y += 4;
                doc.setFontSize(9);

                // Detalle
                doc.text('=====================================', centerX, y, { align: 'center' });
                doc.setFont('helvetica', 'normal');

                y += 5;
                // doc.text('1 Chicharron Pota Duo        23,00', 5, y);
                doc.setFontSize(10);

                const data: any = [];
                response.data.forEach((element: any) => {
                    data.push([element.cantidad, element.nombre, element.precioU * element.cantidad]);
                });

                data.forEach((element: any) => {
                    const col1X = 7; // Posición X para la cantidad
                    const col2X = 12; // Posición X para el nombre del producto
                    const col3X = 69; // Posición X para el precio (ajusta según necesites)

                    doc.text(element[0].toString(), col1X, y);
                    doc.text(element[1], col2X, y);
                    doc.text('S/' + element[2].toString(), col3X, y);
                    y += 5;
                });

                y += 4;
                // Total
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text('Sirvase pagar esta cantidad', centerX, y, { align: 'center' });
                y += 5;
                doc.text('******************************', centerX, y, { align: 'center' });
                y += 6;
                doc.setFontSize(14);
                doc.text('TOTAL: S/.' + response.data[0].totalidad, centerX, y, { align: 'center' });
                y += 6;
                doc.setFontSize(10);
                doc.text('******************************', centerX, y, { align: 'center' });
                y += 10;

                // Cuando la imagen se cargue, agregarla al PDF
                const pdfBlob = doc.output('blob');
                const pdfUrl = URL.createObjectURL(pdfBlob);
                this.PDFdescargar(pdfUrl);
            });
        });
    }

    hideDialogPdf() {
        this.PDF_Dialog = false;
        this.CocinaPdf_Dialog = false;
        this.eliminarPedidoDialog = false;
    }

    deletepedidoModal() {
        this.eliminarPedidoDialog = true;
        this.motivo = '';
        this.responsable = '';
    }

    generateCocinaPDF(pedido: any) {
        debugger
        this.PedidoService.ShowProductosPdf(pedido.idpedido).subscribe((response) => {
            this.estadopedido = 0;
            var inicial = 100;
            var items = response.data.length;

            const increments = [
                { threshold: 4, value: 3 },
                { threshold: 5, value: 2 },
                { threshold: 6, value: 2 },
                { threshold: 7, value: 5 },
                { threshold: 8, value: 6 },
                { threshold: 9, value: 8 },
                { threshold: 10, value: 5 },
                { threshold: 11, value: 5 },
                { threshold: 12, value: 5 },
                { threshold: 13, value: 5 },
                { threshold: 14, value: 5 },
                { threshold: 15, value: 5 },
                { threshold: 16, value: 5 },
                { threshold: 17, value: 5 },
                { threshold: 18, value: 5 },
                { threshold: 19, value: 5 },
                { threshold: 20, value: 5 }
            ];

            for (const increment of increments) {
                if (items >= increment.threshold) {
                    inicial += increment.value;
                }
            }

            response.data.forEach((element: any) => {
                var toppings = element.toppings;
                if (toppings && toppings != 0) {
                    var topings_ = toppings.split(',');
                    var texto_topping = '';
                    topings_.forEach((elementopping: any) => {
                        const topping = this.multiselectToppings.find((t: any) => t.idtopings == elementopping);
                        if (topping) texto_topping += topping.nombre + ', ';
                    });
                    inicial += 4;
                }
            });

            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [80, inicial] // Ticket en tamaño pequeño
            });

            let y = 15;
            const centerX = 40; // Mitad del ticket (80 mm de ancho)
            doc.setFont('helvetica', 'bold');

            // Encabezado
            y += 5;

            doc.setFontSize(14);

            // Datos
            doc.text('Fecha: 09/05/2025 18:06:56', 42, y, { align: 'center' });
            y += 5;

            doc.text('Mesa: ' + response.data[0].mesa, 42, y, { align: 'center' });
            y += 7;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);

            const data: any = [];

            response.data.forEach((element: any) => {
                if (element.lugarpedido == '1') {
                    this.estadopedido = 1; // Para llevar
                }
                if (element.lugarpedido == 0) data.push([element.cantidad, element.nombre, element.precioU * element.cantidad]);
            });
            if (data.length > 0) {
                doc.setFont('helvetica', 'bold');

                doc.text('PEDIDOS PARA MESA', centerX, y, { align: 'center' });
                y += 5;
                doc.text('=============================', centerX, y, { align: 'center' });
                y += 5;
                doc.setFont('helvetica', 'normal');
            }

            data.forEach((element: any) => {
                const col1X = 5; // Posición X para la cantidad
                const col2X = 9; // Posición X para el nombre del producto
                const col3X = 69; // Posición X para el precio (ajusta según necesites)

                doc.text(element[0].toString(), col1X, y);
                doc.text(element[1], col2X, y);
                doc.text('S/' + element[2].toString(), col3X, y);
                y += 4.5;
            });

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            y += 5;
            if (this.estadopedido == 1) {
                doc.text('PEDIDOS PARA LLEVAR', centerX, y, { align: 'center' });
                y += 5;
                doc.text('=============================', centerX, y, { align: 'center' });

                doc.setFont('helvetica', 'normal');
                doc.setFontSize(12);
                y += 5;
                response.data.forEach((element: any) => {
                    if (element.lugarpedido == '1') {
                        const col1X = 5; // Posición X para la cantidad
                        const col2X = 9; // Posición X para el nombre del producto
                        const col3X = 69; // Posición X para el precio (ajusta según necesites)
                        doc.text(element.cantidad.toString(), col1X, y);
                        doc.text(element.nombre, col2X, y);
                        doc.text('S/' + element.precioU.toString(), col3X, y);
                        y += 4;
                    }
                });
            }

            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            y += 4;

            doc.text('Comentario :', centerX, y, { align: 'center' });
            y += 4;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);

            const maxWidth = 73; // Ancho máximo en unidades del PDF (ajústalo según tu diseño)
            const comentario = response.data[0].comentario || ''; // Texto del comentario (o string vacío si es null/undefined)
            const lines = doc.splitTextToSize(comentario, maxWidth);
            // Posición inicial (x, y)
            let x = 5;
            let currentY = y; // 'y' es la posición vertical inicial que ya tienes definida

            // Imprimir cada línea
            lines.forEach((line: string | string[]) => {
                doc.text(line, x, currentY);
                currentY += 4; // Espacio entre líneas (ajusta según necesidad)
            });
            y += 5;
            doc.setFontSize(8);
            response.data.forEach((element: any) => {
                var toppings = element.toppings;

                if (toppings && toppings != 0) {
                    var topings_ = toppings.split(',');
                    var texto_topping = '';
                    topings_.forEach((elementopping: any) => {
                        const topping = this.multiselectToppings.find((t: any) => t.idtopings == elementopping);
                        if (topping) texto_topping += topping.nombre + ', ';

                        // idtopings: topping.idtopings, nombre: topping.nombre  ;
                        // const lastDetalle = this.NuevoPedido.pedidodetalle.find((detalle) => detalle.idproducto == element.idproducto);
                        // // Asegurarse de que lastDetalle no sea undefined
                        // if (lastDetalle) {
                        //     lastDetalle.idtopings = [...idtopingsArray];
                        // }
                    });
                    doc.setFont('helvetica', 'bold');
                    doc.text(element.nombre, centerX, y, { align: 'center' });

                    const fontSize = doc.getFontSize(); // Obtiene el tamaño de fuente actual
                    y += fontSize * 0.4; // Ajuste fino (0.2 es un factor para reducir espacio)
                    doc.text(texto_topping, centerX, y, { align: 'center' });
                    y += 6;
                }
            });

            // Cuando la imagen se cargue, agregarla al PDF
            const pdfBlob = doc.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            this.PDFdescargar(pdfUrl);
        });
    }
    PDFdescargar(pdf: string) {
        this.PDF_Dialog = true;
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdf);
    }

    PDFCocinadescargar(pdf: string) {
        this.CocinaPdf_Dialog = true;
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdf);
    }

    getPedidosDeMesa(numMesa: any, statuspedido: boolean): Pedido[] {
        if (this.Pedidos) {
            if (statuspedido == true) {
                var status_array = this.Pedidos.filter((p) => p.mesa == numMesa).sort((a, b) => {
                    if (a.categoria !== b.categoria) {
                        return Number(b.categoria) - Number(a.categoria); // ↓
                    }
                    return Number(a.categoria) - Number(b.categoria); // ↑
                });
                var idtopingsArray: { idtopings: number; nombre: string }[] = [];
                if (status_array.length != 0) {
                    this.NuevoPedido = {
                        idpedido: status_array[0]?.idpedido || 0,
                        lugarpedido: undefined,
                        pedido_estado: undefined,
                        nombre: undefined,
                        cantidad: 0,
                        descripcion: '',
                        estado: false,
                        lugar: '',
                        preciounitario: 0,
                        total: this.NuevoPedido.pedidodetalle.reduce((sum: number, product: { preciounitario: number; cantidad: number }) => sum + product.preciounitario * product.cantidad, 0),
                        descuento: 0,
                        comentario: '',
                        pedidodetalle: [],
                        visa: 0,
                        yape: 0,
                        plin: 0,
                        efectivo: 0
                    };

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
                        comentario: pedido.comentario || '',
                        idtopings: idtopingsArray || []
                    }));

                    status_array.forEach((element: any) => {
                        var toppings = element.toppings;
                        if (toppings) {
                            var topings_ = toppings.split(',');
                            idtopingsArray = [];
                            topings_.forEach((elementopping: any) => {
                                const topping = this.multiselectToppings.find((t: any) => t.idtopings == elementopping);
                                if (topping) idtopingsArray.push({ idtopings: topping.idtopings, nombre: topping.nombre });
                                const lastDetalle = this.NuevoPedido.pedidodetalle.find((detalle) => detalle.idproducto == element.idproducto);
                                // Asegurarse de que lastDetalle no sea undefined
                                if (lastDetalle) {
                                    lastDetalle.idtopings = [...idtopingsArray];
                                }
                            });
                        }
                    });

                    // ACA ME QEDOOOOOOOOOOOOOOO

                    // Si idtopings es igual a "1", buscar el topping correspondiente en multiselectToppings
                    // Buscar el topping en multiselectToppings

                    if (status_array.length > 0) {
                        this.comentarios = status_array[0].comentario;
                        return this.Pedidos.filter((p) => p.mesa === numMesa);
                    }
                } else {
                    // alert(1);
                    // alert('No hay pedidos en esta mesa');
                }
            } else if (this.mesaSeleccionada) {
                [];
            }
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

    calculateTotalPedidos(numeroMesa: string, pedidoMesaStatus: boolean): number {
        const pedidos = this.getPedidosDeMesa(numeroMesa, pedidoMesaStatus);
        return pedidos.reduce((total, pedido) => total + pedido.cantidad * pedido.precioU, 0);
    }
    LimpiarNuevoPedido(): void {
        this.estadomesa.forEach((element: any) => {
            element.value = 0; // Cambia el estado a libre
        });
        this.tipomodal = 'Registrar';
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
            pedidodetalle: [],
            visa: 0,
            yape: 0,
            plin: 0,
            efectivo: 0
        };
    }

    imprimirpedidodialog(Pedidos: Pedido[]) {
        this.imprimirPedidoDialog = true;
        this.pedidosSeleccionados = [];
    }

    imprimirSeleccionados() {
        this.pedidosSeleccionados = this.Pedidos.filter((p) => p.seleccionado);
        this.estadopedido = 0;
        var inicial = 100;
        var items = this.pedidosSeleccionados.length;

        const increments = [
            { threshold: 4, value: 3 },
            { threshold: 5, value: 2 },
            { threshold: 6, value: 2 },
            { threshold: 7, value: 5 },
            { threshold: 8, value: 6 },
            { threshold: 9, value: 8 },
            { threshold: 10, value: 5 },
            { threshold: 11, value: 5 },
            { threshold: 12, value: 5 },
            { threshold: 13, value: 5 },
            { threshold: 14, value: 5 },
            { threshold: 15, value: 5 },
            { threshold: 16, value: 5 },
            { threshold: 17, value: 5 },
            { threshold: 18, value: 5 },
            { threshold: 19, value: 5 },
            { threshold: 20, value: 5 }
        ];

        for (const increment of increments) {
            if (items >= increment.threshold) {
                inicial += increment.value;
            }
        }

        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [80, inicial] // Ticket en tamaño pequeño
        });

        let y = 15;
        const centerX = 40; // Mitad del ticket (80 mm de ancho)
        doc.setFont('helvetica', 'bold');

        // Encabezado
        y += 5;

        doc.setFontSize(14);

        // Datos
        doc.text('Fecha: 09/05/2025 18:06:56', 42, y, { align: 'center' });
        y += 5;
        debugger;

        doc.text('Mesa:' + this.pedidosSeleccionados[0].mesa, 42, y, { align: 'center' });
        y += 7;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);

        const data: any = [];

        this.pedidosSeleccionados.forEach((element: any) => {
            if (element.lugarpedido == '1') {
                this.estadopedido = 1; // Para llevar
            }
            if (element.lugarpedido == 0) data.push([element.cantidad, element.nombre, element.precioU * element.cantidad]);
        });
        if (data.length > 0) {
            doc.setFont('helvetica', 'bold');

            doc.text('PEDIDOS PARA MESA', centerX, y, { align: 'center' });
            y += 5;
            doc.text('=============================', centerX, y, { align: 'center' });
            y += 5;
            doc.setFont('helvetica', 'normal');
        }
        data.forEach((element: any) => {
            const col1X = 5; // Posición X para la cantidad
            const col2X = 9; // Posición X para el nombre del producto
            const col3X = 69; // Posición X para el precio (ajusta según necesites)

            doc.text(element[0].toString(), col1X, y);
            doc.text(element[1], col2X, y);
            doc.text('S/' + element[2].toString(), col3X, y);
            y += 4.5;
        });

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        y += 5;
        if (this.estadopedido == 1) {
            doc.text('PEDIDOS PARA LLEVAR', centerX, y, { align: 'center' });
            y += 5;
            doc.text('=============================', centerX, y, { align: 'center' });

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            y += 5;
            this.pedidosSeleccionados.forEach((element: any) => {
                if (element.lugarpedido == '1') {
                    const col1X = 5; // Posición X para la cantidad
                    const col2X = 9; // Posición X para el nombre del producto
                    const col3X = 69; // Posición X para el precio (ajusta según necesites)
                    doc.text(element.cantidad.toString(), col1X, y);
                    doc.text(element.nombre, col2X, y);
                    doc.text('S/' + element.precioU.toString(), col3X, y);
                    y += 4;
                }
            });
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        y += 4;

        doc.text('Comentario :', centerX, y, { align: 'center' });
        y += 4;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);

        const maxWidth = 73; // Ancho máximo en unidades del PDF (ajústalo según tu diseño)
        const comentario = this.pedidosSeleccionados[0].comentario || ''; // Texto del comentario (o string vacío si es null/undefined)
        const lines = doc.splitTextToSize(comentario, maxWidth);
        // Posición inicial (x, y)
        let x = 5;
        let currentY = y; // 'y' es la posición vertical inicial que ya tienes definida

        // Imprimir cada línea
        lines.forEach((line: string | string[]) => {
            doc.text(line, x, currentY);
            currentY += 4; // Espacio entre líneas (ajusta según necesidad)
        });
        y += 5;
        doc.setFontSize(8);
        this.pedidosSeleccionados.forEach((element: any) => {
            var toppings = element.toppings;

            if (toppings && toppings != 0) {
                var topings_ = toppings.split(',');
                var texto_topping = '';
                topings_.forEach((elementopping: any) => {
                    const topping = this.multiselectToppings.find((t: any) => t.idtopings == elementopping);
                    if (topping) texto_topping += topping.nombre + ', ';

                    // idtopings: topping.idtopings, nombre: topping.nombre  ;
                    // const lastDetalle = this.NuevoPedido.pedidodetalle.find((detalle) => detalle.idproducto == element.idproducto);
                    // // Asegurarse de que lastDetalle no sea undefined
                    // if (lastDetalle) {
                    //     lastDetalle.idtopings = [...idtopingsArray];
                    // }
                });
                doc.setFont('helvetica', 'bold');
                doc.text(element.nombre, centerX, y, { align: 'center' });

                const fontSize = doc.getFontSize(); // Obtiene el tamaño de fuente actual
                y += fontSize * 0.4; // Ajuste fino (0.2 es un factor para reducir espacio)
                doc.text(texto_topping, centerX, y, { align: 'center' });
                y += 6;
            }
        });

        // Cuando la imagen se cargue, agregarla al PDF
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        this.PDFdescargar(pdfUrl);
        this.imprimirPedidoDialog = false; // Cerrar el diálogo después de imprimir
    }
    AddKeyPress(e: Event | undefined, buscarPlato: string) {
        e = e || window.event;
        const keyboardEvent = e as KeyboardEvent;
        if (keyboardEvent.keyCode === 13) {
            const table = document.getElementById('listarPlatos');
            if (table) {
                table.innerHTML = '';
            }
            this.BuscarPlatoSearchText(buscarPlato);
        }
        return true;
    }

    AddKeyPressCalculator(e: Event | undefined, buscarPlato: string) {
        e = e || window.event;
        const keyboardEvent = e as KeyboardEvent;
        if (keyboardEvent.keyCode === 13) {
            this.ListarPedidoNumeroCalculadora();
        }
        return true;
    }
    toggleTodos(event: any) {
        const checked = event.target.checked;
        this.Pedidos.forEach((p) => (p.seleccionado = checked));
    }
    toggleDataTable(op: Popover, event: any, pedidosdetalle: NuevoPedidodetalle) {
        console.log('toggleDataTable', this.NuevoPedido.pedidodetalle);
        const index = this.NuevoPedido.pedidodetalle.findIndex((detalle) => detalle.idpedido === pedidosdetalle.idpedido);
        // this.NuevoPedido.pedidodetalle[index].idtopings = [{ idtopings: 0, nombre: '' }]; // Inicializar con un objeto por defecto

        this.isDropdownOpen = this.isDropdownOpen;
        op.toggle(event);
        this.cargarToppingsSeleccionados(pedidosdetalle);
    }
    onProductSelect(op: Popover, event: any) {
        op.hide();
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event?.data.name, life: 3000 });
    }
}

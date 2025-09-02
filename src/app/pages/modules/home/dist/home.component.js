"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var imports_1 = require("../../imports");
var api_1 = require("primeng/api");
var rxjs_1 = require("rxjs");
var forms_1 = require("@angular/forms");
var jspdf_1 = require("jspdf");
var unique_pipe_1 = require("../../../model/util/unique.pipe");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(confirmationService, homeService, PedidoService, messageService, cd, sanitizer) {
        this.confirmationService = confirmationService;
        this.homeService = homeService;
        this.PedidoService = PedidoService;
        this.messageService = messageService;
        this.cd = cd;
        this.sanitizer = sanitizer;
        this.products = [];
        this.isLoading = false; // Para activar/desactivar el loader
        this.selectedToppings = []; // O puedes inicializar con algunos seleccionados
        this.isDropdownOpen = false;
        this.multiselectToppings = [];
        this.discount = 0;
        this.switchValue = false;
        this.pedidosSeleccionados = [];
        this.isPanelVisible = true;
        this.mesas = [];
        this.Pedidos = [];
        this.estadomesa = [
            {
                mesa: 0,
                value: 0
            }
        ];
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
        this.calculator_Dialog = false;
        this.displayModalCalculator = false;
        this.mesaSeleccionada = null;
        this.pedido_mesa_status = false;
        this.numeroPlato = null;
        this.comentarios = '';
        this.tipomodal = 'Registrar';
        this.Cobrar_Dialog = false;
        this.PDF_Dialog = false;
        this.pdfUrl = null;
        this.CocinaPdf_Dialog = false;
        this.eliminarPedidoDialog = false;
        this.imprimirPedidoDialog = false;
        this.estadopedido = 0;
        this.buscarPlato = '';
    }
    HomeComponent.prototype.ngOnInit = function () {
        // LoaderComponent.isLoading = true; // Set loading state to true
        this.cargarMesas();
        this.ListarToppings();
    };
    HomeComponent.prototype.setNumbersSelectDashboard = function (value) {
        var _a;
        if (value === 'clear') {
            this.numeroPlato = null;
        }
        else {
            this.numeroPlato = Number("" + ((_a = this.numeroPlato) !== null && _a !== void 0 ? _a : '') + value);
        }
    };
    HomeComponent.prototype.getTotal = function (campo, value) {
        if (this.NuevoPedido[campo] !== undefined) {
            this.NuevoPedido[campo] = value;
        }
        return this.NuevoPedido[campo] || 0;
    };
    HomeComponent.prototype.hideDialog = function () {
        this.Cobrar_Dialog = false;
    };
    HomeComponent.prototype.CobrarPedido = function (NuevoPedido) {
        var _this = this;
        var total_ingresado = Number(this.Pedido_cobrar.yape || 0) + Number(this.Pedido_cobrar.visa || 0) + Number(this.Pedido_cobrar.plin || 0) + Number(this.Pedido_cobrar.efectivo || 0);
        this.Pedido_cobrar.idpedido = NuevoPedido.idpedido;
        if (total_ingresado === NuevoPedido.total) {
            this.PedidoService.CobrarPedido(this.Pedido_cobrar).subscribe(function (response) {
                _this.LimpiarNuevoPedido();
                _this.cargarMesas();
                _this.Cobrar_Dialog = false;
                _this.mesaSeleccionada = null;
                _this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Se ha cobrado correctamente el pedido',
                    life: 3000
                });
            });
        }
        else {
            this.messageService.add({
                severity: 'error',
                summary: 'Aviso importante',
                detail: 'No coincide los montos al cobrar con el total',
                life: 3000
            });
        }
    };
    HomeComponent.prototype.CobrarDialog = function (mesa) {
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
        var status_array = this.Pedidos.filter(function (p) { return p.mesa === mesa.numero; });
        if (status_array.length > 0) {
            this.NuevoPedido = this.getPedidoClick(status_array);
        }
    };
    HomeComponent.prototype.ListarPedidoNumeroCalculadora = function () {
        var _this = this;
        this.PedidoService.BuscarPlatoSearch(this.numeroPlato, 'p.numero_carta').subscribe(function (response) {
            if (response.success) {
                if (response.data) {
                    _this.displayModalCalculator = false;
                    _this.cd.detectChanges(); // Forzar detección de cambios
                    response.data[0].cantidad = 1; // Inicializar cantidad en 1
                    response.data[0].total = response.data[0].preciounitario; // Inicializar cantidad en 1
                    response.data[0].lugarpedido = '0'; // Inicializar cantidad en 1
                    response.data[0].idtopings = [{ idtopings: 0, nombre: '' }]; // Inicializar toppings
                    _this.NuevoPedido.pedidodetalle.push(response.data[0]);
                }
                else {
                    _this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'No contiene informaciòn la consulta BuscarPlatoSearch' });
                }
            }
            else {
                alert('Hubo un problema al conectar con el servidor');
            }
        }, function (error) {
            console.error('Error al intentar consultar', error);
            alert('Hubo un problema al conectar con el servidor');
        });
    };
    HomeComponent.prototype.cargarToppingsSeleccionados = function (pedidosdetalle) {
        var detalle = this.NuevoPedido.pedidodetalle.find(function (d) { return d.idpedidodetalle === pedidosdetalle.idpedidodetalle; });
        if (detalle && Array.isArray(detalle.idtopings)) {
            this.selectedToppings = detalle.idtopings.map(function (topping) { return ({
                idtopings: topping.idtopings,
                nombre: topping.nombre
            }); });
        }
        else {
            this.selectedToppings = [];
        }
    };
    HomeComponent.prototype.agregarToppingsPedido = function (pedidosdetalle, op, index) {
        if (pedidosdetalle.idpedidodetalle != 0) {
            var detalleIndex = this.NuevoPedido.pedidodetalle.findIndex(function (d) { return d.idpedidodetalle === pedidosdetalle.idpedidodetalle; });
        }
        else {
            var detalleIndex = this.NuevoPedido.pedidodetalle[index] ? index : -1; // Buscar el índice del detalle en el array
        }
        if (this.selectedToppings.length > 0) {
            if (detalleIndex === -1) {
                // Si no existe, crear nuevo detalle
                var nuevoDetalle = {
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
            this.NuevoPedido.pedidodetalle[detalleIndex].idtopings = __spreadArrays(this.selectedToppings);
            this.selectedToppings = [];
            this.isDropdownOpen = false;
        }
        else {
            if (typeof detalleIndex === 'number' && detalleIndex >= 0) {
                this.NuevoPedido.pedidodetalle[detalleIndex].idtopings = [];
            }
        }
        op.hide();
    };
    HomeComponent.prototype.ListarToppings = function () {
        var _this = this;
        this.PedidoService.ListarToppings().subscribe(function (response) {
            if (response.success) {
                if (response.data) {
                    _this.multiselectToppings = response.data;
                    _this.cd.detectChanges(); // Forzar detección de cambios
                }
                else {
                    _this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'No contiene informaciòn la consulta BuscarPlatoSearch' });
                }
            }
            else {
                alert('Hubo un problema al conectar con el servidor');
            }
        }, function (error) {
            console.error('Error al intentar consultar', error);
            alert('Hubo un problema al conectar con el servidor');
        });
    };
    HomeComponent.prototype.BuscarPlatoSearchText = function (buscarPlato) {
        var _this = this;
        this.PedidoService.BuscarPlatoSearch(buscarPlato, 'nombre').subscribe(function (response) {
            if (response.success) {
                if (response.data) {
                    // Construir el HTML para cada fila y agregarlo a la tabla
                    var table_1 = document.getElementById('listarPlatos');
                    if (table_1) {
                        response.data.forEach(function (element) {
                            var tr = document.createElement('tr');
                            tr.onclick = function (event) {
                                _this.agregarProducto(element, true);
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
                            table_1.appendChild(tr);
                        });
                    }
                }
            }
        });
    };
    HomeComponent.prototype.agregarProducto = function (element, arg1) {
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
    };
    HomeComponent.prototype.returntoMesas = function () {
        if (this.NuevoPedido.pedidodetalle.length > 0) {
            if (this.mesaSeleccionada) {
                this.seleccionarMesa(this.mesaSeleccionada);
            }
        }
    };
    HomeComponent.prototype.incrementnewPedido = function (product) {
        product.cantidad++;
        product.total = product.cantidad * product.preciounitario;
    };
    HomeComponent.prototype.decrementnewPedido = function (product) {
        if (product.cantidad > 1) {
            product.cantidad--;
            product.total = product.cantidad * product.preciounitario;
        }
    };
    HomeComponent.prototype.remove = function (product) {
        var index = this.products.indexOf(product);
        if (index > -1) {
            this.products.splice(index, 1);
        }
    };
    HomeComponent.prototype.total = function () {
        return this.NuevoPedido.pedidodetalle.reduce(function (sum, product) { return sum + product.preciounitario * product.cantidad; }, 0) - this.discount;
    };
    HomeComponent.prototype.EditarPedido = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.mesaSeleccionada) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.PedidoService.EditarPedido(this.NuevoPedido, this.comentarios)];
                    case 1:
                        (_a.sent())
                            .pipe(rxjs_1.switchMap(function (pedidoResponse) {
                            // Creamos un array de observables para los detalles
                            var detallesObservables = _this.NuevoPedido.pedidodetalle.map(function (element) {
                                element.idpedido = _this.NuevoPedido.idpedido;
                                element.id_created_at = 0;
                                return _this.PedidoService.insertPedidoDetalle(element);
                            });
                            // Usamos forkJoin para esperar a que TODOS los detalles se completen
                            return rxjs_1.forkJoin(detallesObservables);
                        }))
                            .subscribe({
                            next: function () {
                                _this.cargarMesas();
                                if (_this.mesaSeleccionada) {
                                    _this.seleccionarMesa(_this.mesaSeleccionada);
                                }
                                _this.messageService.add({
                                    severity: 'success',
                                    summary: 'Successful',
                                    detail: 'Pedido Modificado correctamente',
                                    life: 3000
                                });
                            },
                            error: function (error) {
                                console.error('Error en el proceso completo:', error);
                                _this.messageService.add({
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'Ocurrió un error al registrar el pedido',
                                    life: 3000
                                });
                            }
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        alert('Seleccione una mesa para crear el pedido');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.trashPedido = function (pedido) {
        var index = this.NuevoPedido.pedidodetalle.indexOf(pedido);
        if (index > -1) {
            this.NuevoPedido.pedidodetalle.splice(index, 1);
        }
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Se elimino correctamente',
            life: 3000
        });
    };
    HomeComponent.prototype.deletePedido = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.motivo) {
                            this.motivoTextarea.nativeElement.focus();
                            this.messageService.add({
                                severity: 'warn',
                                summary: 'Aviso',
                                detail: 'Ingresar motivo de eliminaciòn',
                                life: 3000
                            });
                            return [2 /*return*/];
                        }
                        if (!this.responsable) {
                            this.responsableTextarea.nativeElement.focus();
                            this.messageService.add({
                                severity: 'warn',
                                summary: 'Aviso',
                                detail: 'Ingresar respopnsable de eliminaciòn',
                                life: 3000
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.PedidoService.deletePedido(this.NuevoPedido.idpedido, this.motivo, this.responsable)];
                    case 1:
                        (_a.sent()).subscribe(function (response) {
                            _this.LimpiarNuevoPedido();
                            _this.cargarMesas();
                            _this.mesaSeleccionada = null;
                            _this.eliminarPedidoDialog = false;
                            _this.cd.detectChanges(); // Forzar detección de cambios
                            _this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'Product Deleted',
                                life: 3000
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.FunctionButtonPedido = function (pedido) {
        if (this.tipomodal === 'Registrar') {
            this.RegistrarPedido();
        }
        else if (this.tipomodal === 'Editar') {
            this.EditarPedido();
        }
    };
    HomeComponent.prototype.RegistrarPedido = function () {
        var _this = this;
        this.isLoading = true; // Activar el loader
        if (this.mesaSeleccionada) {
            this.PedidoService.insertPedido(this.NuevoPedido, this.mesaSeleccionada.numero, this.comentarios)
                .pipe(rxjs_1.switchMap(function (pedidoResponse) {
                var pedidoId = pedidoResponse.data[0].id;
                // Creamos un array de observables para los detalles
                var detallesObservables = _this.NuevoPedido.pedidodetalle.map(function (element) {
                    element.idpedido = pedidoId;
                    return _this.PedidoService.insertPedidoDetalle(element);
                });
                // Usamos forkJoin para esperar a que TODOS los detalles se completen
                return rxjs_1.forkJoin(detallesObservables);
            }))
                .subscribe({
                next: function () { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.cargarMesas()];
                            case 1:
                                _a.sent();
                                setTimeout(function () {
                                    _this.isLoading = false;
                                    if (_this.mesaSeleccionada) {
                                        _this.seleccionarMesa(_this.mesaSeleccionada);
                                    }
                                }, 1000);
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Successful',
                                    detail: 'Pedido registrado correctamente',
                                    life: 3000
                                });
                                return [2 /*return*/];
                        }
                    });
                }); },
                error: function (error) {
                    console.error('Error en el proceso completo:', error);
                    _this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Ocurrió un error al registrar el pedido',
                        life: 3000
                    });
                }
            });
        }
        else {
            alert('Seleccione una mesa para crear el pedido');
        }
    };
    HomeComponent.prototype.editar = function (mesa, pedido) {
        // this.LimpiarNuevoPedido();
        this.buscarPlato = '';
        this.pedido_mesa_status = false;
        var status_array = this.Pedidos.filter(function (p) { return p.mesa === mesa.numero; });
        this.NuevoPedido = this.getPedidoClick(status_array);
    };
    HomeComponent.prototype.getPedidoClick = function (status_array) {
        var _this = this;
        var _a;
        var idtopingsArray = [];
        if (status_array.length > 0) {
            this.NuevoPedido = {
                idpedido: ((_a = status_array[0]) === null || _a === void 0 ? void 0 : _a.idpedido) || 0,
                lugarpedido: undefined,
                pedido_estado: undefined,
                nombre: undefined,
                cantidad: status_array.length,
                descripcion: '',
                estado: false,
                lugar: '',
                preciounitario: 0,
                total: this.NuevoPedido.pedidodetalle.reduce(function (sum, product) { return sum + product.preciounitario * product.cantidad; }, 0),
                descuento: 0,
                comentario: '',
                pedidodetalle: [],
                visa: 0,
                yape: 0,
                plin: 0,
                efectivo: 0
            };
            this.NuevoPedido.pedidodetalle = status_array.map(function (pedido) { return ({
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
            }); });
            status_array.forEach(function (element) {
                var toppings = element.toppings;
                if (toppings) {
                    var topings_ = toppings.split(',');
                    idtopingsArray = [];
                    topings_.forEach(function (elementopping) {
                        var topping = _this.multiselectToppings.find(function (t) { return t.idtopings == elementopping; });
                        if (topping)
                            idtopingsArray.push({ idtopings: topping.idtopings, nombre: topping.nombre });
                        var lastDetalle = _this.NuevoPedido.pedidodetalle.find(function (detalle) { return detalle.idpedidodetalle == element.idpedidodetalle; });
                        // Asegurarse de que lastDetalle no sea undefined
                        if (lastDetalle) {
                            lastDetalle.idtopings = __spreadArrays(idtopingsArray);
                        }
                    });
                }
            });
            this.comentarios = status_array[0].comentario;
        }
        else {
            // alert(2)
            // alert('No hay pedidos en esta mesa');
        }
        return this.NuevoPedido;
    };
    HomeComponent.prototype.cargarMesas = function () {
        var _this = this;
        this.homeService.getMesas().subscribe(function (response) {
            if (response.success) {
                _this.mesas = response.data;
                _this.mesas.forEach(function (element) {
                    _this.estadomesa.push({ mesa: element.numero, value: 0 });
                });
                _this.ListarPedidos();
            }
            else {
                alert('Error al intentar consultar');
            }
        }, function (error) {
            console.error('Error al intentar consultar', error);
            alert('Hubo un problema al conectar con el servidor');
        });
    };
    HomeComponent.prototype.showModal = function () {
        this.displayModalCalculator = true;
        this.numeroPlato = null;
    };
    HomeComponent.prototype.pricechange = function (pedidosnew) {
        if (pedidosnew.preciounitario > 0) {
            pedidosnew.total = pedidosnew.cantidad * pedidosnew.preciounitario;
        }
    };
    HomeComponent.prototype.ListarPedidos = function () {
        var _this = this;
        this.Pedidos = [];
        this.PedidoService.ListarPedidosMesa().subscribe(function (response) {
            if (response.success) {
                debugger;
                _this.Pedidos = response.data;
                if (response.data && response.data.length > 0) {
                    _this.estadomesa.forEach(function (element) {
                        var hayPedido = _this.Pedidos.some(function (pedido) { return pedido.mesa === element.mesa; });
                        element.value = hayPedido ? 1 : 0;
                    });
                }
                else {
                    _this.LimpiarNuevoPedido();
                }
            }
            else {
                alert('Error al intentar consultar');
            }
        }, function (error) {
            console.error('Error al intentar consultar', error);
            alert('Hubo un problema al conectar con el servidor');
        });
    };
    HomeComponent.prototype.seleccionarMesa = function (mesa) {
        var _this = this;
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
        if (mesa.numero == '0') {
            this.NuevoPedido.delivery = 1;
        }
        else {
            this.NuevoPedido.delivery = 0;
        }
        if (this.Pedidos) {
            var status_array = this.Pedidos.filter(function (p) { return p.mesa === mesa.numero; });
            if (status_array.length > 0) {
                this.pedido_mesa_status = true;
                this.tipomodal = 'Editar';
            }
            else {
                this.tipomodal = 'Registrar';
            }
        }
        this.BuscarPlatoSearchText('');
        setTimeout(function () {
            _this.isLoading = false;
        }, 300);
    };
    HomeComponent.prototype.loadImageBase64 = function (path) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = path;
            img.onload = function () {
                var canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext('2d');
                if (!ctx)
                    return reject('No se pudo obtener el contexto del canvas');
                ctx.drawImage(img, 0, 0);
                var dataURL = canvas.toDataURL('image/png');
                resolve(dataURL);
            };
            img.onerror = function (error) { return reject(error); };
        });
    };
    HomeComponent.prototype.generatePDF = function (pedido) {
        var _this = this;
        this.isLoading = true;
        this.loadImageBase64('assets/img/logo.png').then(function (base64Logo) {
            _this.PedidoService.ShowProductosPdf(pedido.idpedido).subscribe(function (response) {
                var inicial = 115;
                var items = response.data.length;
                var increments = [
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
                for (var _i = 0, increments_1 = increments; _i < increments_1.length; _i++) {
                    var increment = increments_1[_i];
                    if (items >= increment.threshold) {
                        inicial += increment.value;
                    }
                }
                var doc = new jspdf_1.jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: [80, inicial] // Ticket en tamaño pequeño
                });
                var y = 10;
                var centerX = 40; // Mitad del ticket (80 mm de ancho)
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
                var datePart = date.toLocaleDateString('en-US');
                var timePart = date.toLocaleTimeString('en-US');
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
                var data = [];
                response.data.forEach(function (element) {
                    data.push([element.cantidad, element.nombre, element.precioU * element.cantidad]);
                });
                data.forEach(function (element) {
                    var col1X = 7; // Posición X para la cantidad
                    var col2X = 12; // Posición X para el nombre del producto
                    var col3X = 69; // Posición X para el precio (ajusta según necesites)
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
                var pdfBlob = doc.output('blob');
                var pdfUrl = URL.createObjectURL(pdfBlob);
                _this.PDFdescargar(pdfUrl);
                _this.isLoading = false;
            });
        });
    };
    HomeComponent.prototype.hideDialogPdf = function () {
        this.PDF_Dialog = false;
        this.CocinaPdf_Dialog = false;
        this.eliminarPedidoDialog = false;
    };
    HomeComponent.prototype.deletepedidoModal = function () {
        this.eliminarPedidoDialog = true;
        this.motivo = '';
        this.responsable = '';
    };
    HomeComponent.prototype.generateCocinaPDF = function (pedido) {
        var _this = this;
        this.isLoading = true; // Activar el loader
        this.PedidoService.ShowProductosPdf(pedido.idpedido).subscribe(function (response) {
            _this.estadopedido = 0;
            var inicial = 100;
            var items = response.data.length;
            var increments = [
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
            for (var _i = 0, increments_2 = increments; _i < increments_2.length; _i++) {
                var increment = increments_2[_i];
                if (items >= increment.threshold) {
                    inicial += increment.value;
                }
            }
            response.data.forEach(function (element) {
                var toppings = element.toppings;
                if (toppings && toppings != 0) {
                    var topings_ = toppings.split(',');
                    var texto_topping = '';
                    topings_.forEach(function (elementopping) {
                        var topping = _this.multiselectToppings.find(function (t) { return t.idtopings == elementopping; });
                        if (topping)
                            texto_topping += topping.nombre + ', ';
                    });
                    inicial += 4;
                }
            });
            var doc = new jspdf_1.jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [80, inicial] // Ticket en tamaño pequeño
            });
            var y = 15;
            var centerX = 40; // Mitad del ticket (80 mm de ancho)
            doc.setFont('helvetica', 'bold');
            // Encabezado
            y += 5;
            doc.setFontSize(14);
            debugger;
            var date = new Date(response.data[0].created_at);
            var datePart = date.toLocaleDateString('en-US');
            var timePart = date.toLocaleTimeString('en-US');
            // Datos
            doc.text('Fecha: ' + datePart + ' ' + timePart, 42, y, { align: 'center' }); // Datos
            y += 5;
            doc.text('Mesa: ' + response.data[0].mesa, 42, y, { align: 'center' });
            y += 7;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            var data = [];
            response.data.forEach(function (element) {
                if (element.lugarpedido == '1') {
                    _this.estadopedido = 1; // Para llevar
                }
                if (element.lugarpedido == 0)
                    data.push([element.cantidad, element.nombre, element.precioU * element.cantidad]);
            });
            if (data.length > 0) {
                doc.setFont('helvetica', 'bold');
                doc.text('PEDIDOS PARA MESA', centerX, y, { align: 'center' });
                y += 5;
                doc.text('=============================', centerX, y, { align: 'center' });
                y += 5;
                doc.setFont('helvetica', 'normal');
            }
            data.forEach(function (element) {
                var col1X = 5; // Posición X para la cantidad
                var col2X = 9; // Posición X para el nombre del producto
                var col3X = 69; // Posición X para el precio (ajusta según necesites)
                doc.text(element[0].toString(), col1X, y);
                doc.text(element[1], col2X, y);
                doc.text('S/' + element[2].toString(), col3X, y);
                y += 4.5;
            });
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            y += 5;
            if (_this.estadopedido == 1) {
                doc.text('PEDIDOS PARA LLEVAR', centerX, y, { align: 'center' });
                y += 5;
                doc.text('=============================', centerX, y, { align: 'center' });
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(12);
                y += 5;
                response.data.forEach(function (element) {
                    if (element.lugarpedido == '1') {
                        var col1X = 5; // Posición X para la cantidad
                        var col2X = 9; // Posición X para el nombre del producto
                        var col3X = 69; // Posición X para el precio (ajusta según necesites)
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
            var maxWidth = 73; // Ancho máximo en unidades del PDF (ajústalo según tu diseño)
            var comentario = response.data[0].comentario || ''; // Texto del comentario (o string vacío si es null/undefined)
            var lines = doc.splitTextToSize(comentario, maxWidth);
            // Posición inicial (x, y)
            var x = 5;
            var currentY = y; // 'y' es la posición vertical inicial que ya tienes definida
            // Imprimir cada línea
            lines.forEach(function (line) {
                doc.text(line, x, currentY);
                currentY += 4; // Espacio entre líneas (ajusta según necesidad)
            });
            y += 5;
            doc.setFontSize(8);
            response.data.forEach(function (element) {
                var toppings = element.toppings;
                if (toppings && toppings != 0) {
                    var topings_ = toppings.split(',');
                    var texto_topping = '';
                    topings_.forEach(function (elementopping) {
                        var topping = _this.multiselectToppings.find(function (t) { return t.idtopings == elementopping; });
                        if (topping)
                            texto_topping += topping.nombre + ', ';
                        // idtopings: topping.idtopings, nombre: topping.nombre  ;
                        // const lastDetalle = this.NuevoPedido.pedidodetalle.find((detalle) => detalle.idproducto == element.idproducto);
                        // // Asegurarse de que lastDetalle no sea undefined
                        // if (lastDetalle) {
                        //     lastDetalle.idtopings = [...idtopingsArray];
                        // }
                    });
                    doc.setFont('helvetica', 'bold');
                    doc.text(element.nombre, centerX, y, { align: 'center' });
                    var fontSize = doc.getFontSize(); // Obtiene el tamaño de fuente actual
                    y += fontSize * 0.4; // Ajuste fino (0.2 es un factor para reducir espacio)
                    doc.text(texto_topping, centerX, y, { align: 'center' });
                    y += 6;
                }
            });
            // Cuando la imagen se cargue, agregarla al PDF
            var pdfBlob = doc.output('blob');
            var pdfUrl = URL.createObjectURL(pdfBlob);
            _this.PDFdescargar(pdfUrl);
            _this.isLoading = false; // Desactivar el loader
        });
    };
    HomeComponent.prototype.PDFdescargar = function (pdf) {
        this.PDF_Dialog = true;
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdf);
    };
    HomeComponent.prototype.PDFCocinadescargar = function (pdf) {
        this.CocinaPdf_Dialog = true;
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdf);
    };
    HomeComponent.prototype.getPedidosDeMesa = function (numMesa, statuspedido) {
        var _this = this;
        var _a;
        if (this.Pedidos) {
            if (statuspedido == true) {
                var status_array = this.Pedidos.filter(function (p) { return p.mesa == numMesa; }).sort(function (a, b) {
                    if (a.categoria !== b.categoria) {
                        return Number(b.categoria) - Number(a.categoria); // ↓
                    }
                    return Number(a.categoria) - Number(b.categoria); // ↑
                });
                var idtopingsArray = [];
                if (status_array.length != 0) {
                    this.NuevoPedido = {
                        idpedido: ((_a = status_array[0]) === null || _a === void 0 ? void 0 : _a.idpedido) || 0,
                        lugarpedido: undefined,
                        pedido_estado: undefined,
                        nombre: undefined,
                        cantidad: 0,
                        descripcion: '',
                        estado: false,
                        lugar: '',
                        preciounitario: 0,
                        total: this.NuevoPedido.pedidodetalle.reduce(function (sum, product) { return sum + product.preciounitario * product.cantidad; }, 0),
                        descuento: 0,
                        comentario: '',
                        pedidodetalle: [],
                        visa: 0,
                        yape: 0,
                        plin: 0,
                        efectivo: 0
                    };
                    this.NuevoPedido.pedidodetalle = status_array.map(function (pedido) { return ({
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
                    }); });
                    status_array.forEach(function (element) {
                        var toppings = element.toppings;
                        if (toppings) {
                            var topings_ = toppings.split(',');
                            idtopingsArray = [];
                            topings_.forEach(function (elementopping) {
                                var topping = _this.multiselectToppings.find(function (t) { return t.idtopings == elementopping; });
                                if (topping)
                                    idtopingsArray.push({ idtopings: topping.idtopings, nombre: topping.nombre });
                                var lastDetalle = _this.NuevoPedido.pedidodetalle.find(function (detalle) { return detalle.idproducto == element.idproducto; });
                                // Asegurarse de que lastDetalle no sea undefined
                                if (lastDetalle) {
                                    lastDetalle.idtopings = __spreadArrays(idtopingsArray);
                                }
                            });
                        }
                    });
                    // ACA ME QEDOOOOOOOOOOOOOOO
                    // Si idtopings es igual a "1", buscar el topping correspondiente en multiselectToppings
                    // Buscar el topping en multiselectToppings
                    if (status_array.length > 0) {
                        this.comentarios = status_array[0].comentario;
                        return this.Pedidos.filter(function (p) { return p.mesa === numMesa; });
                    }
                }
                else {
                    // alert(1);
                    // alert('No hay pedidos en esta mesa');
                }
            }
            else if (this.mesaSeleccionada) {
                [];
            }
        }
        return [];
    };
    HomeComponent.prototype.onlyNumberKey = function (event) {
        var charCode = event.which ? event.which : event.keyCode;
        // Solo permitir números (0-9)
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    };
    HomeComponent.prototype.calculateTotalPedidos = function (numeroMesa, pedidoMesaStatus) {
        var pedidos = this.getPedidosDeMesa(numeroMesa, pedidoMesaStatus);
        // return
        return pedidos.reduce(function (total, pedido) {
            return total + pedido.cantidad * pedido.precioU;
        }, 0);
    };
    HomeComponent.prototype.LimpiarNuevoPedido = function () {
        this.estadomesa.forEach(function (element) {
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
    };
    HomeComponent.prototype.imprimirpedidodialog = function (Pedidos) {
        this.imprimirPedidoDialog = true;
        this.pedidosSeleccionados = [];
    };
    HomeComponent.prototype.imprimirSeleccionados = function () {
        var _this = this;
        this.pedidosSeleccionados = this.Pedidos.filter(function (p) { return p.seleccionado; });
        this.estadopedido = 0;
        var inicial = 100;
        var items = this.pedidosSeleccionados.length;
        var increments = [
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
        for (var _i = 0, increments_3 = increments; _i < increments_3.length; _i++) {
            var increment = increments_3[_i];
            if (items >= increment.threshold) {
                inicial += increment.value;
            }
        }
        var doc = new jspdf_1.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: [80, inicial] // Ticket en tamaño pequeño
        });
        var y = 15;
        var centerX = 40; // Mitad del ticket (80 mm de ancho)
        doc.setFont('helvetica', 'bold');
        // Encabezado
        y += 5;
        doc.setFontSize(14);
        var date = new Date(this.pedidosSeleccionados[0].created_at);
        var datePart = date.toLocaleDateString('en-US');
        var timePart = date.toLocaleTimeString('en-US');
        // Datos
        doc.text('Fecha: ' + datePart + ' ' + timePart, 42, y, { align: 'center' });
        y += 5;
        doc.text('Mesa:' + this.pedidosSeleccionados[0].mesa, 42, y, { align: 'center' });
        y += 7;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        var data = [];
        this.pedidosSeleccionados.forEach(function (element) {
            if (element.lugarpedido == '1') {
                _this.estadopedido = 1; // Para llevar
            }
            if (element.lugarpedido == 0)
                data.push([element.cantidad, element.nombre, element.precioU * element.cantidad]);
        });
        if (data.length > 0) {
            doc.setFont('helvetica', 'bold');
            doc.text('PEDIDOS PARA MESA', centerX, y, { align: 'center' });
            y += 5;
            doc.text('=============================', centerX, y, { align: 'center' });
            y += 5;
            doc.setFont('helvetica', 'normal');
        }
        data.forEach(function (element) {
            var col1X = 5; // Posición X para la cantidad
            var col2X = 9; // Posición X para el nombre del producto
            var col3X = 69; // Posición X para el precio (ajusta según necesites)
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
            this.pedidosSeleccionados.forEach(function (element) {
                if (element.lugarpedido == '1') {
                    var col1X = 5; // Posición X para la cantidad
                    var col2X = 9; // Posición X para el nombre del producto
                    var col3X = 69; // Posición X para el precio (ajusta según necesites)
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
        var maxWidth = 73; // Ancho máximo en unidades del PDF (ajústalo según tu diseño)
        var comentario = this.pedidosSeleccionados[0].comentario || ''; // Texto del comentario (o string vacío si es null/undefined)
        var lines = doc.splitTextToSize(comentario, maxWidth);
        // Posición inicial (x, y)
        var x = 5;
        var currentY = y; // 'y' es la posición vertical inicial que ya tienes definida
        // Imprimir cada línea
        lines.forEach(function (line) {
            doc.text(line, x, currentY);
            currentY += 4; // Espacio entre líneas (ajusta según necesidad)
        });
        y += 5;
        doc.setFontSize(8);
        this.pedidosSeleccionados.forEach(function (element) {
            var toppings = element.toppings;
            if (toppings && toppings != 0) {
                var topings_ = toppings.split(',');
                var texto_topping = '';
                topings_.forEach(function (elementopping) {
                    var topping = _this.multiselectToppings.find(function (t) { return t.idtopings == elementopping; });
                    if (topping)
                        texto_topping += topping.nombre + ', ';
                    // idtopings: topping.idtopings, nombre: topping.nombre  ;
                    // const lastDetalle = this.NuevoPedido.pedidodetalle.find((detalle) => detalle.idproducto == element.idproducto);
                    // // Asegurarse de que lastDetalle no sea undefined
                    // if (lastDetalle) {
                    //     lastDetalle.idtopings = [...idtopingsArray];
                    // }
                });
                doc.setFont('helvetica', 'bold');
                doc.text(element.nombre, centerX, y, { align: 'center' });
                var fontSize = doc.getFontSize(); // Obtiene el tamaño de fuente actual
                y += fontSize * 0.4; // Ajuste fino (0.2 es un factor para reducir espacio)
                doc.text(texto_topping, centerX, y, { align: 'center' });
                y += 6;
            }
        });
        // Cuando la imagen se cargue, agregarla al PDF
        var pdfBlob = doc.output('blob');
        var pdfUrl = URL.createObjectURL(pdfBlob);
        this.PDFdescargar(pdfUrl);
        this.imprimirPedidoDialog = false; // Cerrar el diálogo después de imprimir
    };
    HomeComponent.prototype.AddKeyPress = function (e, buscarPlato) {
        e = e || window.event;
        var keyboardEvent = e;
        if (keyboardEvent.keyCode === 13) {
            var table = document.getElementById('listarPlatos');
            if (table) {
                table.innerHTML = '';
            }
            this.BuscarPlatoSearchText(buscarPlato);
        }
        return true;
    };
    HomeComponent.prototype.AddKeyPressCalculator = function (e, buscarPlato) {
        e = e || window.event;
        var keyboardEvent = e;
        if (keyboardEvent.keyCode === 13) {
            this.ListarPedidoNumeroCalculadora();
        }
        return true;
    };
    HomeComponent.prototype.toggleTodos = function (event) {
        var checked = event.target.checked;
        this.Pedidos.forEach(function (p) { return (p.seleccionado = checked); });
    };
    HomeComponent.prototype.toggleDataTable = function (op, event, pedidosdetalle) {
        console.log('toggleDataTable', this.NuevoPedido.pedidodetalle);
        var index = this.NuevoPedido.pedidodetalle.findIndex(function (detalle) { return detalle.idpedido === pedidosdetalle.idpedido; });
        // this.NuevoPedido.pedidodetalle[index].idtopings = [{ idtopings: 0, nombre: '' }]; // Inicializar con un objeto por defecto
        this.isDropdownOpen = this.isDropdownOpen;
        op.toggle(event);
        this.cargarToppingsSeleccionados(pedidosdetalle);
    };
    HomeComponent.prototype.onProductSelect = function (op, event) {
        op.hide();
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: event === null || event === void 0 ? void 0 : event.data.name, life: 3000 });
    };
    __decorate([
        core_1.ViewChild('motivoTextarea')
    ], HomeComponent.prototype, "motivoTextarea");
    __decorate([
        core_1.ViewChild('multiselect', { static: true })
    ], HomeComponent.prototype, "multiselect");
    __decorate([
        core_1.Input()
    ], HomeComponent.prototype, "isLoading");
    __decorate([
        core_1.ViewChild('responsableTextarea')
    ], HomeComponent.prototype, "responsableTextarea");
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            imports: [common_1.CommonModule, imports_1.ImportsModule, forms_1.FormsModule, unique_pipe_1.UniquePipe],
            providers: [api_1.MessageService, api_1.ConfirmationService],
            templateUrl: './home.component.html',
            styleUrl: './home.component.scss'
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;

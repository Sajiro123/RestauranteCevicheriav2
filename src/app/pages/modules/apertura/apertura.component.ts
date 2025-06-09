import { Component, DebugElement } from '@angular/core';
import { AperturaService } from '../../service/apertura.service';
import { ImportsModule } from '../../imports';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-apertura',
    imports: [CommonModule, ImportsModule, FormsModule], // <-- Add this
    providers: [MessageService, ConfirmationService],
    templateUrl: './apertura.component.html',
    styleUrl: './apertura.component.scss'
})
export class AperturaComponent {
    data_apertura: any = [];
    fecha_actual: string = '';
    cajaForm: FormGroup;
    texto_estado_caja: any = '';
    estado_caja = 0;
    GastosForm: FormGroup;
    CategoriaGastosList: any;
    fechaActual: string = new Date().toISOString().split('T')[0];

    constructor(
        private AperturaService_: AperturaService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {
        debugger;
        this.cajaForm = this.fb.group({
            estado: [1],
            caja: ['', Validators.required],
            turno: ['', Validators.required],
            responsable: ['', Validators.required],
            monto: ['', [Validators.required, Validators.min(0)]]
        });

        debugger;
        let hoy = new Date().toISOString().split('T')[0];

        this.GastosForm = this.fb.group({
            descripcion: ['', Validators.required],
            monto: [0.0, Validators.required],
            fecha: [hoy, Validators.required],
            categoria: ['', Validators.required],
            notas: ['']
        });
    }

    ngOnInit(): void {
        const date = new Date();
        this.fecha_actual = date.toISOString().split('T')[0];
        const opciones: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        };

        // Convertir la fecha a texto en español
        const fechaFormateada = date.toLocaleDateString('es-ES', opciones);

        // Reemplazar "de junio de 2025" por "de junio del 2025"
        this.fecha_actual = fechaFormateada.replace(' de ', ' de ').replace(' de ', ' del ');
        this.ListAperturaNow();
        this.ListCategoriasGastos();
    }
    GuardarCaja(data: any) {
        if (data == 0) {
            if (this.cajaForm.invalid) {
                this.cajaForm.markAllAsTouched(); // 👈 fuerza mostrar todos los errores
                return;
            }
            if (this.cajaForm.valid) {
                this.AperturaService_.registrarCaja(this.cajaForm.value).subscribe((response) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Apertura registrada para el dia de hoy',
                        life: 3000
                    });
                    this.ListAperturaNow();
                });
            }
        } else {
            this.confirmationService.confirm({
                message: 'Estas seguro de cerrar la caja ?',
                header: 'Confirm',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.AperturaService_.cerrarCaja(this.cajaForm.value).subscribe((response) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Cerrar Caja para el dia de hoy',
                            life: 3000
                        });
                        this.ListAperturaNow();
                    });
                }
            });
        }
    }

    GuardarGastos() {
        if (this.GastosForm.valid) {
            this.AperturaService_.registrarGastos(this.GastosForm.value).subscribe((response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Gasto registrado',
                    life: 3000
                });
                // this.ListAperturaNow();
            });
        }
    }
    ListAperturaNow() {
        this.AperturaService_.ListarAperturaHoy().subscribe((response) => {
            if (response.success) {
                if (response.data) {
                    this.estado_caja = response.data[0]?.estado;
                    switch (response.data[0]?.estado) {
                        case '2':
                            this.texto_estado_caja = 'Caja ya se Cerro (Hoy)';
                            this.cajaForm.disable();
                            break;
                        case '1':
                            this.texto_estado_caja = 'Caja Abierta deseas cerrarla?';
                            this.cajaForm.enable();

                            break;
                        default:
                            break;
                    }

                    this.data_apertura.push(response.data[0]);
                    this.cajaForm.patchValue({
                        caja: 1,
                        responsable: response.data[0]?.responsable,
                        monto: response.data[0]?.total,
                        turno: 'Mañana',
                        estado: response.data[0]?.estado
                    });
                } else {
                    debugger;
                    this.texto_estado_caja = 'Abrir Caja Cerrada';
                    this.estado_caja = 0;
                    this.cajaForm.enable();
                }
            } else {
                alert('Hubo un problema al conectar con el servidor');
            }
        });
    }
    ListCategoriasGastos() {
        this.AperturaService_.ListCategoriasGastos().subscribe((response) => {
            if (response.success) {
                if (response.data) {
                    debugger;
                    this.CategoriaGastosList = response.data;
                } else {
                }
            } else {
                alert('Hubo un problema al conectar con el servidor');
            }
        });
    }
}

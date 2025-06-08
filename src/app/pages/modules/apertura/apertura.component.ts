import { Component } from '@angular/core';
import { AperturaService } from '../../service/apertura.service';
import { ImportsModule } from '../../imports';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-apertura',
    imports: [CommonModule, ImportsModule, FormsModule], // <-- Add this

    templateUrl: './apertura.component.html',
    styleUrl: './apertura.component.scss'
})
export class AperturaComponent {
    data_apertura: any = [];
    fecha_actual: string = '';
    cajaForm: FormGroup;

    constructor(
        private AperturaService_: AperturaService,
        private fb: FormBuilder
    ) {
        this.cajaForm = this.fb.group({
            caja: ['', Validators.required],
            turno: ['', Validators.required],
            responsable: ['', Validators.required],
            monto: ['', [Validators.required, Validators.min(0)]]
        });
    }
    GuardarCaja() {
        if (this.cajaForm.invalid) {
            this.cajaForm.markAllAsTouched(); // 👈 fuerza mostrar todos los errores
            return;
        }
        if (this.cajaForm.valid) {
            this.AperturaService_.registrarCaja(this.cajaForm.value).subscribe({
                next: (res) => {
                    alert('Caja registrada exitosamente');
                    this.cajaForm.reset();
                },
                error: (err) => {
                    alert('Error al registrar la caja');
                    console.error(err);
                }
            });
        }
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
    }

    ListAperturaNow() {
        this.AperturaService_.ListarAperturaHoy().subscribe((response) => {
            debugger;
            if (response.success) {
                if (response.data) {

                    this.data_apertura.push(response.data[0]);
                }
            } else {
                alert('Hubo un problema al conectar con el servidor');
            }
        });
    }
}

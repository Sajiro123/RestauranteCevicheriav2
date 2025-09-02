import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImportsModule } from '../../../imports';
import { Customer } from '../../../service/customer.service';
import { ConfiguracionService } from '../../../service/configuracion.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'app-toppings',
    imports: [CommonModule, FormsModule, ImportsModule],
    templateUrl: './toppings.component.html',
    styleUrl: './toppings.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class ToppingsComponent {
    balanceFrozen: boolean = false;
    dataTopping: [] = [];

    constructor(
        private ConfiguracionService: ConfiguracionService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.ListarToppings();
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    deleteTopping(customer: any) {
        // this.ConfiguracionService.deleteTopping(customer.idtoppings).subscribe(
        //     (response) => {
        //         if (response.success) {
        //             this.ListarToppings();
        //         } else {
        //             this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'No contiene informaciòn la consulta BuscarPlatoSearch' });
        //         }
        //     },
        //     (error) => {
        //         console.error('Error al intentar consultar', error);
        //         alert('Hubo un problema al conectar con el servidor');
        //     }
        // );
    } 

    ListarToppings() {
        this.ConfiguracionService.ListarToppingPedido().subscribe(
            (response) => {
                if (response.success) {
                    if (response.data) {
                        this.dataTopping = response.data;
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
}

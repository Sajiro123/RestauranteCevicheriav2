import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImportsModule } from '../../../imports';
import { Customer } from '../../../service/customer.service';

@Component({
    selector: 'app-toppings',
    imports: [CommonModule, FormsModule, ImportsModule],
    templateUrl: './toppings.component.html',
    styleUrl: './toppings.component.scss'
})
export class ToppingsComponent {
    balanceFrozen: boolean = false;
    customers2: Customer[] = [];

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
}

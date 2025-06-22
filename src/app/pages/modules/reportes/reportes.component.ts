import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ImportsModule } from '../../imports';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../../service/pedido.service';
import { Table } from 'primeng/table';
import { ES_LOCALE } from '../../../model/util/calendar';
import { TabsModule } from 'primeng/tabs';
@Component({
    selector: 'app-reportes',
    imports: [CommonModule, ImportsModule, FormsModule], // <-- Add this
    templateUrl: './reportes.component.html',
    styleUrl: './reportes.component.scss'
})
export class ReportesComponent {
    selectedRange: Date[] = [];
    selectedRange2: Date | null = null; // Initialize selectedRange2 as null
    expandedRows = {};
    esLocale = ES_LOCALE;
    selectedDates: Date[] = [];
    @ViewChild('dt') dt!: Table; // Use the Table type from PrimeNGç
    Clients: any[] = []; // Initialize Clients as an empty array
    PedidoDetalle: any[] = []; // Initialize PedidoDetalle as an empty array
    PedidoReporte: any[] = []; // Initialize PedidoReporte as an empty array
    array_data = [] as any;
    array_data_total: any[] = []; // Initialize array_data_total as an empty array
    constructor(private PedidoService: PedidoService) {}

    expandAll() {
        debugger;
        this.expandedRows = this.PedidoReporte.reduce((acc, p) => (acc[p.id] = true) && acc, {});
    }

    collapseAll() {
        this.expandedRows = {};
    }

    filterGlobal(event: Event) {
        const input = event.target as HTMLInputElement; // Type assertion
        const value = input.value; // Safe access to value
        this.dt.filterGlobal(value, 'contains'); // Use the dt reference to filter the table
    }

    handleCalendarBlur() {
        if (this.selectedRange.length === 2) {
            if (this.selectedRange[1] != null) {
                this.showRerportemount({
                    fechainicio: this.formatDateToMySQL(new Date(this.selectedRange[0])),
                    fechafin: this.formatDateToMySQL(new Date(this.selectedRange[1]))
                });
            }
        } else {
            console.log('No se ha completado el rango de fechas');
        }
    }

    DayCalendarBlur() {
        debugger;
        if (this.selectedRange2) {
            this.showReporteDay(this.formatDateToMySQL(new Date(this.selectedRange2)));
        } else {
            console.log('No se ha completado el rango de fechas');
        }
    }

    showRerportemount(parameters: any = {}) {
        this.Clients = [];

        this.PedidoService.showRerporte(parameters).subscribe(
            (response: { success: any; data: any[] }) => {
                if (response.success) {
                    // response.data.forEach((element: any) => {
                    //   element.fecha = new Date(element.fecha).toISOString().split('T')[0]; // Formato YYYY-MM-DD
                    //   element.created_at = this.formatDate(element.created_at);
                    // });
                    var yape_total = 0;
                    var plin_total = 0;
                    var visa_total = 0;
                    var efectivo_total = 0;
                    var yape_total = 0;
                    var TOTAL_TOTAL = 0;
                    this.array_data = [] as any;
                    response.data.forEach((element: any) => {
                        yape_total += parseInt(element.YAPE);
                        plin_total += parseInt(element.PLIN);
                        visa_total += parseInt(element.VISA);
                        efectivo_total += parseInt(element.EFECTIVO);

                        debugger;
                        var dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
                        var numeroDia = new Date(element.fecha).getDay() + 1;
                        var nombreDia = dias[numeroDia];
                        var total = parseInt(element.YAPE) + parseInt(element.VISA) + parseInt(element.EFECTIVO) + parseInt(element.PLIN);
                        TOTAL_TOTAL += total;
                        if (element.fecha != undefined) {
                            element.fecha = new Date(element.fecha).toISOString().split('T')[0]; // Formato YYYY-MM-DD
                            // element.fecha = this.formatDateToMySQL(element.fecha);
                        } else {
                            element.fecha = '';
                        }
                        this.array_data.push({
                            fecha: element.fecha,
                            dia: nombreDia,
                            yape: element.YAPE,
                            visa: element.VISA,
                            efectivo: element.EFECTIVO,
                            plin: element.PLIN,
                            total: total
                        });
                    });
                    this.Clients = this.array_data;
                    const totalEfectivo = this.totalEfectivo;
                    const totalPlin = this.totalPlin;
                    const totalVisa = this.totalVisa;
                    const totalGeneral = this.totalGeneral;
                    const totalyape = this.totalyape;

                    this.array_data_total.push({
                        efectivo: totalEfectivo,
                        plin: totalPlin,
                        visa: totalVisa,
                        total: totalGeneral,
                        yape: totalyape
                    });
                } else {
                    alert('Error al intentar consultar');
                }
            },
            (error: any) => {
                console.error('Error al intentar consultar', error);
                alert('Hubo un problema al conectar con el servidor');
            }
        );
    }

    showReporteDay(parameters: string) {
        this.PedidoReporte = [];
        this.PedidoService.ShowPedidosFecha(parameters).subscribe(
            (response: { success: any; data: any[] }) => {
                if (response.success) {
                    debugger;
                    this.array_data = [] as any;
                    response.data.forEach((element: any) => {
                        if (element.fecha != undefined) {
                            element.fecha = new Date(element.fecha).toISOString().split('T')[0]; // Formato YYYY-MM-DD
                            var dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
                            var numeroDia = new Date(element.fecha).getDay() + 1;
                            var nombreDia = dias[numeroDia];
                            element.dia = nombreDia;
                        }
                    });
                    this.PedidoReporte = response.data;

                    this.PedidoService.ReporteProductoDetalle(parameters).subscribe((response2: { success: any; data: any[] }) => {
                        if (response2.success) {
                            this.PedidoDetalle = response2.data;
                            this.PedidoReporte = this.PedidoReporte.map((pedido: any) => {
                                const detalle = this.PedidoDetalle.filter((d: any) => d.idpedido === pedido.idpedido);
                                return { ...pedido, detalle };
                            });
                        } else {
                            alert('Error al intentar consultar los detalles del producto');
                        }
                    });
                } else {
                    alert('Error al intentar consultar');
                }
            },
            (error: any) => {
                console.error('Error al intentar consultar', error);
                alert('Hubo un problema al conectar con el servidor');
            }
        );
    }

    formatDate(dateString: string | number | Date) {
        const date = new Date(dateString);

        // Get day, month, year, hours, and minutes
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0'); // Add leading zero
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Add leading zero

        return `${day}/${month}/${year} ${hours}:${minutes}`;

        // Usage example
    }
    formatDateToMySQL(date: Date): string {
        debugger;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`; // Return the date in YYYY-MM-DD format
    }

    get totalEfectivo(): number {
        return this.datosVisibles.reduce((sum, item) => sum + +item.efectivo, 0);
    }

    get totalyape(): number {
        return this.datosVisibles.reduce((sum, item) => sum + +item.yape, 0);
    }

    get totalPlin(): number {
        return this.datosVisibles.reduce((sum, item) => sum + +item.plin, 0);
    }

    get totalVisa(): number {
        return this.datosVisibles.reduce((sum, item) => sum + +item.visa, 0);
    }

    get totalGeneral(): number {
        return this.totalEfectivo + this.totalPlin + this.totalVisa + this.totalyape;
    }

    private get datosVisibles(): any[] {
        return this.Clients;
    }
}

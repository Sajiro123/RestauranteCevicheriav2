import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<footer class="bg-white shadow-md p-6 mt-4">
        <div class="flex justify-center space-x-8">
            <a href="uikit/home" class="text-gray-600">Home</a>
            <a href="#" class="text-gray-600">formlayout</a>
            <a href="#" class="text-gray-600">Productos</a>
            <a href="#" class="text-gray-600">Contacto</a>
        </div>
    </footer>`
})
export class AppFooter {}

import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  welcome = 'Hola!';

  tasks = signal([
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear servicio',
  ]);

  name = signal('Joshua');

  age = 35;

  disabled = true;

  img = 'https://angular.io/assets/images/logos/angular/angular.svg';

  person = {
    name: 'Joshua',
    age: 35,
    avatar: 'https://angular.io/assets/images/logos/angular/angular.svg',
  };

  clickHandler() {
    alert('hola');
  }

  // Metodos con eventos
  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    // Para modificar el valor de un signal usamos el metodo set
    this.name.set(newValue);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}

console.log(LabsComponent);

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-labs',
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  welcome = 'Hola!';
  tasks = ['Instalar el Angular CLI', 'Crear proyecto', 'Crear componentes'];
  name = 'Joshua';
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
    console.log(event);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}

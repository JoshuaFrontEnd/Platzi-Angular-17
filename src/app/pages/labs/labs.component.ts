import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  imports: [CommonModule, ReactiveFormsModule],
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

  person = signal({
    name: 'Joshua',
    age: 35,
    avatar: 'https://angular.io/assets/images/logos/angular/angular.svg',
  });

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

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((prevState) => {
      return {
        ...prevState,
        // Acá se debe convertir el valor de la entrada a number
        age: Number(newValue),
      };
    });
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update((prevState) => {
      return {
        ...prevState,
        name: newValue,
      };
    });
  }

  // Formularios reactivos:
  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50, { nonNullable: true });
  nameCtrl = new FormControl('Joshua', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });

  // Obteniendo el valor desde la logica
  constructor() {
    this.colorCtrl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}

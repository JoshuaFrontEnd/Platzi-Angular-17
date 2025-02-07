import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal([
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear servicio',
  ]);

  // Para crear un nuevo valor en un signal usamos el metodo update, donde pasamos el estado actual y devolvemos el nuevo con el valor agregado
  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  // Para eliminar un valor en un signal usamos el metodo update, donde pasamos el estado actual y filtramos el valor eliminado, esto se hace para evitar la mutabilidad de los datos
  deleteHandler(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position !== index)
    );
  }
}

import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Task } from '../../models/task.models';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    { id: Date.now(), title: 'Crear proyecto', completed: false },
    { id: Date.now(), title: 'Crear componentes', completed: false },
  ]);

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
  }

  // Para crear un nuevo valor en un signal usamos el metodo update, donde pasamos el estado actual y devolvemos el nuevo con el valor agregado
  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  // Para eliminar un valor en un signal usamos el metodo update, donde pasamos el estado actual y filtramos el valor eliminado, esto se hace para evitar la mutabilidad de los datos
  deleteHandler(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position !== index)
    );
  }
}

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

  // Actualizar el estado de una tarea especifica mediante la posicion del array
  updateTask(index: number) {
    this.tasks.update((tasks) => {
      // Con la funcion map recorro el estado actual de las tareas que es un array de objetos (tasks)
      return tasks.map((task, position) => {
        // Si la posicion (position) del elemento (task) del array (tasks) es igual al index (proporcionado como argumento para identificar la tarea a actualizar) entonces puedo actualizar esa tarea en especifico
        if (position === index) {
          // Tomo todas las propiedades de la tarea a actualizar y solo le cambio el valor de la propiedad completed, si es true ahora sera false y si es false ahora sera true
          return { ...task, completed: !task.completed };
        }
        // Cuando la tarea no coincidad con la posicion proporcionada entonces devuelvo la tarea sin cambios
        return task;
      });
    });
  }
}

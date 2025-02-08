import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Task } from '../../models/task.models';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

type FilterType = 'all' | 'pending' | 'completed';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([
    { id: Date.now(), title: 'Crear proyecto', completed: false },
    { id: Date.now(), title: 'Crear componentes', completed: false },
  ]);

  // Estados computados
  filter = signal<FilterType>('all');
  // taskByFilter es creado a partir del signal filter, por eso se considera un estado computado
  tasksByFilter = computed(() => {
    // Acá colocamos los elementos que vamos a reaccionar cuando ellos cambien
    const filter = this.filter();
    const tasks = this.tasks();

    // Filtrar todas las tareas que no estan completadas, osea, las pendientes
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }

    // Filtrar todas las tareas que estan completadas
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }

    // Devolver todas las tareas
    return tasks;
  });

  changeHandler() {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
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

  // Manejar el input con FormControl
  newTaskCtrl = new FormControl('', {
    // Para indicar que el valor no sea nulo
    nonNullable: true,
    // Para indicar que el valor es requerido
    validators: [Validators.required],
    // Para crear validaciones con expresiones regulares:
    // validators.pattern(expresion regular),
  });

  // Activar edicion de una sola tarea a la vez, evitando que se puedan editar varias al mismo tiempo
  updateTaskEditingMode(index: number) {
    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return { ...task, editing: true };
        }
        return {
          ...task,
          editing: false,
        };
      });
    });
  }

  // Actualizar el texto de la tarea en el mode de edicion
  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;

    this.tasks.update((prevState) => {
      return prevState.map((task, position) => {
        if (position === index) {
          return { ...task, title: input.value, editing: false };
        }
        return task;
      });
    });
  }

  //
  changeFilter(filter: FilterType) {
    this.filter.set(filter);
  }
}

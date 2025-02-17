import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskFormModalComponent } from '../shared/modals/task-form-modal/task-form-modal.component';


@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavigationComponent],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})
export class TaskManagementComponent {
  tasks: any[] = [];
  taskForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: [1, Validators.required],
      usuarioId: [0],
      ending: ['']
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Error loading tasks:', err)
    });
  }

  openCreateModal(): void {
    const modalRef = this.modalService.open(TaskFormModalComponent);
    modalRef.componentInstance.initialize();
    
    modalRef.componentInstance.taskSaved.subscribe((newTask: any) => {
      this.taskService.createTask(newTask).subscribe({
        next: (createdTask) => {
          this.tasks.push(createdTask);
        },
        error: (err) => console.error('Error creating task:', err)
      });
    });
  }

  openEditModal(task: any): void {
    const modalRef = this.modalService.open(TaskFormModalComponent);
    modalRef.componentInstance.initialize(task);
    
    modalRef.componentInstance.taskSaved.subscribe((updatedTask: any) => {
      this.taskService.updateTask(updatedTask).subscribe({
        next: () => {
          const index = this.tasks.findIndex(t => t.id === updatedTask.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
        },
        error: (err) => console.error('Error updating task:', err)
      });
    });
  }


  confirmDelete(task: any): void {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.taskService.deleteTask(task.id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== task.id);
        },
        error: (err) => console.error('Error deleting task:', err)
      });
    }
  }


  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe({
        next: (newTask) => {
          this.tasks.push(newTask);
          this.taskForm.reset();
        },
        error: (err) => console.error('Error creating task:', err)
      });
    }
  }
}

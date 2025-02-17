import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../services/task/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-task-management',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.css'
})
export class TaskManagementComponent {
  tasks: any[] = [];
  taskForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['Pendente', Validators.required]
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

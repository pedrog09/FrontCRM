import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task/task.service';
import { NavigationComponent } from '../shared/navigation/navigation.component';



@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, NavigationComponent],

  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => this.tasks = data,
      error: (err) => console.error('Error loading tasks:', err)
    });
  }

  // Component logic will be added here
}

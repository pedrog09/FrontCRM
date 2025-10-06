import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form-modal.component.html',
  styleUrl: './task-form-modal.component.css'
})
export class TaskFormModalComponent {
  @Output() taskSaved = new EventEmitter<any>();
  taskForm: FormGroup;
  isEditMode = false;
  currentTask: any;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: [1, Validators.required],
      usuarioid: [],
      ending: ['', Validators.required]
    });
  }

  initialize(task?: any): void {
    if (task) {
      this.isEditMode = true;
      this.currentTask = task;
      this.taskForm.patchValue(task);
    }
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;
    
    const taskData = this.taskForm.value;
    if (this.isEditMode) {
      taskData.id = this.currentTask.id;
    }
    
    this.taskSaved.emit(taskData);
    this.activeModal.close();
  }
}

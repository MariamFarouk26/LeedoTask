import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [HttpClientModule,RouterModule],
  providers:[TaskService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
constructor (private taskService:TaskService){}

Tasks:any=[];

// Lifecycle hook called after component initialization
ngOnInit():void{
  // Fetch all tasks from the server
  this.taskService.getAllTasks().subscribe({
    next:(tasks)=>{
      this.Tasks = tasks  // Assign fetched tasks to the Tasks array
    },
    error:(error)=>{console.log(error)}
  })
}

toggleCompletion(taskID:any,taskStatus:any){
let confirmMessage:any ;
let status = taskStatus;  // Get the status of the task

// Toggle the completion status based on the current status
  if(status=="Not Completed"){
    confirmMessage =confirm("Are you sure to mark the task as Completed?");
    status="Completed"; // Set status to completed
  }else if(status=="Completed"){
    confirmMessage =confirm("Are you sure to mark the task as Not Completed?");
    status="Not Completed"; // Set status to Not completed
  }
  
  // If user confirms, update the task status on the server
  if (confirmMessage){
  this.taskService.UpdateTaskStatus(status,taskID).subscribe({
    next:()=>{
      // After successful update, fetch all tasks again to update the Tasklist 
      this.taskService.getAllTasks().subscribe({
        next:(tasks)=>{
          this.Tasks = tasks; // Assign fetched tasks to the Tasks array
        },
      })
    },
    error:(err)=>{console.log(err)}
  })}

}

deleteTask(taskID:any){
  let confirmMessage:any ;
  confirmMessage=confirm("are you sure to delete this task?");  //t or f
   
  // If user confirms, delete the task from the server
  if (confirmMessage){
     this.taskService.DeleteTask(taskID).subscribe(
      {next:()=>{
        // After successful deletion, fetch all tasks again to update the Tasklist
        this.taskService.getAllTasks().subscribe({
          next:(tasks)=>{
            this.Tasks = tasks; // Assign fetched tasks to the Tasks array
          },
        })
        
      },
      error:(err)=>{
        console.log(err); // Log any errors to the console
      }
    })};
}


}


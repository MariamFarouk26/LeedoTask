import { Component } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [HttpClientModule],
  providers:[TaskService],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  constructor(private taskService:TaskService, private router:Router){  
  }

// Method to add a new task
AddTask(title: any,
        description: any,
        dueDate: any,
        priority: any,
        completed: any,){

    // Create a new task object and send it to addtask method
    let NewTask={title,description,dueDate,priority,completed};
    
    // Call the AddTask method of TaskService 
    this.taskService.AddTask(NewTask).subscribe({
     
      // Callback function on completion, navigate to home page
      complete:()=> {this.router.navigateByUrl('')},
     
      // Error handling function
      error:(err)=>{console.log(err)}
    })
  }    
}



import { Component } from '@angular/core';
import { TaskService } from '../../Services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-updated-list',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule],
  providers:[TaskService],
  templateUrl: './updated-list.component.html',
  styleUrl: './updated-list.component.css'
})
export class UpdatedListComponent {

  constructor(private taskService:TaskService ,private router:Router,myActivated:ActivatedRoute ){
    // Initialize ID with the route parameter
    this.ID = myActivated.snapshot.params["id"]
  }
    
  // Object to hold task data
  Tasks: any = {};
  ID:any;

  // Lifecycle hook called after component initialization
  ngOnInit(): void {
    // Retrieve task details by ID
    this.taskService.getTaskByID(this.ID).subscribe({
      // Success callback
      next:(data)=>{
        this.Tasks = data;
      },
      error:(err)=>{console.log(err)}
    });
  }

  // Method to update a task
  updateTask(title: any,
              description: any,
              dueDate: any,
              priority: any,
              completed: any,){
  
                
         // Create a new task object
         let NewTask={title,description,dueDate,priority,completed};

          // Call the service method to update the task
        this.taskService.UpdateTask(NewTask,this.ID).subscribe({
          // Complete callback
          complete:()=> {
            this.router.navigateByUrl('') // Navigate to the home route after update
          },
          // Error callback
          error:(err)=>{console.log(err)}
      })};

// checks if date is defined. If it is, it splits the string by '/' character,
//  reverses the order of the parts, 
//  and joins them with '-' character.
//   If date is undefined, it returns an empty string
 
 // Method to format date of dueDate
formatDate(date: string): string {
   // Check if date is defined
    return date ? date.split('/').reverse().join('-') : '';
  }

    
      
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// This service handles tasks-related HTTP requests.
export class TaskService {

   // Base URL of the tasks API
  private DB_URL = "http://localhost:3001/Tasks";

  constructor(private http:HttpClient) { }

  // Fetches all tasks from the API
  getAllTasks(){
    return this.http.get(this.DB_URL);
  }

  // Fetches a task by its ID from the API
  getTaskByID(id:any){
    return this.http.get(`${this.DB_URL}/${id}`);
  }

  // Adds a new task to the API
  AddTask(Task:any){
    return this.http.post(this.DB_URL,Task);
  }

  // Updates the status of a task in the API
  UpdateTaskStatus(TaskStatus:any,id:any){
    const updatedTask = { completed: TaskStatus };
    return this.http.patch(`${this.DB_URL}/${id}`,updatedTask);
  }

  // Updates details of a task in the API
  UpdateTask(Task:any,id:any){
    return this.http.patch(`${this.DB_URL}/${id}`,Task);
  }

   // Deletes a task from the API
  DeleteTask(id:any){
    return this.http.delete(`${this.DB_URL}/${id}`);
  }
}

import { Routes } from '@angular/router';
import { ErrorComponent } from './Components/error/error.component';
import { UpdatedListComponent } from './Components/updated-list/updated-list.component';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { AddTaskComponent } from './Components/add-task/add-task.component';

export const routes: Routes = [
    {path:"",redirectTo:'Tasks',pathMatch:"full"},
    {path:"Tasks",component:TaskListComponent},
    {path:"add",component:AddTaskComponent},
    {path:"update/:id",component:UpdatedListComponent},
    {path:"**",component:ErrorComponent}
  
];

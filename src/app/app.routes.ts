import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SummaryComponent } from './summary/summary.component';
import { ClientManagementComponent } from './client-management/client-management.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { ChatbotComponent } from './chatbot/chatbot.component';




export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "summary",
        component: SummaryComponent
    },
    {
        path: "clientes",
        component: ClientManagementComponent
    },
    {
        path: "tarefas",
        component: TaskManagementComponent
    },
    {
        path: "chatbot",
        component: ChatbotComponent
    },
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    }


];

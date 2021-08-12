import {Component, OnInit} from '@angular/core';
import { User } from './model/User';
import { Priority } from './model/Priority';
import { Task } from './model/Task';
import { DataHandlerService } from './service/data-handler.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styles: []
})
export class AppComponent implements OnInit {

    constructor(
        private dataHandlerService: DataHandlerService,
        ){
        }

    title = 'Todo';
    tasks: Task[];
    users: User[];
    priorities: Priority[];
    public selectedUser: User = null;
    public statusFilter: boolean
    public searchTaskText = ''
    private priorityFilter: Priority;


    ngOnInit(): void {
        this.dataHandlerService.getAllPriorities().subscribe(priorities => this.priorities = priorities)
        this.dataHandlerService.getAllTasks().subscribe(tasks => this.tasks = tasks)
        this.dataHandlerService.getAllUsers().subscribe(users => this.users = users)
        this.setMenuValues()
    }

    onSelectedUser(user: User) {
        this.selectedUser = user
        this.updateTasks()
    }

    onUpdateTask(task: Task) {

        this.dataHandlerService.updateTask(task).subscribe( () => {
            
        })
    }

    onDeleteTask(task: Task) {

        this.dataHandlerService.deleteTask(task.id).subscribe(cat => {
            this.updateTasks()
        });
    }

    onDeleteUser(user: User) {
        this.dataHandlerService.deleteUser(user.id).subscribe(cat => {
            this.selectedUser = null
            this.onSelectedUser(this.selectedUser)
        })
    }

    onUpdateUser(user:User) {
        this.dataHandlerService.updateUser(user).subscribe( () => {
            this.onSelectedUser(this.selectedUser)
        })
    }

    onFilterTasksByStatus(status: boolean) {
        this.statusFilter = status
        this.updateTasks()
    }

    onSearchTasks(searchString: string) {
        this.searchTaskText = searchString
        this.updateTasks()
    }

    onFilterTasksByPriority(priority: Priority) {
        this.priorityFilter = priority
        this.updateTasks()
    }

    updateTasks() {
        this.dataHandlerService.searchTasks(
            this.selectedUser,
            this.searchTaskText,
            this.statusFilter,
            this.priorityFilter
        ).subscribe((tasks: Task[]) => {
            this.tasks = tasks
        })
    }

    onAddTask(task: Task) {
        this.dataHandlerService.addTask(task).subscribe(result => {
            this.updateTasks()
        })
    }

    onAddUser(title: string) {
        this.dataHandlerService.addUser(title).subscribe( ()=> 
            this.updateUsers())
    } 

    updateUsers() {
        this.users.forEach( cat => {
            this.dataHandlerService.getAllUsers().subscribe(
                users => this.users = users
            )
        })
    }

// sidebar

    public menuOpened: boolean; 
    public menuMode: string; 
    public menuPosition: string; 
    public showBackdrop: boolean; 


    setMenuValues() {
        this.menuPosition = 'left'; 
        this.menuOpened = true; 
        this.menuMode = 'push'; 
        this.showBackdrop = false; 
    }

    onClosedMenu() {
        this.menuOpened = false;
    }    
    
    toggleMenu() {
        this.menuOpened = !this.menuOpened
    }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Task} from 'src/app/model/Task';
import {MatDialog} from "@angular/material";
import { EditTaskDialogComponent } from 'src/app/dialog/edit-task-dialog/edit-task-dialog.component';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { User } from 'src/app/model/User';
import { Priority } from 'src/app/model/Priority';
import { OperType } from 'src/app/dialog/OperType';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    @Output()
    selectUser = new EventEmitter<User>();
    
    @Output()
    deleteTask = new EventEmitter<Task>();

    @Output()
    updateTask = new EventEmitter<Task>();

    private tasks: Task[];

    @Input('tasks')
    private set setTasks(tasks: Task[]) { 
        this.tasks = tasks;
    }

    @Input('priorities')
    set setPriorities(priorities: Priority[]) {
        this.priorities = priorities;
    }

    @Input()
    selectedUser: User

    constructor(
        private dataHandler: DataHandlerService, 
        private dialog: MatDialog, 
    ) {
    }

    ngOnInit() {
        this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks);
    }

    onSelectUser(user: User) {
        this.selectUser.emit(user);
    }

    toggleTaskCompleted(task: Task) {
        task.completed = !task.completed;
    }

    public getPriorityColor(task: Task): string {

        if (task.completed) {
            return '#F8F9FA'; 
        }

        if (task.priority && task.priority.color) {
            return task.priority.color;
        }

        return '#fff'; 
    }

// диалоговое окно редактирования для добавления задачи

    public openEditTaskDialog(task: Task): void {

        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
            data: [task, 'Редактирование задачи', OperType.EDIT],
            autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result === 'complete') {
                task.completed = true
                this.updateTask.emit(task)
            }

            if (result === 'activate') {
                task.completed = false
                this.updateTask.emit(task)
            }

            if (result === 'delete') {
                this.deleteTask.emit(task);
                return;
            }

            if (result as Task) { 
                this.updateTask.emit(task);
                return;
            }

        });
    }

    openDeleteDialog(task: Task) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '500px',
            data: {
              dialogTitle: 'Подтвердите действие',
              message: `Вы действительно хотите удалить задачу: "${task.title}"?`
            },
            autoFocus: false
          });

          dialogRef.afterClosed().subscribe(result => {
              if (result) {
                  this.deleteTask.emit(task)
              }
          })
    }

    onToggleActive(task: Task) {

        task.inactive = false

        task.inactive = !task.inactive
        this.updateTask.emit(task)

        if(task.inactive) {
            console.log('TRUE')
        }
    }

    onToggleStatus(task: Task) {
        task.completed = !task.completed
        this.updateTask.emit(task)


    }

// filters

    @Output()
    filterByTitle = new EventEmitter<string>();

    @Output()
    filterByStatus = new EventEmitter<boolean>();

    @Output()
    filterByPriority = new EventEmitter<Priority>()

    public selectedStatusFilter: boolean
    public searchTaskText: ''
    public priorities: Priority[]
    public selectedPriorityFilter: Priority = null;   

    onFilterByTitle() {
        this.filterByTitle.emit(this.searchTaskText)
    }

    onFilterByStatus(value: boolean) {
        if (value !== this.selectedStatusFilter) {
            this.selectedStatusFilter = value;
            this.filterByStatus.emit(this.selectedStatusFilter);
        }
    }

    onFilterByPriority(value: Priority) {
        if(value !== this.selectedPriorityFilter) {
            this.selectedPriorityFilter = value;
            this.filterByPriority.emit(this.selectedPriorityFilter)
        }
    }
/// filters

// Добавление новой задачи

    @Output()
    addTask = new EventEmitter<Task>()

    openAddTaskDialog() {
        const task = new Task(null, '', false, null, this.selectedUser) 

        const dialogRef = this.dialog.open(EditTaskDialogComponent, {
            data: [task, 'Добавление задачи', OperType.ADD]
        });

        dialogRef.afterClosed().subscribe( result => {
            if (result) {
                this.addTask.emit(task)
            }
        })
    }

    getMobilePriorityBgColor(task: Task) {

        if (task.priority != null && !task.completed) {
            return task.priority.color;
        }

        return 'none';
    }
}

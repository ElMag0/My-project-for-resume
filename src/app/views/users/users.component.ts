import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {User} from "../../model/User";
import { MatDialog, MatDialogRef } from '@angular/material';
import { EditUserDialogComponent } from 'src/app/dialog/edit-user-dialog/edit-user-dialog.component';
import { OperType } from 'src/app/dialog/OperType';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    @Input()
    users: User[];

    @Output()
    selectUser = new EventEmitter<User>();

    @Output()
    deleteUser = new EventEmitter<User>();

    @Output()
    updateUser = new EventEmitter<User>();

    @Input()
    selectedUser: User;


    private indexMouseMove: number;

    constructor(
        private dataHandler: DataHandlerService,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit() {

    }


    showTasksByUser(user: User): void {

        if (this.selectedUser === user) {
            return;
        }

        this.selectedUser = user; 

        this.selectUser.emit(this.selectedUser);
    }

    showEditIcon(index: number) {
        this.indexMouseMove = index;

    }

    openEditDialog(user: User) {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
            data: [user.title, 'Назначение исполнителя', OperType.EDIT],
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result === 'delete') { 
                this.deleteUser.emit(user); 
                return;
            }

            if (typeof (result) === 'string') { 
                user.title = result as string;

                this.updateUser.emit(user); 
                return;
            }
        });
    }

    @Output()
    addUser = new EventEmitter<string>()

    openAddDialog() {
        const dialogRef = this.dialog.open(EditUserDialogComponent, {
            data: ['', 'Добавление нового исполнителя', OperType.ADD],
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result) { 
                this.addUser.emit(result as string); 
            }
        });
    }



}

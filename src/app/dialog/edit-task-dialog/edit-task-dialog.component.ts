import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/model/User';
import { Priority } from 'src/app/model/Priority';
import { Task } from 'src/app/model/Task';
import { DataHandlerService } from 'src/app/service/data-handler.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OperType } from '../OperType';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  public tmpTitle: string
  public dialogTitle: string
  public task: Task
  public users: User[]
  public tmpUser: User
  public priorities: Priority[]
  public tmpPriority: Priority
  public operType: OperType
  public tmpDate: Date


  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, OperType],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog

  ) { }

  ngOnInit() {
    this.task = this.data[0]
    this.dialogTitle = this.data[1]
    this.operType = this.data[2]

    this.tmpTitle = this.task.title
    this.tmpUser = this.task.user
    this.tmpPriority = this.task.priority
    this.tmpDate = this.task.date

    this.dataHandler.getAllUsers().subscribe(items => this.users = items)
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items)
  }

  public onConfirm(): void {
    this.task.title = this.tmpTitle
    this.task.user = this.tmpUser
    this.task.priority = this.tmpPriority
    this.task.date = this.tmpDate

    this.dialogRef.close(this.task)
  }

  public onCancel(): void {
    this.dialogRef.close(null)
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.dialogRef.close('delete')
      }
    })
  }

  complete() {
    this.dialogRef.close('complete')
  }
  activate() {
    this.dialogRef.close('activate')
  }

  canDelete():boolean {
    return this.operType === OperType.EDIT
  }

}

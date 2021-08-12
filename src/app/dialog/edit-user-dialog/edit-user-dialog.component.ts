import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { OperType } from '../OperType';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  public userTitle: string
  public dialogTitle: string
  public operType: OperType



  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType],
  ) { }



  ngOnInit() {
    this.userTitle = this.data[0]
    this.dialogTitle = this.data[1]
    this.operType = this.data[2]
  }

  onConfirm() {
    this.dialogRef.close(this.userTitle)
  }

  onCancel() {
    this.dialogRef.close(false)
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить исполнителя: ${this.userTitle}?`
      },
        autoFocus: false
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result) {
        this.dialogRef.close('delete')
      }
    })
  }

  canDelete(): boolean {
    return this.operType === OperType.EDIT
  }
}

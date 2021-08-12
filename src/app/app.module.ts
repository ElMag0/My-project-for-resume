import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UsersComponent} from './views/users/users.component';
import {TasksComponent} from "./views/tasks/tasks.component";
import {MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatIconModule, MatInputModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EditTaskDialogComponent } from './dialog/edit-task-dialog/edit-task-dialog.component';
import {MatDialogModule} from '@angular/material/dialog'
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { TaskDatePipe } from './pipe/task-date-pipe';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { EditUserDialogComponent } from './dialog/edit-user-dialog/edit-user-dialog.component';
import { SidebarModule } from 'ng-sidebar';
import { HeaderComponent } from './views/header/header.component';

registerLocaleData(localeRu)

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        TasksComponent,
        EditTaskDialogComponent,
        ConfirmDialogComponent,
        TaskDatePipe,
        EditUserDialogComponent,
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatOptionModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        SidebarModule
    ],
    entryComponents: [
        EditTaskDialogComponent,
        ConfirmDialogComponent,
        EditUserDialogComponent,
      ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleMenu = new EventEmitter()

  @Input()
  userName: string;

  ngOnInit(): void {

  }

  constructor(
    private dialog: MatDialog,
  ){}

  onToggleMenu() {
    this.toggleMenu.emit(); // показать/скрыть меню
  }


}



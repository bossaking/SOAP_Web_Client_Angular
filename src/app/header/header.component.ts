import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {NewEventDialogComponent} from "../new-event-dialog/new-event-dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userService : UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout();
  }

  openNewEventDialog(){
    const dialogRef = this.dialog.open(NewEventDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

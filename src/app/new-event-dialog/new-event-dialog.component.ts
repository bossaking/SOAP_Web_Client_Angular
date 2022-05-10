import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {Client, ISoapMethodResponse, NgxSoapService} from "ngx-soap";

@Component({
  selector: 'app-new-event-dialog',
  templateUrl: './new-event-dialog.component.html',
  styleUrls: ['./new-event-dialog.component.css']
})
export class NewEventDialogComponent implements OnInit {

  client: Client | undefined;

  newEventForm = new FormGroup({
    name : new FormControl(''),
    type : new FormControl('Piknik'),
    date : new FormControl((new Date()).toISOString().substring(0,10)),
    description : new FormControl('')
  })

  constructor(public dialog: MatDialog, private soap: NgxSoapService) {
    this.soap.createClient('http://localhost:8080/api/events?wsdl').then((client: Client | undefined) =>{
      this.client = client;
    });
  }

  ngOnInit(): void {
  }

  storeNewEvent(){
    this.client?.setEndpoint("http://localhost:8080/api/events/");
    this.client?.call("storeEvent", this.newEventForm.value).subscribe((res: ISoapMethodResponse) =>  {

    });
  }

}

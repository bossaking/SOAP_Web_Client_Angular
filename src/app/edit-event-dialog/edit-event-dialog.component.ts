import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {Client, ISoapMethodResponse, NgxSoapService} from "ngx-soap";

@Component({
  selector: 'app-edit-event-dialog',
  templateUrl: './edit-event-dialog.component.html',
  styleUrls: ['./edit-event-dialog.component.css']
})
export class EditEventDialogComponent implements OnInit {

  client: Client | undefined;

  event : any;

  editEventForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl('Piknik'),
    date: new FormControl((new Date()).toISOString().substring(0, 10)),
    description: new FormControl('')
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private soap: NgxSoapService) {
    this.soap.createClient('http://localhost:8080/api/events?wsdl').then((client: Client | undefined) => {
      this.client = client;
    });

    this.event = data.event;
    let date = (new Date(this.event.year, this.event.month, this.event.date + 1)).toISOString().substring(0,10);

    this.editEventForm.controls['name'].setValue(this.event.name);
    this.editEventForm.controls['date'].setValue(date);
    this.editEventForm.controls['type'].setValue(this.event.type);
    this.editEventForm.controls['description'].setValue(this.event.description);
  }

  ngOnInit(): void {
  }

  updateEvent() {
    this.client?.setEndpoint("http://localhost:8080/api/events/");
    let body = this.editEventForm.value;
    body.id = this.event.id;
    this.client?.call("updateEvent", this.editEventForm.value).subscribe((res: ISoapMethodResponse) => {

    });
  }

}

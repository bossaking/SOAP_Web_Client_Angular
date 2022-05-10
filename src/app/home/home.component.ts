import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Client, ISoapMethodResponse, NgxSoapService} from "ngx-soap";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {NewEventDialogComponent} from "../new-event-dialog/new-event-dialog.component";
import {EditEventDialogComponent} from "../edit-event-dialog/edit-event-dialog.component";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  client: Client | undefined;
  pdfDisabled: boolean = true;

  events: any | undefined = undefined;

  filtersForm = new FormGroup({
    date: new FormControl((new Date()).toISOString().substring(0, 10)),
    week: new FormControl(false)
  })

  constructor(private soap: NgxSoapService, public dialog: MatDialog, private userService: UserService, private spinner: NgxSpinnerService) {
    this.soap.createClient('http://localhost:8080/api/events?wsdl').then((client: Client | undefined) => {
      this.client = client;
    });

  }

  ngOnInit(): void {
  }

  getEvents() {
    this.spinner.show();
    this.client?.setEndpoint("http://localhost:8080/api/events/");
    let body = {
      date: this.filtersForm.controls['date'].value
    }
    if (this.filtersForm.controls['week'].value == true) {
      this.client?.call("getEventsForWeek", body).subscribe((res: ISoapMethodResponse) => {
        this.spinner.hide();
        this.events = res.result?.return;
        this.pdfDisabled = this.events == null || this.events.length == 0;
      });
    } else {
      this.client?.call("getEventsForDay", body).subscribe((res: ISoapMethodResponse) => {
        this.spinner.hide();
        this.events = res.result?.return;
        this.pdfDisabled = this.events == null || this.events.length == 0;
      });
    }
  }

  editEvent(event: any) {
    if (!this.userService.isLoggedIn()) return;
    const dialogRef = this.dialog.open(EditEventDialogComponent, {data: {event: event}});

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  downloadPDF() {
    this.client?.setEndpoint("http://localhost:8080/api/events/");
    let body = {
      events: this.events
    }
    this.client?.call("getPdf", body).subscribe((res: ISoapMethodResponse) => {
      var newBlob = new Blob([new Uint8Array(atob(res.result.return).split('').map(char =>
        char.charCodeAt(0)
      ))], {type: "application/pdf"});
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob, "file.pdf");
        return;
      }
      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      link.href = data;
      link.download = "file.pdf";
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));

      setTimeout(function () {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }
}

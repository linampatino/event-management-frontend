import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router'; 
import { EventsService } from '../shared/events/events.service';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

import { Event } from '../model/event';
import { Venue } from '../model/venue';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {
    closeResult: string;
    time = {hour: 13, minute: 30};
    
    eventForm = this.fb.group({
      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventTime: ['', Validators.required],
      venueName: ['', Validators.required],
      venueCity: ['', Validators.required],
      venueState: ['', Validators.required],
    });

    constructor(private modalService: NgbModal,
                  private route: ActivatedRoute,
                  private router: Router,
                  private eventService: EventsService,
                  private fb: FormBuilder) { }

      ngOnInit() {
      }
      
      open(content) {
          this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        }

       private getDismissReason(reason: any): string {
          if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
          } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
          } else {
            return  `with: ${reason}`;
          }
        }
       
       getEvents(){
           this.router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=>
           this.router.navigate(["/event-list"])); 
       }
       
      save(){
        let form = this.eventForm.value;

        let venue = new Venue();
        venue.name = form.venueName;
        venue.city = form.venueCity;
        venue.state = form.venueState;

        let date = new Date(form.eventDate.year, 
                            form.eventDate.month, 
                            form.eventDate.day, 
                            form.eventTime.hour, 
                            form.eventTime.minute, 
                            form.eventTime.second);

        let event = new Event();
        event.name = form.eventName;
        event.date = date;
        event.venue = venue;
        
        this.eventService.save(event).subscribe(result => {
          this.getEvents();
          this.getDismissReason('Success');
          this.modalService.dismissAll('Success');
        },
          error => console.error(error)
        );
      }
      
}


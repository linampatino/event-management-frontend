import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router'; 
import { EventsService } from '../shared/events/events.service';

import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';

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
    
    model = new Event();
    name = new FormControl('');
        
      constructor(private modalService: NgbModal,
                  private route: ActivatedRoute,
                  private router: Router,
                  private eventService: EventsService) { }

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
           this.router.navigate(['/event-list']);
       }
       
       save(form: NgForm){
           console.log(form);
           debugger;
           
           this.eventService.save(form).subscribe(result => {
               this.getEvents();
           },
               error => console.error(error)
           );
       }

}


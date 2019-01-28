import { Component, OnInit } from '@angular/core';
import { EventsService } from '../shared/events/events.service'
import { Event } from '../model/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Array<Event>;
  message = '';

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
  	this.eventsService.getEvents().subscribe(data => {this.events = data })
  }

  addEvent($event) {
      //this.message = $event
      this.events.unshift($event);
    }
  
}

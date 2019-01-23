import { Component, OnInit } from '@angular/core';
import { EventsService } from '../shared/events/events.service'

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
   events: Array<any>;
  constructor(private eventsService: EventsService) { }

  ngOnInit() {
  	this.eventsService.getEvents().subscribe(data => {this.events = data })
  }

}

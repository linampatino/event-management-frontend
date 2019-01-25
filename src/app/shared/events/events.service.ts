import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventsService {

  public const URL = '//localhost:8080';

  constructor(private http: HttpClient) { 
  }
  
    getEvents(): Observable<any> {
  	  return this.http.get(this.URL + '/events');
    }

    save(event: any): Observable<any>{
      let result: Observable<Object>;
      result = this.http.post(this.URL + '/event', event);
      return result;
    }
    

}

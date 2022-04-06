import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  userid:any
  event:any
  events:any

constructor(private ds:DataService) {

  this.userid = JSON.parse(localStorage.getItem('currentUid')||'')
  this.ds.showEvent(this.userid)
  .subscribe((result:any)=>{
     if(result){
       this.events = result.event
     }
  },
  (result)=>{
    alert(result.message)
  })
}

ngOnInit(): void {
  }

}

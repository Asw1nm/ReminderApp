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

  indexNum:any
  edate:any
  eventd:any

constructor(private ds:DataService) {

  this.userid = JSON.parse(localStorage.getItem('currentUid')||'')
  this.ds.showEvent(this.userid)
  .subscribe((result:any)=>{
     if(result){
       this.events = result.eventDet
     }
  },
  (result)=>{
    alert(result.message)
  })
}

ngOnInit(): void {
  }

  deleteEvent(event:any){
    var currentUid = JSON.parse( localStorage.getItem('currentUid')||'')
    this.ds.deleteEvent(event,currentUid)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
        location.reload();
      }
    },
    (result)=>{
      alert(result.error.message)
    })
  }

  updateEvent(indexNo:any,date:any,event:any){
    document.getElementById("editDiv")?.setAttribute("style","display:block")
    this.indexNum = indexNo
    this.edate = date
    this.eventd = event
  }
  update(indexNum:any,edate:any,eventd:any){
    
     let uid=JSON.parse(localStorage.getItem("currentUid")||"")

     this.ds.update(uid,indexNum,edate,eventd)
     .subscribe((result:any)=>{
       if(result){
         alert(result.message)
         location.reload()
       }
     },
     (result)=>{
       alert(result.error.message)
     })
  }

}

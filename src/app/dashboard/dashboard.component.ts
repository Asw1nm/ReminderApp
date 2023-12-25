import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:any
  notiMsg: any

  constructor(private router:Router,private ds:DataService) { 
    if(localStorage.getItem('currentUname')){
      this.user =JSON.parse(localStorage.getItem('currentUname')||'')
    } 
  }

  ngOnInit(): void {
    if(!localStorage.getItem("currentUid")){
      alert("please log in")
      this.router.navigateByUrl("")
    }
    this.getNotification()
  }
 
 date=""
 event=[]
 userid = JSON.parse(localStorage.getItem('currentUid')||'')
  addEvent(){
    var date=this.date
    var event=this.event
    var userid = this.userid
    this.ds.addEvent(date,event,userid)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
      }
    },
    (result)=>{
      alert(result.error.message)
    })
  }

  getNotification() {
    this.ds.getNotification().subscribe(res=>{
      console.log(res);
      
    })
  }
  
  logout(){
    localStorage.removeItem("currentUid")
    localStorage.removeItem("currentUname")
    localStorage.removeItem("token")
    this.router.navigateByUrl('')
  }
  
}

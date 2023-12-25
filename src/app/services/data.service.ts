import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers:new HttpHeaders
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  login(userid:any,psw:any){
    const data ={
      userid,psw
    }
    return this.http.post('http://localhost:3000/login',data)
  }

  register(userid:any,username:any,psw:any){
     const data ={
       userid,username,psw
     }
     return this.http.post('http://localhost:3000/register',data)
  }

  getOptions(){
    const token = JSON.parse( localStorage.getItem('token')||'')
     let headers = new HttpHeaders()
     if(token){
       headers = headers.append('x-access-token',token)
       options.headers=headers
     }
     return options
  }
  
  addEvent(date:any,event:any,userid:any){
    
    const data ={
      date,event,userid
    }
    return this.http.post('http://localhost:3000/dashboard',data,this.getOptions())
 }

 showEvent(userid:any){
    
  const data ={
    userid
  }
  return this.http.post('http://localhost:3000/events',data,this.getOptions())
}

  deleteEvent(event:any,userid:any){
    const data ={
      event,userid
    }
    return this.http.post('http://localhost:3000/deleteEvent',data,this.getOptions())
  }
  
  update(uid:any,indexNum:any,edate:any,eventd:any){
    const data ={
      uid,indexNum,edate,eventd
    }
    return this.http.post('http://localhost:3000/updateEvent',data,this.getOptions())
  }

  getNotification() {
    return this.http.get('http://localhost:3000/getNoti')
  }

}

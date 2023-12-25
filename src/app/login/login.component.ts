import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm=this.fb.group({
    userid:['',[Validators.required,Validators.pattern('[0-9]*')]],
    psw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
   })

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
 
  login(){
    var userid = this.loginForm.value.userid
    var psw = this.loginForm.value.psw

    this.ds.login(userid,psw)
    .subscribe((result:any)=>{
      if(result){
         localStorage.setItem('currentUid',JSON.stringify(result.currentUid))
         localStorage.setItem('currentUname',JSON.stringify(result.currentUname))
         localStorage.setItem('token',JSON.stringify(result.token))
         alert(result.message)
         this.router.navigateByUrl("dashboard")
      }
    },
    (result)=>{
      alert(result.error.message)
    })
  }

}

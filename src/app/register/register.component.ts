import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username=""
  userid=""
  psw=""

  registerForm=this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    userid:['',[Validators.required,Validators.pattern('[0-9]*')]],
    psw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
   })

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  register(){
    var userid = this.userid
    var username = this.username
    var psw = this.psw

    this.ds.register(userid,username,psw)
    .subscribe((result:any)=>{
        if(result){
          alert(result.message)
          this.router.navigateByUrl("")
        }
    },
    (result)=>{
      alert(result.error.message)
    })
  }
    
}

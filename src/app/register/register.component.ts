import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  uname=""
  acno=""
  password=""
  balance=""
  registerForm=this.fb.group({
   uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
   acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
   password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
   balance:['',[Validators.required,Validators.pattern('[0-9]*')]]


  })



  constructor(private ds:DataService,private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  register()
  {
    
    var uname=this.registerForm.value.uname
    var acno=this.registerForm.value.acno
    var blnc=this.registerForm.value.balance
    var pswd=this.registerForm.value.password
    console.log(this.registerForm)
    if (this.registerForm.valid) {
      this.ds.register(uname,acno,pswd,blnc)
      .subscribe((result:any)=>{
        if (result) {
          alert(result.message)
          this.router.navigateByUrl('')
        
      }
    
     
   
        
      },
      (result)=>{
        alert(result.error.message)
      }
      )
      


      
    }
    else{
      alert("invalid form")
    } 
    
  
  }

}

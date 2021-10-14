import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim="--------your perfect banking partner--------"
  username1="account number"
  
  acno=""
  password=""
 
  loginForm=this.fb.group({
   
   acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
   password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
   
  })
  

  constructor(private router : Router, private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  accChange(event:any){
    // console.log(event.target.value)
    this.acno=event.target.value

  }
  pswdChange(event:any){
    this.password=event.target.value


  }
  // event binding using $event as argument
  login(){
    // alert("login clicked")
   
   
    var acno=this.loginForm.value.acno
    var password=this.loginForm.value.password
 
    if (this.loginForm.valid) {
      this.ds.login(acno,password)
      .subscribe((result:any)=>{
        if (result) {
          localStorage.setItem("token",result.token)
          localStorage.setItem("currentUser",result.currentUser)
          localStorage.setItem("currentAcc",acno)

          alert(result.message)
          this.router.navigateByUrl('dashboard')
        
      }

      },
      (result)=>
      {
        alert(result.error.message)

      })
     
     
      
    
    
      
    }
    else{
      alert("invalid form")
    }
  }
    // let accdetails=this.ds.user
  //   if(acno in accdetails)
  //   {
  //     if(pswd==accdetails[acno]["pswd"])
  //     {
  //       alert("login sucessful")
  //       this.router.navigateByUrl('dashboard')
  //     }
  //     else{
  //       alert("invalid password")
  //     }
  //   }
  //   else
  //   {
  //     alert("invalid user")
  //   }
  // }
  // event binding using template reference variable
  // login(a:any,p:any){
  //   var acno=a.value
  //   var pswd=p.value
  //   let accdetails=this.user
  //   if(acno in accdetails)
  //   {
  //     if(pswd==accdetails[acno]["password"])
  //     {
  //       alert("login sucessful")
  //     }
  //     else{
  //       alert("invalid password")
  //     }
  //   }
  //   else
  //   {
  //     alert("invalid user")
  //   }

  // }
  

}

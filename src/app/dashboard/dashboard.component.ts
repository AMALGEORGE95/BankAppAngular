import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  acno=""
  pswd=""
  amount=""

  wacno=""
  wpswd=""
  wamount=""
  dashboardForm=this.fb.group({
    
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    wacno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    wpswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    wamount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
  
 user1:any
 acno1=""
 Dlogin:Date=new Date()
  
  constructor(private ds:DataService,private fb:FormBuilder,private router : Router) { 
    this.user1=localStorage.getItem("currentUser")

  }

  ngOnInit(): void {
    if(!localStorage.getItem("currentUser"))
    {
    alert("please login")
    this.router.navigateByUrl("")
    }

  }
  deposit(){
    
    var acno=this.dashboardForm.value.acno
    var password=this.dashboardForm.value.pswd
    var amount=this.dashboardForm.value.amount
    // if(this.dashboardForm.valid)
    // {
    this.ds.deposit(acno,password,amount)
    .subscribe((result:any)=>{

    
    if (result) {
      alert(result.message)
      
    }
  },
  (result)=>{
    alert(result.error.message)
  }
  )
  

// }
// else{
//   alert("invalid form")
// }
}
  withdraw()
  {
    
    var acno=this.dashboardForm.value.wacno
    var pswd=this.dashboardForm.value.wpswd
    var amount=this.dashboardForm.value.wamount
    this.ds.withdraw(acno,pswd,amount)
    .subscribe((resullt:any)=>{
      if(resullt){
        alert(resullt.message)
      }
    },
    (result)=>{
      alert(result.error.message);
      
    })
    // if (result) {
    //   alert(amount+"withdrawal successful and new balance is:" + result)
      
    // }

  }
  deleteAtParent(){
    this.acno1=JSON.parse(localStorage.getItem("currentAcc") || '')

  }
  onDelete(event:any){
    this.ds.deleteAcc(event)
    .subscribe((resullt:any)=>{
      if(resullt){
        alert(resullt.message)
        localStorage.removeItem("token")
        this.router.navigateByUrl("")
      
      }
    },
    (result)=>{
      alert(result.error.message);
      
    })

  }
  onCancel(){
    this.acno1=""
  }
  logout()
  {
    localStorage.removeItem("token")
    this.router.navigateByUrl("")
  }
  
}
